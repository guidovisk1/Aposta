/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import SelectInput from '../../../../components/SelectInput';

import { Container, Title, ButtonWrapper } from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import {
  createOperation,
  updateOperation,
} from '../../../../services/operations.service';

import validations from './validations';

interface Operation {
  cod_operacao: string;
  descricao: string;
  instrucao: string;
  imagem: string;
  pdf?: string;
  fbx?: string;
  video?: string;
  ocr: boolean;
  ocrParametro: string;
  qrcode: boolean;
  qrcodeParametro: string;
  medicao: boolean;
  medicaoParametro: string;
  status: number;
}

interface FormProps {
  title: string;
  operationSelected?: Operation;
}

const Form: React.FC<FormProps> = ({ title, operationSelected }) => {
  const isOperationSelected = Object.keys(operationSelected || {});
  const code = v4();

  const [operationAux, setOperationAux] = useState<Operation | undefined>(
    undefined,
  );

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

  useEffect(() => {
    setOperationAux(undefined);
    setOperationAux(operationSelected || undefined);
  }, [operationSelected]);

  return (
    <Formik
      initialValues={{
        descricao: '',
        status: 1,
        ...operationAux,
      }}
      enableReinitialize
      onSubmit={values => {
        const pdf = (values.pdf as any).files[0];
        const fbx = (values.fbx as any).files[0];
        const video = (values.video as any).files[0];

        const formData = new FormData();

        if (pdf) formData.append('pdf', pdf);
        if (fbx) formData.append('fbx', fbx);
        if (video) formData.append('video', video);

        if (isOperationSelected.length) {
          return updateOperation(values.cod_operacao || '', formData)
            .then(() => swalSuccess('Operação editada com sucesso!'))
            .catch(() =>
              swalError(
                'Um erro ocorreu na edição da Operação. Revise as informações e tente novamente',
              ),
            );
        }

        return createOperation(formData)
          .then(() => swalSuccess('Operação criada com sucesso!'))
          .catch(() =>
            swalError(
              'Um erro ocorreu na criação do Operação. Revise as informações e tente novamente',
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
            {isOperationSelected.length > 0 ? 'Editar Operação' : title}
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
            placeholder="Insira a descrição do Treinamento"
          />
          <Input
            width="100%"
            name="cod_treinamento"
            labelText="Código"
            disabled
            value={code}
          />

          <SelectInput
            options={[
              { label: 'Ativado', id: 1 },
              { label: 'Inativado', id: 0 },
            ]}
            consideredValue="id"
            width="100%"
            name="status"
            labelText="STATUS*"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isOperationSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
