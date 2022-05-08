/* eslint-disable camelcase */
import { api, endpoints } from '../utils';

interface MaintananceRequest {
  [key: string]: any;
}
export const getMaintananceRequests = () => {
  return api.get(endpoints.MAINTANANCEREQUESTS.GET_ALL);
};

export const createMaintananceRequests = (data: MaintananceRequest) => {
  return api.post(endpoints.MAINTANANCEREQUESTS.GET_ALL, data);
};

export const updateMaintananceRequests = (
  cod_ordemDeManutencao: string,
  data: MaintananceRequest,
) => {
  return api.put(
    `${endpoints.MAINTANANCEREQUESTS.GET_ALL}/${cod_ordemDeManutencao}`,
    data,
  );
};
