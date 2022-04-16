import React from 'react';

import {
  Container,
  Title,
  Section,
  TitleSectionWrapper,
  TitleSectionText,
  InputsWrapper,
  ButtonWrapper,
} from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

interface FormProps {
  title: string;
}

const Form: React.FC<FormProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Section className="first">
        <TitleSectionWrapper>
          <TitleSectionText>ACESSO</TitleSectionText>
        </TitleSectionWrapper>

        <InputsWrapper>
          <Input width="255px" labelText="Login" placeholder="Login" />
          <Input width="255px" labelText="Senha" placeholder="Senha" />
        </InputsWrapper>
      </Section>

      <Section>
        <TitleSectionWrapper>
          <TitleSectionText>INFORMAÇÕES DO USUÁRIO</TitleSectionText>
        </TitleSectionWrapper>

        <InputsWrapper>
          <Input width="255px" labelText="FUNÇÃO*" placeholder="Selecione" />
          <Input width="255px" labelText="GRUPO*" placeholder="Selecione" />
        </InputsWrapper>

        <InputsWrapper>
          <Input
            width="255px"
            labelText="NOME"
            placeholder="Insira o nome do usuário"
          />
          <Input width="255px" labelText="E-MAIL" placeholder="Senha" />
        </InputsWrapper>
      </Section>

      <Section className="last">
        <TitleSectionWrapper>
          <TitleSectionText>MAIS INFORMAÇÕES</TitleSectionText>
        </TitleSectionWrapper>

        <InputsWrapper>
          <Input width="255px" labelText="CUSTO/HORA" placeholder="R$ ****" />
          <Input
            width="255px"
            labelText="MATRÍCULA*"
            placeholder="Informe o número"
          />
        </InputsWrapper>

        <InputsWrapper>
          <Input
            width="255px"
            labelText="SETOR"
            placeholder="Informe o seotr do usuário"
          />
          <Input width="255px" labelText="STATUS*" placeholder="Selecione" />
        </InputsWrapper>
      </Section>

      <ButtonWrapper>
        <Button full>Adicionar</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default Form;
