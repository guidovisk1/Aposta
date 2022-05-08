/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Equipment {
  [key: string]: any;
}

export const getEquipments = () => {
  return api.get(endpoints.EQUIPMENT.GET_ALL);
};

export const createEquipment = (formData: Equipment) => {
  return api.post(endpoints.EQUIPMENT.GET_ALL, formData);
};

export const updateEquipment = (
  cod_equipamento: string,
  formData: Equipment,
) => {
  return api.put(`${endpoints.EQUIPMENT.GET_ALL}/${cod_equipamento}`, formData);
};
