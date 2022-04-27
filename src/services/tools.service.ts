/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Tool extends FormData {
  [key: string]: any;
}

export const getTools = () => {
  return api.get(endpoints.TOOL.GET_ALL);
};

export const createTool = ({
  codFerramenta,
  descricao,
  imagem,
  status,
}: Tool) => {
  const data = { codFerramenta, descricao, imagem, status };
  return api.post(endpoints.TOOL.GET_ALL, data, {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateTool = ({
  codFerramenta,
  descricao,
  imagem,
  status,
}: Tool) => {
  return api.put(`${endpoints.TOOL.GET_ALL}/${codFerramenta}`, {
    descricao,
    imagem,
    status,
  });
};
