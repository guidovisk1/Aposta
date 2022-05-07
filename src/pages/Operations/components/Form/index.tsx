/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';

import { getTools } from '../../../../services/tools.service';
import { getTrainings } from '../../../../services/trainings.service';
import { getEpis } from '../../../../services/epis.service';

import SelectInput from '../../../../components/SelectInput';

import {
  Container,
  Title,
  ButtonWrapper,
  InputsWrapper,
  Label,
} from './styles';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import TextArea from '../../../../components/TextArea';
import InputFile from '../../../../components/InputFile';

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

  const [tools, setTools] = useState<any[]>([]);
  const [trainings, setTrainings] = useState<any[]>([]);
  const [epis, setEpis] = useState<any[]>([]);

  const [operationAux, setOperationAux] = useState<Operation | undefined>(
    undefined,
  );

  useEffect(() => {
    Promise.all([getEpis(), getTools(), getTrainings()]).then(
      ([episResponse, toolsResponse, trainingsResponse]) => {
        setEpis(episResponse.data);
        setTools(toolsResponse.data);
        setTrainings(trainingsResponse.data);
      },
    );
  }, []);

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
        epis: [],
        ferramentas: [],
        treinamentos: [],
        imagem: '',
        pdf: '',
        video: '',
        valor: '',
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
        setFieldValue,
      }) => (
        <Container>
          <Title>
            {isOperationSelected.length > 0 ? 'Editar Operação' : title}
          </Title>

          <InputsWrapper>
            <Input
              name="descricao"
              width="302px"
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

            <SelectInput
              options={[
                { label: 'Ativado', id: 1 },
                { label: 'Inativado', id: 0 },
              ]}
              consideredValue="id"
              width="202px"
              name="status"
              labelText="STATUS*"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputsWrapper>

          <InputsWrapper>
            <SelectInput
              options={[
                { label: 'Ativado', id: 1 },
                { label: 'Inativado', id: 0 },
              ]}
              consideredValue="id"
              width="202px"
              name="status"
              labelText="STATUS*"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormControl style={{ width: '302px', justifyContent: 'end' }}>
              <Label style={{ marginBottom: '5px' }}>EPIs*</Label>
              <Select
                style={{ height: '35px' }}
                fullWidth
                id="epis"
                name="epis"
                value={values.epis}
                onChange={handleChange}
                multiple
              >
                {epis.map(epi => (
                  <MenuItem key={epi.cod_epi} value={epi.cod_epi}>
                    {epi.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputsWrapper>

          <TextArea
            labelText="Instruções"
            value=""
            placeholder="Insira as intruções aqui..."
          />

          <InputsWrapper>
            <FormControl style={{ width: '240px', justifyContent: 'end' }}>
              <Label style={{ marginBottom: '5px' }}>Ferramentas</Label>
              <Select
                style={{ height: '35px' }}
                fullWidth
                id="ferramentas"
                name="ferramentas"
                value={values.ferramentas}
                onChange={handleChange}
                multiple
              >
                {tools.map(tool => (
                  <MenuItem
                    key={tool.cod_ferramenta}
                    value={tool.cod_ferramenta}
                  >
                    {tool.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: '285px', justifyContent: 'end' }}>
              <Label style={{ marginBottom: '5px' }}>Treinamentos</Label>
              <Select
                style={{ height: '35px' }}
                fullWidth
                id="treinamentos"
                name="treinamentos"
                value={values.treinamentos}
                onChange={handleChange}
                multiple
              >
                {trainings.map(training => (
                  <MenuItem
                    key={training.cod_treinamento}
                    value={training.cod_treinamento}
                  >
                    {training.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputsWrapper>

          <InputsWrapper>
            <InputFile
              placeholder="Enviar"
              labelText="IMAGEM"
              iconName="image"
              value=""
            />
            <InputFile
              placeholder="Enviar"
              labelText="PDF"
              iconName="file"
              value=""
            />
            <InputFile
              placeholder="Enviar"
              name="video"
              labelText="VÍDEO"
              iconName="file"
              onChange={e => {
                setFieldValue('imagem', e.currentTarget.files);
              }}
            />
          </InputsWrapper>

          <InputsWrapper>
            <SelectInput
              options={[
                { label: 'OCR', id: 0 },
                { label: 'QRCODE', id: 1 },
                { label: 'MEDIÇÃO', id: 2 },
              ]}
              consideredValue="id"
              width="255px"
              name="status"
              labelText="(OCR, QRCODE OU MEDIÇÃO)"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="valor"
              width="250px"
              labelText="VALOR"
              value={values.valor}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="OCR, qrcode ou medida"
            />
          </InputsWrapper>

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
