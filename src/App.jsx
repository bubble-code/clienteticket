import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Layout from './components/Layouts';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import 'antd/dist/antd.css';
import Admin from './components/Admin';
import NewTicket from './components/NewTicket';
import ListTicket from './components/ListTicket';


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
          <Route path="newticket" element={<NewTicket />} />
          <Route path="listticket" element={<ListTicket />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>

  );
}
export default App;