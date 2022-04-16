import { api, endpoints } from '../../utils';

export const getUsers = () => {
  return api.get(endpoints.USERS.GET_ALL);
};
