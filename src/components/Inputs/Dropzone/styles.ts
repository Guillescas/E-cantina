import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface UploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

const dragActive = css`
  border-color: #2a9d8f;
`;

const dragReject = css`
  border-color: #ee6c4d;
`;

export const StylesContainer = styled.div`
  p {
    margin: 0.5rem 0.25rem;

    span {
      font-weight: 700;
    }
  }
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1.5px dashed #969cb3;
  border-radius: 5px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive}

  ${(props: UploadProps): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#f1f1f1',
  error: '#ee6c4d',
  success: '#2a9d8f',
};

export const UploadMessage = styled.p`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 3rem 1rem;

  color: ${({ type }: UploadProps) => messageColors[type || 'default']};

  justify-content: center;
  align-items: center;
`;
