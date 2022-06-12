import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Card, Statistic } from 'antd';
import 'antd/dist/antd.css';
import '../style/home.css';

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { role, user } = auth;
  const handleNewTicket = (e) => {
    navigate('newticket', { replace: true });
  }
  const handleListTicket = (e) => {
    navigate('listticket', { replace: true });
  }
  return (
    <div className="home">
      {role === 2 ? <></> : <h1>{user}</h1>}
      <Card style={{ marginRight: 20 }} bordered className="boton-inicio-ticket" onClick={handleNewTicket}>
        <Statistic value={'Nuevo Ticket'} precision={2} valueStyle={{ color: '#3f8600', }} />
      </Card>
      <Card style={{ marginLeft: 20 }} bordered className="boton-inicio-ticket" onClick={handleListTicket}>
        <Statistic value={'Ver Ticket'} precision={2} valueStyle={{ color: '#3f8600', }} />
      </Card>
    </div>
  );
}
export default Home;