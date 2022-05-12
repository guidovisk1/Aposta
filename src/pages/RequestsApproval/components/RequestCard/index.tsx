/* eslint-disable camelcase */
import React from 'react';

import {
  Container,
  HeaderContainer,
  HeaderTexts,
  UrgencyBadge,
  Row,
  PropertiesWrapper,
  Property,
  Value,
} from './styles';

interface MaintananceRequest {
  cod_ordemDeManutencao: string;
  descricao: string;
  cod_equipamento: string;
  aprovacao_usuario: string;
  tipo: string;
  data_ordem: string;
  data_prazo: string;
  data_inicio: string;
  data_fim: string;
  aprovacao_situacao: number;
  aprovacao_data: string;
  urgencia: number;
  situacao: number;
  operacoesIds: string[];
  operacoesResultadosIds: string[];
  gruposUsuarioIds: string[];
  gruposUsuario: any;
  status: number;
}

const RequestCard: React.FC<Partial<MaintananceRequest>> = ({
  cod_ordemDeManutencao,
  cod_equipamento,
  gruposUsuario,
  data_prazo,
  aprovacao_usuario,
  descricao,
  data_ordem,
  urgencia,
}) => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderTexts>
          {cod_ordemDeManutencao} {descricao}
        </HeaderTexts>
        {urgencia && <UrgencyBadge>Urgente</UrgencyBadge>}
      </HeaderContainer>
      <Row>
        <PropertiesWrapper>
          <Property>EQUIPAMENTO</Property>
          <Value>Máquina de Solda</Value>
        </PropertiesWrapper>

        <PropertiesWrapper>
          <Property>GRUPO DE USUÁRIOS</Property>
          <Value>Máquina de Solda</Value>
        </PropertiesWrapper>
      </Row>

      <Row>
        <PropertiesWrapper>
          <Property>TIPO</Property>
          <Value>Ordem tipo 231</Value>
        </PropertiesWrapper>

        <PropertiesWrapper>
          <Property>DATA ORDEM</Property>
          <Value>{new Date(data_ordem || '').toLocaleDateString()}</Value>
        </PropertiesWrapper>
      </Row>

      <Row>
        <PropertiesWrapper>
          <Property>DATA PRAZO</Property>
          <Value>{new Date(data_prazo || '').toLocaleDateString()}</Value>
        </PropertiesWrapper>

        <PropertiesWrapper>
          <Property>APROVADOR</Property>
          <Value>Fabiano</Value>
        </PropertiesWrapper>
      </Row>
    </Container>
  );
};

export default RequestCard;
