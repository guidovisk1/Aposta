/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface EPI {
  cod_epi: string;
  descricao: string;
  imagem?: string;
  status?: boolean;
}

export const getEpis = () => {
  return api.get(endpoints.EPI.GET_ALL);
};

export const createEpi = ({ cod_epi, descricao, imagem, status }: EPI) => {
  const data = { cod_epi, descricao, imagem, status };
  return api.post(endpoints.EPI.GET_ALL, data);
};

export const updateEpi = ({ cod_epi, descricao, imagem, status }: EPI) => {
  return api.put(`${endpoints.EPI.GET_ALL}/${cod_epi}`, {
    descricao,
    imagem,
    status,
  });
};
