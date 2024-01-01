import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery } from '@mui/material';
import Header from '../components/Header.jsx';
import { useGetTransactionsQuery } from '../state/api.js';
import { useTheme } from '@mui/material'
import { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolBar from '../components/DataGridCustomToolBar.jsx';

export default function Transactions() {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('')

  const { data, isLoading } = useGetTransactionsQuery({ page, pageSize, sort: JSON.stringify(sort), search });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Number of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 0.5,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params?.value).toFixed(2)}`
    }
    
  ]
  
  return (
    <Box>
      <Header title={'TRANSACTION'} subtitle={'List of Transaction'}></Header>
      <Box mt={'40px'} height={'75vh'}
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none'
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },



        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id} 
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20,50,100]}
      
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode='server'
          sortingMode='server'
          onPageChange={(params) => setPage(params)}
          onPageSizeChange={(params) => setPageSize(params)}
          onSortModelChange={(params) => setSort(...params)}
          components={{
            Toolbar: DataGridCustomToolBar
              
          }}
          componentsProps={{
            toolbar: {searchInput, setSearchInput , setSearch}
          }}
          

        ></DataGrid>
      </Box>
    </Box>
  )
}
