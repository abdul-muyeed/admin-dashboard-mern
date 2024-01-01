/* eslint-disable react/prop-types */
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material";
import {Search as SearchIcon, Menu as MenuIcon, DarkModeOutlined, LightModeOutlined, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { setMode } from "../state";
import { useState } from "react";
import profileImage from '../assets/profile.jpeg'




export default function Navbar({
    isSidebarOpen,
    setSidebarOpen,
    user
}) {
    const dispatch = useDispatch();
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
    <AppBar component={'nav'}
        sx={{
            position: 'static',
            background: 'none',
            boxShadow: 'none',
        }}
    >
        <Toolbar sx={{justifyContent: "space-between"}}>
            <FlexBetween>
                <IconButton onClick={()=> setSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius='9px'
                    gap='3rem'
                    p='0.1rem 1.5rem'
                >
                    <InputBase placeholder="Search..."/>
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap='1.5rem'>
                <IconButton onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlined sx={{fontSize: '25px'}}/> : <LightModeOutlined sx={{fontSize: '25px'}}/>}
                    
                </IconButton>
                <IconButton>
                    <SettingsOutlined/>
                </IconButton>
                <FlexBetween>
                    <Button onClick={handleClick} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: "none", gap: '1rem'}}>
                    <Box 
                        component={'img'}
                        alt="profile"
                        src={profileImage}
                        height={'32px'}
                        width={'32px'}
                        borderRadius={'50%'}
                        sx={{ objectFit: 'cover' }}
                        />
                        <Box textAlign={'left'}>
                            <Typography fontWeight={'bold'} fontSize={'0.8rem'} sx={{color: theme.palette.secondary[100]}}>
                                {user.name}
                            </Typography>
                            <Typography fontSize={'0.7rem'} sx={{color: theme.palette.secondary[200]}}>
                                {user.occupation}
                            </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{color: theme.palette.secondary[300], fontSize: '25px'}}/>
                       
                         </Button>
                         <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: "center" }} >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                         </Menu>
                </FlexBetween>
            </FlexBetween>
            
        </Toolbar>

    </AppBar>
  )
}
