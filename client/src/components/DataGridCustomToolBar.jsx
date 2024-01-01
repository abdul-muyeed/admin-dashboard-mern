/* eslint-disable react/prop-types */
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import {Search} from '@mui/icons-material';



export default function DataGridCustomToolBar({searchInput, setSearchInput, setSearch}) {
  return (
    <GridToolbarContainer>
        <FlexBetween width={'100%'}>
            <FlexBetween>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
                
            </FlexBetween>
            <TextField
                label="Search..."
                sx={{
                    mb: '0.5rem',
                    width: '15rem'
                }}
                variant="standard"
                onChange={(e)=> setSearchInput(e.target.value)}
                value={searchInput}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={()=>{
                                setSearch(searchInput)
                                setSearchInput('')

                            }}>
                                <Search/>
                            </IconButton>
                            
                        </InputAdornment>
                    )
                }}
            >

            </TextField>
        </FlexBetween>
    </GridToolbarContainer>
  )
}
