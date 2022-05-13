import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

import { getEpis, getOneEpi } from '../../services/epis.service';

import ListItem from './components/ListItem';
import Form from './components/Form';

interface EPI {
  cod_epi: string;
  descricao: string;
  imagem?: string;
  status?: number;
}

const EPIs: React.FC = () => {
  const [epis, setEpis] = useState<EPI[]>([] as EPI[]);

  const [searchedEpi, setSearchedEpi] = useState<EPI[]>([] as EPI[]);

  const [selectedEpi, setSelectedEpi] = useState<EPI>({} as EPI);

  async function fetchEpis() {
    const { data } = await getEpis();
    const episMapped = data.map((epi: EPI) => {
      return { ...epi, status: epi.status ? 1 : 0 };
    });
    setEpis(episMapped);
  }

  useEffect(() => {
    fetchEpis();
  }, []);

  const fetchSelectedEpi = (codEpi: string) => {
    return getOneEpi(codEpi).then(({ data }) => {
      setSelectedEpi(data);
    });
  };

  function handleEpiSelection(selected: EPI) {
    fetchSelectedEpi(selected.cod_epi);
  }

  function openForm() {
    setSelectedEpi({} as EPI);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedEpi([] as EPI[]);
    setSearchedEpi(
      epis.filter(epi =>
        epi.descricao.toLowerCase().includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }
  return (
    <Container className="page-container">
      <SideInfoPanel
        title="EPIs"
        onSearch={searched => onSearch(searched)}
        openForm={() => openForm()}
      >
        <ListItem
          list={searchedEpi.length ? searchedEpi : epis}
          onClicked={epi => handleEpiSelection(epi)}
        />
      </SideInfoPanel>

      <Form
        title="Adicionar um EPI"
        epiSelected={selectedEpi}
        onSave={() => fetchEpis()}
      />
    </Container>
  );
};

export default EPIs;
