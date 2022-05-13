/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface EPI extends FormData {
  [key: string]: any;
}

export const getEpis = () => {
  return api.get(endpoints.EPI.GET_ALL);
};

export const createEpi = (formData: EPI) => {
  return api.post(endpoints.EPI.GET_ALL, formData);
};

export const updateEpi = (cod_epi: string, formData: EPI) => {
  console.log(formData.get('imagem'), 'Testing out');
  return api.put(`${endpoints.EPI.GET_ALL}/${cod_epi}`, formData);
};

export const getOneEpi = (cod_epi: string) => {
  return api.get(`${endpoints.EPI.GET_ALL}/${cod_epi}`);
};
