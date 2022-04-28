/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Training {
  cod_treinamento: string;
  descricao: string;
  status?: boolean;
}

export const getTrainings = () => {
  return api.get(endpoints.TRAININGS.GET_ALL);
};

export const createTraining = ({
  cod_treinamento,
  descricao,
  status,
}: Training) => {
  const data = { cod_treinamento, descricao, status };
  return api.post(endpoints.TRAININGS.GET_ALL, data);
};

export const updateTraining = ({
  cod_treinamento,
  descricao,
  status,
}: Training) => {
  return api.put(`${endpoints.TRAININGS.GET_ALL}/${cod_treinamento}`, {
    descricao,
    status,
  });
};
