import { api, endpoints } from '../utils';

interface User {
  codUsuario: string;
  userGroup: string;
  userName: string;
  userEmail: string;
  password: string;
  userRole: string;
  userHourRate: string;
  userSector: string;
  userRegistrationCode: string;
}

export const getUsers = () => {
  return api.get(endpoints.USERS.GET_ALL);
};

export const createUser = ({
  codUsuario,
  userGroup,
  userName,
  userEmail,
  password,
  userRole,
  userHourRate,
  userSector,
  userRegistrationCode,
}: User) => {
  return api.post(endpoints.USERS.GET_ALL, {
    cod_usuario: codUsuario,
    cod_grupousuarios: userGroup,
    nome: userName,
    email: userEmail,
    senha: password,
    funcao: userRole,
    custo_hora: userHourRate,
    setor: userSector,
    matricula: userRegistrationCode,
  });
};
