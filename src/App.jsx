import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Layout from './components/Layouts';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Admin from './components/Admin';
import NewTicket from './components/NewTicket';
import ListTicket from './components/ListTicket';
import ListTicketTecnicos from './components/ListTicketTecnicos';
import BotonesInicio from './components/botonesPageTecnicos/BotonesInicio';
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
import PageMapa from './components/pagemapa/PageMapa';
import MenuLayoutSalones from './components/MenuLayoutSalones';
import PageAdmin from './components/PageAdmin';
import PageInicioSalon from './components/pageInicioSalon/PageInicioSalon';
import PageTecnicos from './components/pageTecnicos/PageTecnicos';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protect routes */}
        <Route element={<RequireAuth />}>
          <Route path="salon" element={<MenuLayoutSalones />} >
            <Route path="inicio" element={<PageInicioSalon />} />
            <Route path="newticket" element={<NewTicket />} />
            <Route path="listticket" element={<ListTicket />} />
            <Route path="pagehorariostecnicos" element={<PageHorariosTecnicos />} />
            <Route path="pageobjetivos" element={<PageObjetivos />} />
          </Route>
          <Route path="admin" element={<PageAdmin />} >
            <Route path="admin" element={<Admin />} />
            <Route path="analisview" element={<AnalisView />} />
            <Route path="monitorview" element={<PageMapa />} />
            <Route path="workplaceview" element={<WorkplaceView />} />
            <Route path="accountcenter" element={<AccountCenter />} />
            <Route path="newHorario" element={<PageNewHorario />} />
            <Route path="objetivos" element={<CardObjetivosSalones />} />
            <Route path="facturacion" element={<CardFacturacionSalones />} />
            <Route path="maquinasAdmin" element={<PageMaquinasAdmin />} />
          </Route>
          <Route path="pagetecnicos" element={<PageTecnicos />} >
            <Route path='botonesInicio' element={<BotonesInicio />} />
            <Route path="ListTicketTecnicos" element={<ListTicketTecnicos />} />

          </Route>
        </Route>
      </Route>
    </Routes>

  );
}
export default App;