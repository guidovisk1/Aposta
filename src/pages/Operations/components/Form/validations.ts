import * as yup from 'yup';

export default yup.object().shape({
  descricao: yup.string().required('O campo Descrição é obrigatório'),
});
