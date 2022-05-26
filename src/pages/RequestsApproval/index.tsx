import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/auth';
import { Container, Wrapper, ButtonsWrapper, OrderHeaderTitle } from './styles';

import {
  approveOrReject,
  getById,
} from '../../services/maintananceRequests.service';

import RequestCard from './components/RequestCard';
import OperationCard from './components/OperationCard';
import Button from '../../components/Button';

interface Params {
  id: string;
}

const RequestsApproval: React.FC = () => {
  const params: Params = useParams();
  const history = useHistory();
  const auth = useAuth();

  const [request, setRequest] = useState<any>({} as any);

  useEffect(() => {
    getById(params.id).then(({ data }) => setRequest(data));
  }, []);

  const handleApproveOrReject = (value: string) => {
    if (value === 'aprovar') {
      const data = {
        aprovacao_usuario: auth.user.cod_usuario,
        aprovacao_situacao: 1,
        aprovacao_data: new Date().toISOString(),
      };
      approveOrReject(
        request.cod_ordemDeManutencao,
        auth.user.cod_usuario,
        data,
      ).then(async () => {
        await Swal.fire({
          title: 'Tudo Certo!',
          text: 'Ordem aprovada com sucesso!',
          icon: 'success',
          confirmButtonColor: '#FF5427',
        });
        history.push('/dashboard/consulta-ordens-manutencao');
      });
    } else {
      const data = {
        aprovacao_usuario: auth.user.cod_usuario,
        aprovacao_situacao: 0,
        aprovacao_data: new Date().toISOString(),
      };
      approveOrReject(
        request.cod_ordemDeManutencao,
        auth.user.cod_usuario,
        data,
      )
        .then(async () => {
          await Swal.fire({
            title: 'Tudo Certo!',
            text: 'Ordem rejeitada com sucesso!',
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonColor: '#FF5427',
          });
          history.push('/dashboard/consulta-ordens-manutencao');
        })
        .catch(message => {
          return Swal.fire({
            title: 'Algo deu errado!',
            text:
              message.response.data ||
              'Não foi possível aprovar/rejeitar a ordem. Tente novamente.',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonColor: '#FF5427',
          });
        });
    }
  };

  return (
    <Container className="page-container">
      <Wrapper>
        <div
          style={{
            width: 421,
            position: 'relative',
            top: '28px',
            left: '44px',
          }}
        >
          <OrderHeaderTitle>Ordem de Manutenção</OrderHeaderTitle>
          <RequestCard {...request} />
          <ButtonsWrapper>
            <Button
              disabled={
                auth.user.funcao !== 'admin aprovador' &&
                auth.user.funcao !== 'usuario aprovador'
              }
              onClick={() => handleApproveOrReject('rejeitar')}
              color="#fff"
              backgroundColor="#FF0000 !important"
            >
              Rejeitar
            </Button>
            <Button
              disabled={
                auth.user.funcao !== 'admin aprovador' &&
                auth.user.funcao !== 'usuario aprovador'
              }
              onClick={() => handleApproveOrReject('aprovar')}
              color="#fff"
              backgroundColor="#48BD2B !important "
            >
              Aprovar
            </Button>
          </ButtonsWrapper>
          <Button
            style={{ marginTop: '18.5px' }}
            onClick={() =>
              history.push('/dashboard/consulta-ordens-manutencao')
            }
            full
            tertiary
          >
            Voltar para a lista de Ordens
          </Button>
        </div>

        <div style={{ top: '28px', position: 'relative' }}>
          <OrderHeaderTitle>Operações</OrderHeaderTitle>

          {request.length ??
            request?.operacoes?.map((operation: any) => (
              <>
                <OperationCard
                  key={operation.cod_operacao}
                  descricao={operation.descricao}
                  resultado={operation?.resultadoLeitura}
                  tipo_medida={operation.parametroLeitura}
                />
                <br />
              </>
            ))}
        </div>
      </Wrapper>
    </Container>
  );
};

export default RequestsApproval;
