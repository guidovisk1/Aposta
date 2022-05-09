/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { format } from 'date-fns';

import swal from 'sweetalert2';

import { Formik } from 'formik';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';

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

import { getOperations } from '../../../../services/operations.service';
import { getUserGroups } from '../../../../services/userGroup.service';
import { getEquipments } from '../../../../services/equipments.service';
import { getUsers } from '../../../../services/user.service';
import {
  createMaintananceRequests,
  updateMaintananceRequests,
} from '../../../../services/maintananceRequests.service';

import validations from './validations';

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
  status: number;
}

interface FormProps {
  title: string;
  maintananceRequestSelected?: MaintananceRequest;
}

const Form: React.FC<FormProps> = ({ title, maintananceRequestSelected }) => {
  const isMaintananceRequestsSelected = Object.keys(
    maintananceRequestSelected || {},
  );
  const code = v4();

  const [maintananceRequestAux, setMaintananceRequestAux] = useState<
    MaintananceRequest | undefined
  >(undefined);

  const [equipments, setEquipments] = useState([]);
  const [operations, setOperations] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const onlyApprovers = (usersResponse: any) => {
    return usersResponse.filter(
      (user: any) =>
        user.funcao === 'usuario aprovador' ||
        user.funcao === 'admin aprovador',
    );
  };

  useEffect(() => {
    Promise.all([
      getEquipments(),
      getOperations(),
      getUserGroups(),
      getUsers(),
    ]).then(
      ([
        equipmentsResponse,
        operationResponse,
        userGroupsResponse,
        usersResponse,
      ]) => {
        setEquipments(equipmentsResponse.data);
        setOperations(operationResponse.data);
        setUserGroups(userGroupsResponse.data);
        setUsers(onlyApprovers(usersResponse.data));
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
    setMaintananceRequestAux(undefined);
    setMaintananceRequestAux(maintananceRequestSelected || undefined);
  }, [maintananceRequestSelected]);

  return (
    <Formik
      initialValues={{
        descricao: '',
        status: 1,
        cod_equipamento: '',
        gruposUsuarioIds: [],
        tipo: '',
        aprovacao_usuario: '',
        aprovacao_situacao: 1,
        operacoesIds: [],
        ...maintananceRequestAux,
        data_fim: maintananceRequestAux?.data_fim
          ? format(new Date(maintananceRequestAux?.data_fim), 'yyyy-MM-dd')
          : '',
        data_ordem: maintananceRequestAux?.data_ordem
          ? format(new Date(maintananceRequestAux?.data_ordem), 'yyyy-MM-dd')
          : '',
        data_prazo: maintananceRequestAux?.data_prazo
          ? format(new Date(maintananceRequestAux?.data_prazo), 'yyyy-MM-dd')
          : '',
        data_inicio: maintananceRequestAux?.data_inicio
          ? format(new Date(maintananceRequestAux.data_inicio), 'yyyy-MM-dd')
          : '',
      }}
      enableReinitialize
      onSubmit={values => {
        if (isMaintananceRequestsSelected.length > 0) {
          return updateMaintananceRequests(
            values?.cod_ordemDeManutencao || '',
            {
              descricao: values.descricao,
              status: Boolean(values.status),
              cod_equipamento: values.cod_equipamento,
              gruposUsuarioIds: values.gruposUsuarioIds,
              tipo: '',
              operacoesIds: values.operacoesIds,
              data_ordem: values.data_ordem,
              data_prazo: values.data_prazo,
              aprovacao_usuario: values.aprovacao_usuario,
              aprovacao_situacao: values.aprovacao_situacao,
              data_inicio: values.data_inicio,
              data_fim: values.data_fim,
            },
          )
            .then(() => swalSuccess('Ordem editada com sucesso'))
            .catch(() =>
              swalError('Algo deu errado! Ordem não pode ser editado'),
            );
        }
        return createMaintananceRequests({
          ...values,
          cod_ordemDeManutencao: code,
          status: Boolean(values.status),
        })
          .then(() => swalSuccess('Ordem criada com sucesso!'))
          .catch(() =>
            swalError(
              'Algo deu errado. Revise as informações e tente novamente',
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
            {isMaintananceRequestsSelected.length > 0
              ? 'Editar Ordem de Manutenção'
              : title}
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
              placeholder="Descrição da ordem de manutenção"
            />
          </InputsWrapper>

          <InputsWrapper>
            <SelectInput
              options={equipments.map((eqp: any) => ({
                label: eqp.descricao,
                value: eqp.cod_equipamento,
              }))}
              consideredValue="cod_equipamento"
              width="200px"
              name="cod_equipamentos"
              labelText="Equipamento*"
              value={values.cod_equipamento}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormControl style={{ width: '325px', justifyContent: 'end' }}>
              <Label style={{ marginBottom: '5px' }}>Grupo de Usuários*</Label>
              <Select
                style={{ height: '35px' }}
                fullWidth
                id="grupo_usuario"
                name="gruposUsuarioIds"
                value={values.gruposUsuarioIds}
                onChange={handleChange}
                multiple
              >
                {userGroups.map((grupo: any) => (
                  <MenuItem
                    key={grupo.cod_grupoUsuarios}
                    value={grupo.cod_grupoUsuarios}
                  >
                    {grupo.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputsWrapper>

          <InputsWrapper>
            <SelectInput
              options={[
                { label: 'Sim', id: 1 },
                { label: 'Não', id: 0 },
              ]}
              consideredValue="id"
              width="250px"
              name="tipo"
              labelText="Tipo*"
              value={values.tipo}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <SelectInput
              options={[
                { label: 'Sim', id: 1 },
                { label: 'Não', id: 0 },
              ]}
              consideredValue="id"
              width="250px"
              name="status"
              labelText="URGENTE"
              value={values.urgencia}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputsWrapper>

          <InputsWrapper>
            <FormControl style={{ width: '100%', justifyContent: 'end' }}>
              <Label style={{ marginBottom: '5px' }}>Operações*</Label>
              <Select
                style={{ height: '35px' }}
                fullWidth
                id="cod_operacao"
                name="operacoesIds"
                value={values.operacoesIds}
                onChange={handleChange}
                multiple
              >
                {operations.map((operacao: any) => (
                  <MenuItem
                    key={operacao.cod_operacao}
                    value={operacao.cod_operacao}
                  >
                    {operacao.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputsWrapper>

          <InputsWrapper>
            <Input
              name="data_ordem"
              width="160px"
              type="date"
              labelText="Data Ordem"
              value={values.data_ordem}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="DD/MM/AAAA"
            />
            <Input
              name="data_prazo"
              width="160px"
              type="date"
              lang="pt-BR"
              labelText="Data Prazo"
              value={values.data_prazo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="DD/MM/AAAA"
            />
            <SelectInput
              options={users.map((user: any) => ({
                label: user.nome,
                value: user.cod_usuario,
              }))}
              width="160px"
              type="date"
              name="aprovacao_usuario"
              labelText="Aprovador"
              value={values.aprovacao_usuario}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputsWrapper>

          <InputsWrapper>
            <Input
              name="data_inicio"
              width="160px"
              labelText="Data Início"
              type="date"
              value={values.data_inicio}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="DD/MM/AAAA"
            />
            <Input
              name="data_fim"
              width="160px"
              labelText="Data Fim"
              type="date"
              value={values.data_fim}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="DD/MM/AAAA"
            />
            <Input
              name="situacao"
              width="160px"
              labelText="Situação Aprovação"
              value={values.situacao}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe"
            />
          </InputsWrapper>

          <ButtonWrapper>
            <Button type="submit" full disabled={isSubmitting}>
              {isMaintananceRequestsSelected.length > 0
                ? 'Editar'
                : 'Adicionar'}
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Formik>
  );
};

export default Form;
