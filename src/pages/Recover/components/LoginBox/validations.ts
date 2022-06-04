import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('O endereço de email é obrigatório')
    .email('Formato de email inválido'),
});
