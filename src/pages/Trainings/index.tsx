import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

import { getTrainings } from '../../services/trainings.service';

import ListItem from './components/ListItem';
import Form from './components/Form';

interface Training {
  cod_treinamento: string;
  descricao: string;
  status?: number;
}

const Trainings: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([] as Training[]);

  const [searchedTraining, setSearchedTraining] = useState<Training[]>(
    [] as Training[],
  );

  const [selectedTraining, setSelectedTraining] = useState<Training>(
    {} as Training,
  );

  useEffect(() => {
    async function fetchTrainings() {
      const { data } = await getTrainings();
      const trainingsMapped = data.map((training: Training) => {
        return { ...training, status: training.status ? 1 : 0 };
      });
      setTrainings(trainingsMapped);
    }

    fetchTrainings();
  }, []);

  function handleTrainingSelection(selected: Training) {
    setSelectedTraining(selected);
  }

  function openForm() {
    setSelectedTraining({} as Training);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedTraining([] as Training[]);
    setSearchedTraining(
      trainings.filter(training =>
        training.descricao
          .toLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }
  return (
    <Container className="page-container">
      <SideInfoPanel
        title="Treinamentos"
        onSearch={searched => onSearch(searched)}
        openForm={() => openForm()}
      >
        <ListItem
          list={searchedTraining.length ? searchedTraining : trainings}
          onClicked={training => handleTrainingSelection(training)}
        />
      </SideInfoPanel>

      <Form
        title="Adicionar um Treinamento"
        trainingSelected={selectedTraining}
      />
    </Container>
  );
};

export default Trainings;
