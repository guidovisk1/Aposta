import React, { useEffect, useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { getMaintananceRequests } from '../../services/maintananceRequests.service';

import { Container, GridWrapper } from './styles';

import Button from '../../components/Button';

const MaintananceRequestList: React.FC = () => {
  const situations = [
    { label: 'Em Execução', value: 'EmExecucao' },
    { label: 'NaoIniciada', value: 'Não Iniciada' },
    { label: 'Atrasada', value: 'Atrasada' },
    { label: 'Concluída', value: 'Concluída' },
  ];

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      width: 150,
      editable: true,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'urgencia',
      headerName: 'Urgência',
      width: 150,
      editable: true,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
      renderCell: prop => {
        return <p>{prop.value ? 'Sim' : 'Não'}</p>;
      },
    },
    {
      field: 'data_ordem',
      headerName: 'Data Ordem',
      type: 'date',
      width: 150,
      editable: true,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
      renderCell: prop => {
        return <p>{getDate(prop.value)}</p>;
      },
    },
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 150,
      editable: true,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
      renderCell: prop => {
        return <p>{situations.find(s => s.value === prop.value)?.label}</p>;
      },
    },
    {
      field: 'aprovacao_situacao',
      headerName: 'Aprovação',
      width: 150,
      editable: true,
      headerClassName: 'header-cell',
      headerAlign: 'center',
      align: 'center',
      renderCell: prop => {
        return (
          <Button
            disabled={prop.value !== 'Pendente'}
            width="138px"
            height="33px"
          >
            {prop.value === 'Pendente' ? 'Aprovar' : prop.value}
          </Button>
        );
      },
    },
  ];

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchAllRequests() {
      const { data } = await getMaintananceRequests();
      setRequests(
        data.map((requestObj: any) => ({
          ...requestObj,
          id: requestObj.cod_ordemDeManutencao,
        })),
      );
    }

    fetchAllRequests();
  }, []);

  return (
    <Container className="page-container">
      <div>.</div>
      <GridWrapper>
        <DataGrid
          rows={requests}
          columns={columns}
          pageSize={5}
          sx={{
            boxShadow: 2,
            backgroundColor: '#fff',
            fontFamily: 'Montserrat',
            fontWeight: '500',
          }}
          autoHeight
          rowHeight={73}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </GridWrapper>
    </Container>
  );
};

export default MaintananceRequestList;
