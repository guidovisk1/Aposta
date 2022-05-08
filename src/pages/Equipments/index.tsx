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
  status: number;
  imagem?: string;
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

  const [url, setUrl] = useState('');

  async function handleImg(imgString: string) {
    const base64Response = await fetch(`data:image/jpeg;base64,${imgString}`);

    const blob = await base64Response.blob();

    return URL.createObjectURL(blob);
  }

  useEffect(() => {
    async function fetchEquips() {
      const { data } = await getEquipments();

      const dataMapped = data.map((equipment: Equipament) => {
        return { ...equipment, status: equipment.status ? 1 : 0 };
      });
      setEquipments(dataMapped);
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
      {url && (
        <ImagePreview
          name="Mona Liza"
          code="DAVINCI"
          imgUrl={url}
          onClose={() => setUrl('')}
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
          handleImg={async imgString => setUrl(await handleImg(imgString))}
        />
      </Container>
    </>
  );
};

export default Equipments;
