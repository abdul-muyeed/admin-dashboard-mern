/* eslint-disable react/prop-types */

import FlexBetween from "./FlexBetween"
import profileImage from '../assets/profile.jpeg'
import { useEffect, useState } from "react";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { AdminPanelSettingsOutlined, ChevronLeft, ChevronRightOutlined, Groups2Outlined, HomeOutlined, PieChartOutline, PointOfSaleOutlined, PublicOutlined, ReceiptLongOutlined,  SettingsOutlined,  ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({
    drawerWidth,
    isSidebarOpen,
    setSidebarOpen,
    isNonMobile,
    user
}) {

    const {pathname} = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();
    const navItems = [
        {
            text: 'Dashboard',
            icon: <HomeOutlined/>,
        },
        {
            text: 'Clients Facing',
            icon: null,
        },
        {
            text: 'Products',
            icon: <ShoppingCartOutlined/>,
        },
        {
            text: 'Customers',
            icon: <Groups2Outlined/>,
        },
        {
            text: 'Transactions',
            icon: <ReceiptLongOutlined/>,
        },
        {
            text: 'Geography',
            icon: <PublicOutlined/>,
        },
        {
            text: 'Sales',
            icon: null,
        },
        {
            text: 'Overview',
            icon: <PointOfSaleOutlined/>,
        },
        {
            text: 'Daily',
            icon: <TodayOutlined/>,
        },
        {
            text: 'Breakdown',
            icon: <PieChartOutline/>,
        },
        {
            text: 'Management',
            icon: null,
        },
        {
            text: 'Admin',
            icon: <AdminPanelSettingsOutlined/>,
        },
        {
            text: 'Performance',
            icon: <TrendingUpOutlined/>,
        }
    ]
    useEffect(()=>{
        const path = pathname.split('/')[1];
        setActive(path);
    }, [pathname])
  return (
    <Box>
        {isSidebarOpen && (
            <Drawer
            open={isSidebarOpen}
            onClose={()=> setSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSizing: 'border-box',
                    borderWidth: isNonMobile ? 0 : '2px',
                    // width: drawerWidth,
                }
            }}
            >
            <Box width='100%'>
                <Box m='1rem 3rem' >
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display={'flex'} alignItems={'center'} gap={'0.5rem'} >
                            <Typography variant="h4" fontWieght='bold' textAlign={'center'}>
                                ECOMVISION
                            </Typography>
                        </Box>
                        {!isNonMobile && (
                            <IconButton onClick={()=> setSidebarOpen(!isSidebarOpen)} >
                              <ChevronLeft/>
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {
                        navItems.map(({text, icon}, index)=>{
                            if(!icon){
                                return (
                                    <Typography  key={index} sx={{m:'0.5rem 0 0.5rem 3rem', textAlign:'left', color: theme.palette.secondary[300]}}>
                                        {text}
                                    </Typography>
                                )
                            }
                            const lctext =text.toLowerCase();

                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={()=>{
                                            setActive(lctext);
                                            navigate(`/${lctext}`)
                                        }}
                                        sx={{
                                            backgroundColor: active === lctext ? theme.palette.secondary[300] : 'transparent',
                                            color: active === lctext ? theme.palette.primary[600] : theme.palette.secondary[100],
                                        }}
                                    >
                                    <ListItemIcon 
                                        sx={{
                                            ml: '2rem',
                                            color: active === lctext ? theme.palette.primary[600] : theme.palette.secondary[200],

                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                    {active === lctext && (<ChevronRightOutlined sx={{ml:'auto'}} />)}

                                    </ListItemButton>

                                </ListItem>
                            )
                        })
                    }

                </List>
                
            </Box>
            <Box position={'absolute'} bottom={'0.5rem'}>
                <Divider/>
                <FlexBetween textTransform={'none'} gap={'1rem'} p={'0 30px'} m={'1rem 0rem 0 0rem'} >
                    <Box 
                        component={'img'}
                        alt="profile"
                        src={profileImage}
                        height={'40px'}
                        width={'40px'}
                        borderRadius={'50%'}
                        sx={{ objectFit: 'cover' }}
                        />
                        <Box textAlign={'left'}>
                            <Typography fontWeight={'bold'} fontSize={'0.9rem'} sx={{color: theme.palette.secondary[100]}}>
                                {user.name}
                            </Typography>
                            <Typography fontSize={'0.8rem'} sx={{color: theme.palette.secondary[200]}}>
                                {user.occupation}
                            </Typography>
                        </Box>
                        <SettingsOutlined sx={{color: theme.palette.secondary[200], fontSize: '20px'}}/>

                    
                </FlexBetween>



            </Box>
            </Drawer>
        )}
    </Box>
  )
}
