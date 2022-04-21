/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
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

import {
  createEquipment,
  updateEquipment,
} from '../../../../services/equipments.service';

import validations from './validations';

interface Equipment {
  cod_equipamento: string;
  descricao: string;
}

interface FormProps {
  title: string;
  equipmentSelected?: Equipment;
}

const Form: React.FC<FormProps> = ({ title, equipmentSelected }) => {
  const isEquipmentSelected = Object.keys(equipmentSelected || {});
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
        ...equipmentSelected,
      }}
      enableReinitialize
      onSubmit={values => {
        if (isEquipmentSelected) {
          return updateEquipment(equipmentSelected?.cod_equipamento || '', {
            ...values,
          })
            .then(() => swalSuccess('Equipamento editado com sucesso!'))
            .catch(() =>
              swalError(
                'Um erro ocorreu na edição do equipamento. Revise as informações e tente novamente',
              ),
            );
        }
        return createEquipment({ ...values, cod_equipamento: code })
          .then(() => swalSuccess('Equipamento criado com sucesso!'))
          .catch(() =>
            swalError(
              'Um erro ocorreu na criação do equipamento. Revise as informações e tente novamente',
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
            {isEquipmentSelected.length > 0 ? 'Editar Equipamento' : title}
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
            placeholder="Insira a descrição do equipamento"
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
              {isEquipmentSelected.length > 0 ? 'Editar' : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
