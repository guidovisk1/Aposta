import React from 'react';

import fileIcon from '../../assets/icons/attach-icon.svg';
import imageIcon from '../../assets/icons/image-icon.svg';

import {
  Container,
  Input,
  LabelText,
  IconInputWrapper,
  TextWrapper,
} from './styles';

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName?: 'image' | 'file';
  labelText?: string;
  placeholder?: string;
  fileName?: string;
  htmlFor?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  iconName = 'file',
  labelText,
  placeholder,
  fileName,
  id,
  htmlFor = id,

  onChange,
}) => {
  return (
    <>
      <Input
        onChange={e => {
          onChange(e);
        }}
        id={id}
        placeholder={placeholder}
        type="file"
      />

      <Container htmlFor={htmlFor}>
        {labelText && <LabelText>{labelText}</LabelText>}

        <IconInputWrapper>
          <TextWrapper htmlFor={htmlFor}>
            <div className="file-name">
              <span>{fileName || 'Enviar...'}</span>
            </div>
          </TextWrapper>
          <img src={iconName === 'file' ? fileIcon : imageIcon} alt="icon" />
        </IconInputWrapper>
      </Container>
    </>
  );
};

export default InputFile;
