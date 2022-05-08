import React from 'react';

import { Container, TextAreaInput, LabelText } from './styles';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  labelText?: string;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  labelText,
  placeholder,
  ...rest
}) => {
  return (
    <Container>
      {labelText && <LabelText>{labelText}</LabelText>}
      <TextAreaInput placeholder={placeholder} {...rest} value={value} />
    </Container>
  );
};

export default TextArea;
