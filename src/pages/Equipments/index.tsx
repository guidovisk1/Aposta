import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';
import { getEquipments } from '../../services/equipments.service';
import Form from './components/Form';

import ListItem from './components/ListItem';

import ImagePreview from '../../components/ImagePreview';

interface Equipament {
  cod_equipamento: string;
  descricao: string;
}

const Equipments: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipament[]>(
    [] as Equipament[],
  );

  const [searchedEquipment, setSearchedEquipment] = useState<Equipament[]>(
    [] as Equipament[],
  );

  const [selectedEquipment, setSelectedEquipment] = useState<Equipament>(
    {} as Equipament,
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

  useEffect(() => {
    async function fetchEquips() {
      const { data } = await getEquipments();
      setEquipments(data);
    }
    fetchEquips();
  }, []);

  function handleUserSelection(selected: Equipament) {
    setSelectedEquipment(selected);
  }

  function openForm() {
    setSelectedEquipment({} as Equipament);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedEquipment([] as Equipament[]);
    setSearchedEquipment(
      equipments.filter(equipment =>
        equipment.descricao
          .toLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }

  return (
    <>
      {isPreviewOpen && (
        <ImagePreview
          name="Mona Liza"
          code="DAVINCI"
          imgUrl="https://s1.static.brasilescola.uol.com.br/be/imagens/artes/monalisa1000.jpg"
          onClose={() => console.log('On Close')}
        />
      )}
      <Container className="page-container">
        <SideInfoPanel
          title="Equipa..."
          onSearch={searchValue => onSearch(searchValue)}
          openForm={() => openForm()}
        >
          <ListItem
            list={searchedEquipment.length ? searchedEquipment : equipments}
            onClicked={equipment => handleUserSelection(equipment)}
          />
        </SideInfoPanel>
        <Form
          title="Adicionar um Equipamento"
          equipmentSelected={selectedEquipment}
        />
      </Container>
    </>
  );
};

export default Equipments;
