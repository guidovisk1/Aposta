/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Tool {
  codFerramenta: string;
  descricao: string;
  imagem?: string;
  status?: boolean;
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
  return api.post(endpoints.TOOL.GET_ALL, {
    codFerramenta,
    descricao,
    imagem,
    status,
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
