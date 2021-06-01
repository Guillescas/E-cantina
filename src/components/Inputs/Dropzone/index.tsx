import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';

import { DropContainer, UploadMessage } from './styles';

interface Props {
  name: string;
}

interface InputRefProps extends HTMLInputElement {
  acceptedFiles: File[];
}

export default function Dropzone({ name }: Props): ReactElement {
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
        inputRef.current.acceptedFiles = onDropAcceptedFiles;
        setAcceptedFiles(onDropAcceptedFiles);
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
    <>
      <DropContainer
        role="button"
        {...getRootProps()}
        onClick={() => inputRef.current?.click()}
      >
        <input {...getInputProps()} accept="image/*" ref={inputRef} />

        {renderDragMessage()}
      </DropContainer>
      {acceptedFiles.length !== 0 && (
        <ul>
          {acceptedFiles.map(file => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
