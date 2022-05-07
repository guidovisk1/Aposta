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
}

const InputFile: React.FC<InputFileProps> = ({
  iconName = 'file',
  labelText,
  placeholder,
  fileName,
}) => {
  return (
    <Container htmlFor="input-file">
      {labelText && <LabelText>{labelText}</LabelText>}

      <IconInputWrapper>
        <Input id="input-file" placeholder={placeholder} type="file" />

        <TextWrapper htmlFor="input-file">
          <span>{fileName || 'Enviar...'}</span>
        </TextWrapper>
        <img src={iconName === 'file' ? fileIcon : imageIcon} alt="icon" />
      </IconInputWrapper>
    </Container>
  );
};

export default InputFile;
