import React from "react";
import { Outlet } from 'react-router-dom';
import PageAdmin from "./PageAdmin";
import MenuLayoutSalones from "./MenuLayoutSalones";
import useAuth from "../hooks/useAuth";
import BotonesInicio from "./BotonesInicio";


const Home = () => {
  const { auth } = useAuth();
  const { role } = auth;
  console.log(role)
  return (
    <div>
      {role === 1 && <PageAdmin />}
      {role === 4 && <MenuLayoutSalones />}
      {role === 2 && <BotonesInicio />}
      {/* {role === 2 ? <></> : <Outlet />} */}

    </div>
  );
}
export default Home;