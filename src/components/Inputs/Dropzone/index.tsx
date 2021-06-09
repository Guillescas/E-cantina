import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';

import { toast } from 'react-toastify';
import { StylesContainer, DropContainer, UploadMessage } from './styles';

interface IDropzoneProps {
  name: string;
  setIsUserUpdatingImage?: (isUpdating: boolean) => void;
}

interface InputRefProps extends HTMLInputElement {
  acceptedFiles: File[];
}

export default function Dropzone({
  name,
  setIsUserUpdatingImage,
}: IDropzoneProps): ReactElement {
  const inputRef = useRef<InputRefProps>(null);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>(defaultValue);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: onDropAcceptedFiles => {
      if (inputRef.current) {
        if (acceptedFiles.length > 1) {
          return toast.error('Por favor, selecione apenas uma imagem');
        }
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
        setAcceptedFiles(onDropAcceptedFiles);
        setIsUserUpdatingImage(true);
      }
    },
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.acceptedFiles || [];
      },
      clearValue: (ref: InputRefProps) => {
        ref.acceptedFiles = [];
        setAcceptedFiles([]);
      },
      setValue: (ref: InputRefProps, value) => {
        ref.acceptedFiles = value;
        setAcceptedFiles(value);
      },
    });
  }, [fieldName, registerField]);

  function renderDragMessage(): ReactElement {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <StylesContainer>
      <DropContainer
        role="button"
        {...getRootProps()}
        onClick={() => inputRef.current?.click()}
      >
        <input
          {...getInputProps()}
          accept="image/*"
          maxLength={1}
          ref={inputRef}
        />

        {renderDragMessage()}
      </DropContainer>
      {acceptedFiles.map(file => (
        <p key={file.name}>
          <span>Arquivo selecionado: </span>
          {file.name}
        </p>
      ))}
    </StylesContainer>
  );
}
