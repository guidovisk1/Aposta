/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Tool {
  codFerramenta: string;
  descricao: string;
  imagem?: string;
}

export const getTools = () => {
  return api.get(endpoints.TOOL.GET_ALL);
};

export const createTool = ({ codFerramenta, descricao, imagem }: Tool) => {
  return api.post(endpoints.TOOL.GET_ALL, {
    codFerramenta,
    descricao,
    imagem,
  });
};

export const updateTool = ({ codFerramenta, descricao, imagem }: Tool) => {
  return api.put(`${endpoints.TOOL.GET_ALL}/${codFerramenta}`, {
    descricao,
    imagem,
  });
};
