/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Training {
  cod_grupoUsuarios: string;
  descricao: string;
  status?: boolean;
}

export const getUserGroups = () => {
  return api.get(endpoints.USER_GROUP.GET_ALL);
};

export const createUserGroups = ({
  cod_grupoUsuarios,
  descricao,
  status,
}: Training) => {
  const data = { cod_grupoUsuarios, descricao, status };
  return api.post(endpoints.USER_GROUP.GET_ALL, data);
};

export const updateUserGroups = ({
  cod_grupoUsuarios,
  descricao,
  status,
}: Training) => {
  return api.put(`${endpoints.USER_GROUP.GET_ALL}/${cod_grupoUsuarios}`, {
    descricao,
    status,
  });
};
