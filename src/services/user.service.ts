/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface User {
  cod_grupousuarios: string;
  cod_usuario: string;
  custo_hora: number;
  email: string;
  funcao: string;
  grupoUsuarios: string;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
}

export const getUsers = () => {
  return api.get(endpoints.USERS.GET_ALL);
};

export const createUser = ({
  cod_grupousuarios,
  cod_usuario,
  custo_hora,
  email,
  funcao,
  matricula,
  nome,
  senha,
  setor,
}: // TODO userStatus - waiting API implementation
User) => {
  return api.post(endpoints.USERS.GET_ALL, {
    cod_usuario,
    cod_grupousuarios,
    nome,
    email,
    senha,
    funcao,
    custo_hora,
    setor,
    matricula,
  });
};

export const updateUser = (
  id: string,
  {
    cod_usuario,
    cod_grupousuarios,
    nome,
    email,
    funcao,
    custo_hora,
    setor,
  }: // TODO userStatus - waiting API implementation
  Partial<User>,
) => {
  return api.put(`${endpoints.USERS.GET_ALL}/${id}`, {
    cod_usuario,
    cod_grupousuarios,
    nome,
    email,
    funcao,
    custo_hora,
    setor,
  });
};
