/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Operation extends FormData {
  [key: string]: any;
}
export const getOperations = () => {
  return api.get(endpoints.OPERATIONS.GET_ALL);
};

export const createOperation = (formData: Operation) => {
  return api.post(endpoints.OPERATIONS.GET_ALL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateOperation = (cod_operacao: string, formData: Operation) => {
  return api.put(`${endpoints.OPERATIONS.GET_ALL}/${cod_operacao}`, formData);
};
