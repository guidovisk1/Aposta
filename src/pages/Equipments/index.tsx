import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';
import { getEquipments } from '../../services/equipments.service';

import ListItem from './components/ListItem';

interface Equipament {
  cod_equipamento: string;
  descricao: string;
}

const Equipments: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipament[]>(
    [] as Equipament[],
  );

  useEffect(() => {
    async function fetchEquips() {
      const { data } = await getEquipments();
      setEquipments(data);
    }
    fetchEquips();
  }, []);

  return (
    <Container className="page-container">
      <SideInfoPanel
        title="Equipamentos"
        onSearch={() => console.log('oi')}
        openForm={() => console.log('open')}
      >
        <ListItem list={equipments} onClicked={() => console.log('test')} />
      </SideInfoPanel>
    </Container>
  );
};

export default Equipments;
