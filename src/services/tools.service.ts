/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface Tool extends FormData {
  [key: string]: any;
}

export const getTools = () => {
  return api.get(endpoints.TOOL.GET_ALL);
};

export const createTool = (formData: Tool) => {
  return api.post(endpoints.TOOL.GET_ALL, formData);
};

export const updateTool = (codFerramenta: string, formData: Tool) => {
  return api.put(`${endpoints.TOOL.GET_ALL}/${codFerramenta}`, formData);
};

export const getOneTool = (codFerramenta: string) => {
  return api.get(`${endpoints.TOOL.GET_ALL}/${codFerramenta}`);
};
