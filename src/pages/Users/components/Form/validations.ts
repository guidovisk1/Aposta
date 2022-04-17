import * as yup from 'yup';

export default yup.object().shape({
  login: yup.string().required('O campo Login é obrigatório'),
  userEmail: yup
    .string()
    .required('O endereço de E-mail é obrigatório')
    .email('Formato de email inválido'),
  password: yup.string().required('O campo Senha é obrigatório'),
  userRole: yup.string().required('O campo Função é obrigatório'),
  userGroup: yup.string().required('O campo Grupo é obrigatório'),
  userName: yup.string().required('O campo Nome é obrigatório'),
  userRegistrationCode: yup
    .string()
    .required('O campo Matrícula é obrigatório'),
  userStatus: yup.boolean().required('O campo Status é obrigatório'),
});
