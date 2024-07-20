import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ReportsProps, ProvisionFormData } from '../../types/types';
import { 
  DataGrid, 
  GridRowsProp, 
  GridColDef, 
  GridEventListener, 
  GridColumnGroupingModel, 
  GridToolbar 
} from '@mui/x-data-grid';
import GraphContainer from './GraphContainer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from './Layout';
import DataStats from './DataStats';


const Reports = ({ timeFrame }: ReportsProps) => {
  const [show, setShow] = useState(false);
  const [currentProvision, setCurrentProvision] = useState<ProvisionFormData | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<any>(null);
  const [currentBedrockAnalysis, setCurrentBedrockAnalysis] = useState<string>('')
  const [pastAnalysis, setPastAnalysis] = useState<any>([]);

  useEffect(() => {
    const fetchPastAnalysis = async () => {
      try{
          const response = await fetch('/api/pastAnalysis');

          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }

          const data = await response.json();
          console.log('fetch pastAnalysis data:', data);
          setPastAnalysis(data)
        } catch (error) {
          console.error('Error fetching past analysis:', error);
        }
    }

    fetchPastAnalysis();
  }, pastAnalysis);

  const handleRowClick: GridEventListener<'rowClick'> = ( 
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
    ) => {
    if(pastAnalysis){
      setShow(true);
      setCurrentProvision(pastAnalysis[params.row.id].provision)
      setCurrentMetrics(pastAnalysis[params.row.id].metrics)
      setCurrentBedrockAnalysis(pastAnalysis[params.row.id].bedrockAnalysis)
    }
  };

  const rows: GridRowsProp = 
  pastAnalysis.map((el, i) => ({ 
    id: i, 
    tablename: el.provision.tableName, 
    time: new Date(), 
    pRCU: el.metrics.ProvRCU, 
    pWCU: el.metrics.ProvWCU, 
    cRCU: Math.max(...el.metrics.consRCU.map(RCU => RCU.Maximum)).toFixed(3), 
    cWCU: Math.max(...el.metrics.consWCU.map(WCU => WCU.Maximum)).toFixed(3), 
    analysis: el.bedrockAnalysis 
  }))
  // [
  //   { id: 1, tablename: 'mocktabletesting', time: new Date(), pRCU: 1, pWCU: 1, cRCU: 1, cWCU: 1, analysis: 'This is great!' },
  //   { id: 2, tablename: 'mocktabletesting', time: new Date(), pRCU: 2, pWCU: 1, cRCU: 1, cWCU: 1, analysis: 'not great!' },
  //   { id: 3, tablename: 'mocktabletesting', time: new Date(), pRCU: 3, pWCU: 1, cRCU: 1, cWCU: 1, analysis: 'Hello' },
  // ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'tablename', headerName: 'Table Name', width: 150 },
    {
      field: 'time',
      headerName: 'Time Created',
      width: 200,
    },
    {
      field: 'pRCU',
      headerName: 'RCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'pWCU',
      headerName: 'WCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'cRCU',
      headerName: 'RCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'cWCU',
      headerName: 'WCU',
      type: 'number',
      width: 90,
    },
    {
      field: 'analysis',
      headerName: 'Bedrock Analysis',
      width: 400,
    },
  ];
  
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'Internal',
      description: '',
      children: [{ field: 'id' }, {field: 'tablename' }, { field: 'time' }],
    },
    {
      groupId: 'Provision Level',
      children: [{ field: 'pRCU' }, { field: 'pWCU' }],
    },
    {
      groupId: 'Cousumed Maximum',
      children: [{ field: 'cRCU' }, { field: 'cWCU' }],
    },
  ];  

  return (
  <Layout>
    <Typography variant='h4' sx={{ height: '70%', width: '100%' }}>
      Reports {timeFrame ? ` - ${timeFrame}` : ''}
      <Box >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}   
          columnGroupingModel={columnGroupingModel}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
            },
          }}
        />
      </Box>
      {show && currentProvision && currentMetrics && currentBedrockAnalysis &&
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 500,
              }}
            >
            <DataStats
              provisionData={currentProvision}
              currentMetrics={currentMetrics}
            /> 
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 500,
              }}
            >
            <GraphContainer
              currentProvision={currentProvision}
              currentMetrics={currentMetrics}
            />
            </Paper>
          </Grid>
        </Grid>
        <Box> {currentBedrockAnalysis}</Box>
      </Container>}
    </Typography>
  </Layout>
)};

export default Reports;
