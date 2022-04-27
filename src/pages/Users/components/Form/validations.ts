import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('O endereço de E-mail é obrigatório')
    .email('Formato de email inválido'),
  senha: yup.string().required('O campo Senha é obrigatório'),
  funcao: yup.string().required('O campo Função é obrigatório'),
  cod_grupousuarios: yup.string().required('O campo Grupo é obrigatório'),
  nome: yup.string().required('O campo Nome é obrigatório'),
  matricula: yup.string().required('O campo Matrícula é obrigatório'),
});
