import { useGetCustomersQuery } from "../state/api"
import { Box, useTheme} from '@mui/material';
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolBar from "../components/DataGridCustomToolBar";
import { useState } from "react";


export default function Customers() {
    const theme =  useTheme()
    const {data, isLoading} = useGetCustomersQuery()
    const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('')
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
          return params?.value?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
        }
      },
      {
        field: "country",
        headerName: "Country",
        flex: 0.4,
      },
      {
        field: 'occupation',
        headerName: 'Occupation',
        flex: 0.5,
      },
      {
        field: 'role',
        headerName: 'Role',
        flex: 0.5
      }]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title={"CUSTOMER"} subtitle={'Subcustomer'}></Header>
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
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            display: 'none',
          },
          '& .MuiDataGrid-withBorderColor': {
            
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
          rows={data || []}
          columns={columns}
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
