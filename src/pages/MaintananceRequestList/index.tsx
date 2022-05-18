import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { getMaintananceRequests } from '../../services/maintananceRequests.service';

import { Container, GridWrapper } from './styles';

import Button from '../../components/Button';

const MaintananceRequestList: React.FC = () => {
  const history = useHistory();
  const situations = [
    { label: 'Em Execução', value: '1' },
    { label: 'Não Iniciada', value: '0' },
    { label: 'Atrasada', value: '2' },
    { label: 'Concluída', value: '3' },
  ];

  const approvationSituations = (value: string) => {
    switch (String(value)) {
      case '0':
        return 'Recusada';
      case '1':
        return 'Aprovada';
      case '2':
        return 'Pendente';

      default:
        return 'Não Definido';
    }
  };

  const backgroundColorTranslate = (value: string) => {
    if (
      approvationSituations(value) === 'Aprovada' ||
      approvationSituations(value) === 'Recusada'
    ) {
      return '#fff';
    }
    return '';
  };

  const colorTranslate = (value: string) => {
    if (approvationSituations(value) === 'Recusada') {
      return '#FF5427';
    }
    if (approvationSituations(value) === 'Aprovada') {
      return '#548235';
    }
    return '#fff';
  };

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
        // eslint-disable-next-line eqeqeq
        return <p>{situations.find(s => s.value == prop.value)?.label}</p>;
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
            style={{
              color: colorTranslate(prop.value),
            }}
            disabled={prop.value !== 2}
            width="138px"
            height="33px"
            onClick={() =>
              history.push(
                `/dashboard/ordens-manutencao-aprovacao/${prop.row.id}`,
              )
            }
          >
            {prop.value === 2 ? 'Aprovar' : approvationSituations(prop.value)}
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
