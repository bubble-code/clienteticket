import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DataService from '../../service/service';
import ModalStartWorkingDayTec from "../modalIniciarJornada/ModalStartWorkingDayTec";
import { Card, Statistic } from 'antd';
import './style.css';
import { Container } from "reactstrap";

const BotonesInicio = () => {
  const [isInicio, setIsInicio] = useState(false)
  const [visibleIniciarJornada, setVisibleIniciarJornada] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const { user, comunidad } = auth;


  const handleListTicketTecnicos = (e) => {
    e.preventDefault();
    navigate('/pagetecnicos/ListTicketTecnicos')
  }
  const handleHorariosTecnicos = (e) => {
    navigate('PageHorariosTecnicos', { replace: true });
  }

  const loadIsInicio = async ({ user, aut }) => {
    let res;
    try {
      res = await DataService.getStateInicioTecnico({ tec: user })
      setAuth({ isInicio: res, ...aut })
      setIsInicio(res)

    } catch (error) {
      console.log(error);
    }
  }
  const setIniciarJornadas = async () => {
    setVisibleIniciarJornada(true);
    setIsInicio(true)
  }
  const setFinalizarJornadas = async () => {
    try {
      await DataService.setFinalizarJornada({ tec: user, comunidad })
      setIsInicio(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadIsInicio({ user, aut: auth });  
}, [ user])
return (
  <Container span={24} className='container-page-inicio-tec' >
    <Card className="boton-inicio-ticket" onClick={handleListTicketTecnicos}>
      <Statistic value={'Averias'} precision={2} valueStyle={{ color: '#3f8600', }} />
    </Card>
    {!isInicio ?
      <Card className="boton-inicio-ticket" onClick={setIniciarJornadas}>
        <Statistic value={'Iniciar'} precision={2} valueStyle={{ color: '#3f8600', }} />
      </Card> :
      <Card className="boton-inicio-ticket" onClick={setFinalizarJornadas}>
        <Statistic value={'Finalizar'} precision={2} valueStyle={{ color: '#3f8600', }} />
      </Card>
    }

    {/* <Card className="boton-inicio-ticket" onClick={handleListTicketTecnicos}>
      <Statistic value={'Averias'} precision={2} valueStyle={{ color: '#3f8600', }} />
    </Card>
    <Card className="boton-inicio-ticket" onClick={setIniciarJornadas}>
      <Statistic value={'Iniciar'} precision={2} valueStyle={{ color: '#3f8600', }} />
    </Card> */}
    <ModalStartWorkingDayTec isVisible={visibleIniciarJornada} setVisible={setVisibleIniciarJornada} />
  </Container>
);
}
export default BotonesInicio;