/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import SelectInput from '../../../../components/SelectInput';

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

import { createEpi, updateEpi } from '../../../../services/epis.service';

import validations from './validations';

interface EPI {
  cod_epi: string;
  descricao: string;
  imagem?: string;
  status?: number;
}

interface FormProps {
  title: string;
  epiSelected?: EPI;
}

const Form: React.FC<FormProps> = ({ title, epiSelected }) => {
  const isEpiSelected = Object.keys(epiSelected || {});
  const code = v4();

  const [epiAux, setEpilAux] = useState<EPI | undefined>(undefined);

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
    setEpilAux(undefined);
    setEpilAux(epiSelected || undefined);
  }, [epiSelected]);

  return (
    <Formik
      initialValues={{
        descricao: '',
        status: 1,
        imagem: '',
        ...epiAux,
      }}
      enableReinitialize
      onSubmit={values => {
        if (isEpiSelected.length) {
          return updateEpi({
            ...values,
            cod_epi: epiSelected?.cod_epi || '',
            status: values.status === 1,
          })
            .then(() => swalSuccess('EPI editado com sucesso!'))
            .catch(() =>
              swalError(
                'Um erro ocorreu na edição do EPI. Revise as informações e tente novamente',
              ),
            );
        }

        return createEpi({
          ...values,
          status: values.status === 1,
          cod_epi: code,
        })
          .then(() => swalSuccess('ferramenta criada com sucesso!'))
          .catch(() =>
            swalError(
              'Um erro ocorreu na criação do EPI. Revise as informações e tente novamente',
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
        setFieldValue,
      }) => (
        <Container>
          <Title>
            {isEpiSelected.length > 0 ? 'Editar Ferramenta' : title}
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
            placeholder="Insira a descrição do EPI"
          />
          <Input
            width="100%"
            name="cod_epi"
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
          <ContainerInputFile htmlFor="input-file">
            <img src={cloudIcon} alt="cloud icon" />
            <SendImageText>Enviar Imagem</SendImageText>
            <UploadInput
              accept="image/*"
              onChange={e => {
                setFieldValue('imagem', e.currentTarget.files);
              }}
              name="imagem"
              id="input-file"
              type="file"
            />
          </ContainerInputFile>

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isEpiSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
