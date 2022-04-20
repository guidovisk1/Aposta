/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Equipment {
  cod_equipamento: string;
  descricao: string;
}

export const getEquipments = () => {
  return api.get(endpoints.EQUIPMENT.GET_ALL);
};

export const createEquipment = ({ cod_equipamento, descricao }: Equipment) => {
  return api.post(endpoints.EQUIPMENT.GET_ALL, {
    cod_equipamento,
    descricao,
  });
};

export const updateEquipment = (
  cod_equipamento: string,
  { descricao }: Partial<Equipment>,
) => {
  return api.put(`${endpoints.EQUIPMENT.GET_ALL}/${cod_equipamento}`, {
    descricao,
  });
};
