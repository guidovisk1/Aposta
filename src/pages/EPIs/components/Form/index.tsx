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
  onSave: () => void;
  handleImg: (imgString: string) => void;
}

const Form: React.FC<FormProps> = ({
  title,
  epiSelected,
  onSave,
  handleImg,
}) => {
  const isEpiSelected = Object.keys(epiSelected || {});
  const code = v4();
  let fileName = '';

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
        const formData = new FormData();
        formData.append('descricao', values.descricao);
        // eslint-disable-next-line eqeqeq
        formData.append(
          'status',
          Number(values.status) === 1 ? 'true' : 'false',
        );

        const imgFile = (values.imagem as any)[0];

        if (imgFile) {
          formData.append('imagemFile', imgFile);
        }

        if (isEpiSelected.length) {
          return updateEpi(epiAux?.cod_epi || '', formData)
            .then(() => {
              swalSuccess('EPI editado com sucesso!');
              onSave();
            })
            .catch(message =>
              swalError(
                message.response.data ||
                  'Um erro ocorreu na edi????o do EPI. Revise as informa????es e tente novamente',
              ),
            );
        }

        formData.append('cod_epi', code);
        return createEpi(formData)
          .then(() => {
            swalSuccess('ferramenta criada com sucesso!');
            onSave();
          })
          .catch(message =>
            swalError(
              message.response.data ||
                'Um erro ocorreu na cria????o do EPI. Revise as informa????es e tente novamente',
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
            labelText="DESCRI????O*"
            hasError={
              !!errors.descricao && touched.descricao && !!errors.descricao
            }
            errorMessage={errors.descricao}
            value={values.descricao}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Insira a descri????o do EPI"
          />
          <Input
            width="100%"
            name="cod_epi"
            labelText="C??digo"
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
            onChange={e => {
              setFieldValue('status', e.target.value);
            }}
            onBlur={handleBlur}
          />
          <ContainerInputFile htmlFor="input-file">
            <img src={cloudIcon} alt="cloud icon" />
            <SendImageText>Enviar Imagem</SendImageText>
            <SendImageText>{fileName}</SendImageText>
            <UploadInput
              accept="image/*"
              onChange={e => {
                setFieldValue('imagem', e.currentTarget.files);
                fileName = e.currentTarget.files
                  ? e.currentTarget?.files[0]?.name
                  : '';
              }}
              name="imagem"
              id="input-file"
              type="file"
            />
          </ContainerInputFile>

          {epiSelected?.imagem && (
            <a
              onClick={e => {
                e.preventDefault();
                handleImg(epiSelected.imagem || '');
              }}
              href=""
            >
              Visualizar imagem
            </a>
          )}

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
