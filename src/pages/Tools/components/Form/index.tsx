/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import cloudIcon from '../../../../assets/icons/cloud-icon.svg';

import {
  Container,
  Title,
  ButtonWrapper,
  ContainerInputFile,
  UploadInput,
  SendImageText,
} from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { createTool, updateTool } from '../../../../services/tools.service';

import validations from './validations';

interface Tool {
  codFerramenta: string;
  descricao: string;
  imagem?: string;
}

interface FormProps {
  title: string;
  toolSelected?: Tool;
}

const Form: React.FC<FormProps> = ({ title, toolSelected }) => {
  const isToolSelected = Object.keys(toolSelected || {});
  const code = v4();

  const swalSuccess = (message: string) => {
    return swal.fire({
      title: 'Tudo certo!',
      icon: 'success',
      text: message || '',
      confirmButtonColor: '#FF5427',
    });
  };

  const swalError = (message: string) => {
    return swal.fire({
      title: 'Ops, algo deu errado!',
      icon: 'error',
      text: message || 'Erro desconhecido',
      confirmButtonColor: '#FF5427',
    });
  };

  return (
    <Formik
      initialValues={{
        descricao: '',
        ...toolSelected,
      }}
      enableReinitialize
      onSubmit={values => {
        console.log(isToolSelected);
        if (isToolSelected.length) {
          return updateTool({
            codFerramenta: toolSelected?.codFerramenta || '',
            descricao: values.descricao,
            imagem: values.imagem,
          })
            .then(() => swalSuccess('ferramenta editada com sucesso!'))
            .catch(() =>
              swalError(
                'Um erro ocorreu na edição da ferramenta. Revise as informações e tente novamente',
              ),
            );
        }
        return createTool({ ...values, codFerramenta: code })
          .then(() => swalSuccess('ferramenta criada com sucesso!'))
          .catch(() =>
            swalError(
              'Um erro ocorreu na criação da ferramenta. Revise as informações e tente novamente',
            ),
          );
      }}
      validationSchema={validations}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Container>
          <Title>
            {isToolSelected.length > 0 ? 'Editar Ferramenta' : title}
          </Title>

          <Input
            name="descricao"
            width="100%"
            labelText="DESCRIÇÃO*"
            hasError={
              !!errors.descricao && touched.descricao && !!errors.descricao
            }
            errorMessage={errors.descricao}
            value={values.descricao}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Insira a descrição da ferramenta"
          />
          <Input
            width="100%"
            name="cod_equipamento"
            labelText="Código"
            disabled
            value={code}
          />

          <ContainerInputFile htmlFor="input-file">
            <img src={cloudIcon} alt="cloud icon" />
            <SendImageText>Enviar Imagem</SendImageText>
            <UploadInput
              onChange={e => console.log(e.target.value)}
              id="input-file"
              type="file"
            />
          </ContainerInputFile>

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isToolSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
