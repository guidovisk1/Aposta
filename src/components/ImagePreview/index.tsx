import React from 'react';

import Button from '../Button';

import {
  Container,
  ShadowedBackground,
  IconX,
  Name,
  Code,
  TextsWrapper,
  ButtonWrapper,
  ImageWrapper,
  Image,
} from './styles';

interface ImagePreviewProps {
  imgUrl: string;
  name: string;
  code: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imgUrl,
  name,
  code,
  onClose,
}) => {
  return (
    <ShadowedBackground>
      <Container>
        <IconX onClick={() => onClose()} color="#CACACA" size={24} />

        <TextsWrapper>
          <Name>{name}</Name>
          <Code>COD: {code}</Code>
        </TextsWrapper>

        <ImageWrapper>
          <Image src={imgUrl} />
        </ImageWrapper>

        <ButtonWrapper>
          <Button onClick={() => onClose()}>OK</Button>
        </ButtonWrapper>
      </Container>
    </ShadowedBackground>
  );
};

export default ImagePreview;
