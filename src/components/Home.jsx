import React from "react";
import { Outlet } from 'react-router-dom';
import PageAdmin from "./PageAdmin";
import useAuth from "../hooks/useAuth";


const Home = () => {
  const { auth } = useAuth();
  const { role } = auth;
  console.log(role)
  return (
    <div>
      {role === 1 && <PageAdmin />}
      {role === 1 ? <></> : <Outlet />}

    </div>
  );
}
export default Home;