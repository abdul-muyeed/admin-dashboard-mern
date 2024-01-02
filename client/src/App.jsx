import { useSelector } from 'react-redux'
import './App.css'
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Dashboard from './pages/Dashboard';
import {themeSettings} from './theme.js';
import Products from './pages/Products.jsx';
import Customers from './pages/Customers.jsx';
import Transactions from './pages/Transactions.jsx';
import Geography from './pages/Geography.jsx';



function App() {
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return(<>
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/geography" element={<Geography/>} />


            {/* <Route path="/users" element={<Users/>} /> */}
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
      
  </>)
}

export default App
