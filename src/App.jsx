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
import PageNewHorario from './components/PageNewHorario/PageNewHorario';
import CardObjetivosSalones from './components/cardObjetivos/CardObjetivos';
import 'antd/dist/antd.css';
import './App.css'
import CardFacturacionSalones from './components/cardFacturacionSalones';
import PageMaquinasAdmin from './components/pageMaquinasAdmin';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protect routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} >
            <Route path="inicio" element={<BotonesInicio />} />
            <Route path="inicio/newticket" element={<NewTicket />} />
            <Route path="admin" element={<Admin />} />
            <Route path="inicio/listticket" element={<ListTicket />} />
            <Route path="inicio/ListTicketTecnicos" element={<ListTicketTecnicos />} />
            <Route path="inicio/pagehorariostecnicos" element={<PageHorariosTecnicos />} />
            <Route path="inicio/pageobjetivos" element={<PageObjetivos />} />
            <Route path="analisview" element={<AnalisView />} />
            <Route path="monitorview" element={<MonitorView />} />
            <Route path="workplaceview" element={<WorkplaceView />} />
            <Route path="accountcenter" element={<AccountCenter />} />
            <Route path="newHorario" element={<PageNewHorario />} />
            <Route path="objetivos" element={<CardObjetivosSalones />} />
            <Route path="facturacion" element={<CardFacturacionSalones />} />
            <Route path="maquinasAdmin" element={<PageMaquinasAdmin />} />
          </Route>
        </Route>
      </Route>
    </Routes>

  );
}
export default App;