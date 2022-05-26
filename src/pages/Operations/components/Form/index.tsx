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
  ferramentas?: any;
  epis?: any;
  treinamentos?: any;
  status: number;
}

interface FormProps {
  title: string;
  operationSelected?: Operation;
  onSave: () => void;
}

const Form: React.FC<FormProps> = ({ title, operationSelected, onSave }) => {
  const isOperationSelected = Object.keys(operationSelected || {});
  const code = v4();

  const [tools, setTools] = useState<any[]>([]);
  const [trainings, setTrainings] = useState<any[]>([]);
  const [epis, setEpis] = useState<any[]>([]);
  const [imageName, setImageName] = useState('');
  const [pdfName, setPdfName] = useState('');

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
        imagem: '',
        pdf: '',
        video: '',
        instrucao: '',
        tipoMedicao: 'OCR',
        medicaoParametro: '',
        ...operationAux,
        ferramentas:
          operationAux?.ferramentas?.map((ferramenta: any) => {
            return ferramenta.cod_ferramenta;
          }) || [],
        epis:
          operationAux?.epis?.map((epi: any) => {
            return epi.cod_epi;
          }) || [],
        treinamentos:
          operationAux?.treinamentos?.map((treinamento: any) => {
            return treinamento.cod_treinamento;
          }) || [],
      }}
      enableReinitialize
      onSubmit={values => {
        const pdf = (values?.pdf as any)[0];
        const imagem = (values?.imagem as any)[0];

        let toolsString = '';
        values.ferramentas.forEach((tool: any) => {
          toolsString += `${tool}/`;
        });

        let trainingsString = '';
        values.treinamentos.forEach((training: any) => {
          trainingsString += `${training}/`;
        });

        let episString = '';
        values.epis.forEach((epi: any) => {
          episString += `${epi}/`;
        });

        const formData = new FormData();

        if (pdf) formData.append('pdfFile', pdf);
        if (imagem) formData.append('imagemFile', imagem);

        formData.append('descricao', values.descricao);
        formData.append(
          'status',
          Number(values.status) === 1 ? 'true' : 'false',
        );
        formData.append('instrucao', values.instrucao);
        formData.append(
          'cod_operacao',
          values.cod_operacao ? values.cod_operacao : code,
        );

        formData.append('video', values.video || '');
        formData.append('ferramentasIds', toolsString.replace(/\/$/, ''));
        formData.append('treinamentosIds', trainingsString.replace(/\/$/, ''));
        formData.append('episIds', episString.replace(/\/$/, ''));
        formData.append('tipoLeitura', values.tipoMedicao);
        formData.append('parametroLeitura', values.medicaoParametro);

        if (isOperationSelected.length) {
          return updateOperation(values.cod_operacao || '', formData)
            .then(() => {
              swalSuccess('Operação editada com sucesso!');
              onSave();
            })
            .catch(message =>
              swalError(
                message.response.data ||
                  'Um erro ocorreu na edição da Operação. Revise as informações e tente novamente',
              ),
            );
        }

        return createOperation(formData)
          .then(() => {
            swalSuccess('Operação criada com sucesso!');
            onSave();
          })
          .catch(message =>
            swalError(
              message.response.data ||
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
            value={values.instrucao}
            name="instrucao"
            onChange={handleChange}
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
              name="imagem"
              placeholder="Enviar"
              labelText="IMAGEM"
              iconName="image"
              id="imagem-input"
              className="imagem-input"
              fileName={imageName}
              onChange={e => {
                if (e.currentTarget.files![0].size > 5519364) {
                  return swalError(
                    'A imagem não pode ser maior que 5MB e deve ser do tipo imagem',
                  );
                }
                if (!e.currentTarget.files![0].type.startsWith('image')) {
                  return swalError('O arquivo deve ser do tipo imagem');
                }
                setFieldValue('imagem', e.currentTarget.files);
                return setImageName(e.currentTarget.files![0].name);
              }}
            />
            <InputFile
              placeholder="Enviar"
              labelText="PDF"
              iconName="file"
              accept="application/pdf"
              fileName={pdfName}
              name="pdf"
              id="pdf-input"
              onChange={e => {
                if (e.currentTarget.files![0].size > 15519364) {
                  return swalError('O PDF não pode ser maior que 15MB');
                }
                if (
                  !e.currentTarget.files![0].type.startsWith('application/pdf')
                ) {
                  return swalError('O arquivo deve ser do tipo PDF');
                }
                setFieldValue('pdf', e.currentTarget.files);
                return setPdfName(e.currentTarget?.files![0].name);
              }}
            />

            <Input
              name="video"
              labelText="VIDEO"
              width="160px"
              value={values.video}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Insira a URL do video"
            />
          </InputsWrapper>

          <InputsWrapper>
            <SelectInput
              options={[
                { label: 'Sem Leitura', id: 0 },
                { label: 'OCR', id: 1 },
                { label: 'QRCODE', id: 2 },
                { label: 'MEDIÇÃO', id: 3 },
              ]}
              width="255px"
              name="tipoMedicao"
              labelText="(OCR, QRCODE OU MEDIÇÃO)"
              value={values.tipoMedicao}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="medicaoParametro"
              width="250px"
              labelText="VALOR"
              value={values.medicaoParametro}
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
