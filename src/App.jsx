import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Layout from './components/Layouts';
import Home from './components/Home';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        {/* Protect routes */}
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>

  );
}
export default App;