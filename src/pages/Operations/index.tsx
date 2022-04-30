import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import SideInfoPanel from '../../components/SideInfoPanel';

import { getOperations } from '../../services/operations.service';

import ListItem from './components/ListItem';
import Form from './components/Form';

interface Operation {
  cod_operacao: string;
  descricao: string;
  instrucao: string;
  imagem: string;
  pdf?: string;
  fbx?: string;
  video?: string;
  ocr: boolean;
  ocrParametro: string;
  qrcode: boolean;
  qrcodeParametro: string;
  medicao: boolean;
  medicaoParametro: string;
  status: number;
}

const Operations: React.FC = () => {
  const [operations, setOperations] = useState<Operation[]>([] as Operation[]);

  const [searchedOperation, setSearchedOperation] = useState<Operation[]>(
    [] as Operation[],
  );

  const [selectedOperation, setSelectedOperation] = useState<Operation>(
    {} as Operation,
  );

  useEffect(() => {
    async function fetchOperations() {
      const { data } = await getOperations();
      const operationsMapped = data.map((operation: Operation) => {
        return { ...operation, status: operation.status ? 1 : 0 };
      });
      setOperations(operationsMapped);
    }

    fetchOperations();
  }, []);

  function handleOperationSelection(selected: Operation) {
    setSelectedOperation(selected);
  }

  function openForm() {
    setSelectedOperation({} as Operation);
  }
  function onSearch(searchedValue: string) {
    if (searchedValue === undefined || searchedValue === '')
      setSearchedOperation([] as Operation[]);
    setSearchedOperation(
      operations.filter(operation =>
        operation.descricao
          .toLowerCase()
          .includes(searchedValue.toLocaleLowerCase()),
      ),
    );
  }
  return (
    <Container className="page-container">
      <SideInfoPanel
        title="Operações"
        onSearch={searched => onSearch(searched)}
        openForm={() => openForm()}
      >
        <ListItem
          list={searchedOperation.length ? searchedOperation : operations}
          onClicked={operation => handleOperationSelection(operation)}
        />
      </SideInfoPanel>

      <Form
        title="Adicionar uma Operação"
        operationSelected={selectedOperation}
      />
    </Container>
  );
};

export default Operations;
