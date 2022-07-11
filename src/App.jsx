import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Layout from './components/Layouts';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Admin from './components/Admin';
import NewTicket from './components/NewTicket';
import ListTicket from './components/ListTicket';
import ListTicketTecnicos from './components/ListTicketTecnicos';
import BotonesInicio from './components/BotonesInicio';
import AnalisView from './components/AnalisView';
import MonitorView from './components/MonitorView';
import WorkplaceView from './components/WorkplaceView';
import AccountCenter from './components/AccountCenter';
import PageHorariosTecnicos from './components/PageHorariosTecnicos';
import PageObjetivos from './components/PageObjetivos';
import 'antd/dist/antd.css';
import './App.css'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protect routes */}
        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
          <Route path="inicio/newticket" element={<NewTicket />} />
          <Route path="inicio/listticket" element={<ListTicket />} />
          <Route path="inicio/ListTicketTecnicos" element={<ListTicketTecnicos />} />
          <Route path="inicio/pagehorariostecnicos" element={<PageHorariosTecnicos />} />
          <Route path="inicio/pageobjetivos" element={<PageObjetivos />} />
          <Route path="/" element={<Home />} >
            <Route path="inicio" element={<BotonesInicio />} />
            <Route path="analisview" element={<AnalisView />} />
            <Route path="monitorview" element={<MonitorView />} />
            <Route path="workplaceview" element={<WorkplaceView />} />
            <Route path="accountcenter" element={<AccountCenter />} />
          </Route>
        </Route>
      </Route>
    </Routes>

  );
}
export default App;