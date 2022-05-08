import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import SideInfoPanel from '../../components/SideInfoPanel';

import ListItem from './components/ListItem';
import Form from './components/Form';

import { getMaintananceRequests } from '../../services/maintananceRequests.service';

interface MaintananceRequest {
  cod_ordemDeManutencao: string;
  descricao: string;
  cod_equipamento: string;
  aprovacao_usuario: string;
  tipo: string;
  data_ordem: string;
  data_prazo: string;
  data_inicio: string;
  data_fim: string;
  aprovacao_situacao: number;
  aprovacao_data: string;
  urgencia: number;
  situacao: number;
  operacoesIds: string[];
  operacoesResultadosIds: string[];
  gruposUsuarioIds: string[];
  status: number;
}

const MaintananceRequests: React.FC = () => {
  const [maintananceRequests, setMaintananceRequest] = useState<
    MaintananceRequest[]
  >([] as MaintananceRequest[]);

  const [searchedRequest, setSearchedRequest] = useState<MaintananceRequest[]>(
    [] as MaintananceRequest[],
  );

  const [selectedMaintanance, setSelectedMaintanance] =
    useState<MaintananceRequest>({} as MaintananceRequest);

  useEffect(() => {
    async function fetchMaintananceRequests() {
      const { data } = await getMaintananceRequests();
      setMaintananceRequest(data);
    }

    fetchMaintananceRequests();
  }, []);

  function handleOperationSelection(selected: MaintananceRequest) {
    setSelectedMaintanance(selected);
  }

  function openForm() {
    setSelectedMaintanance({} as MaintananceRequest);
  }

  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedRequest([] as MaintananceRequest[]);
    setSearchedRequest(
      maintananceRequests.filter(request =>
        request?.descricao
          ?.toLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }
  return (
    <Container className="page-container">
      <SideInfoPanel
        onSearch={searchedValue => onSearch(searchedValue)}
        title="Ordens"
        openForm={() => openForm()}
      >
        <ListItem
          list={searchedRequest.length ? searchedRequest : maintananceRequests}
          onClicked={value => handleOperationSelection(value)}
        />
      </SideInfoPanel>
      <Form
        title="Adicionar uma Ordem de Manutenção"
        maintananceRequestSelected={selectedMaintanance}
      />
    </Container>
  );
};

export default MaintananceRequests;
