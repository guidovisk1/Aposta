import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { Container, Wrapper, ButtonsWrapper, OrderHeaderTitle } from './styles';

import RequestCard from './components/RequestCard';
import OperationCard from './components/OperationCard';
import Button from '../../components/Button';

import { getById } from '../../services/maintananceRequests.service';

interface Params {
  id: string;
}

const RequestsApproval: React.FC = () => {
  const params: Params = useParams();
  const history = useHistory();

  const [request, setRequest] = useState<any>({} as any);

  useEffect(() => {
    getById(params.id).then(({ data }) => setRequest(data));
  }, []);

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
            <Button color="#fff" backgroundColor="#FF0000 !important">
              Rejeitar
            </Button>
            <Button color="#fff" backgroundColor="#48BD2B !important ">
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
                  resultado="300px"
                  tipo_medida="OCR"
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
