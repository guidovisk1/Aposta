/* eslint-disable camelcase */
import React from 'react';

import {
  Container,
  SuccessStatus,
  SuccessStatusText,
  DescriptionWrapper,
  Row,
  PropertiesWrapper,
  Property,
  Value,
} from './styles';

interface OperationCardProps {
  descricao: string;
  tipo_medida: string;
  resultado: string;
}

const OperationCard: React.FC<OperationCardProps> = ({
  descricao,
  tipo_medida,
  resultado,
}) => {
  return (
    <Container>
      <DescriptionWrapper>{descricao}</DescriptionWrapper>
      <Row>
        <PropertiesWrapper>
          <Property>MEDIA (OCR, QRCODE OU MEDIÇÃO)</Property>
          <Value>HP</Value>
        </PropertiesWrapper>
        <PropertiesWrapper>
          <Property>RESULTADO</Property>
          <Value>HP</Value>
        </PropertiesWrapper>
      </Row>
      <SuccessStatus success>
        <SuccessStatusText>Sucesso</SuccessStatusText>
      </SuccessStatus>
    </Container>
  );
};

export default OperationCard;
