import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DataService from '../service/service';
import ModalStartWorkingDayTec from "./ModalStartWorkingDayTec";
import CardInicioObjetivos from "./CardInicioSalones";
import CardInicioSalonesHorario from "./CardInicioSalonesHorario";
import CardInicioNewTicket from "./CardInicioNewTicket";
import CardInicioListTickets from "./CardInicioListTickets";
import CardRanking from "./cardRankig";
import CardRepoDiario from "./cardReporteDiario";
import CardTotalAlcanzado from "./cardTotalAlcanzado";
import CardObjTrimestre from "./cardObjTrimestre"
import { Card, Statistic } from 'antd';
import 'antd/dist/antd.css';
import '../style/home.css';
import ChartObjetivosView from "./ChartObjetivos";
import { Container } from 'reactstrap';

const BotonesInicio = () => {
  const [isInicio, setIsInicio] = useState(false)
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const { role, user } = auth;
  // console.log(setAuth)

  const handleNewTicket = (e) => {
    // e.preventDefault();
    navigate('newticket', { replace: true });
  }

  const handleListTicketTecnicos = (e) => {
    e.preventDefault();
    navigate('ListTicketTecnicos', { replace: true })
  }
  const handleHorariosTecnicos = (e) => {
    navigate('PageHorariosTecnicos', { replace: true });
  }
  const handleListTicket = (e) => {
    // e.preventDefault();
    navigate('listticket', { replace: true });
  }
  const loadIsInicio = async (user) => {
    let res;
    try {
      res = await DataService.getStateInicioTecnico({ tec: user })
      // console.log(res)
      setIsInicio(res)

    } catch (error) {
      console.log(error);
    }
  }
  const setIniciarJornadas = async () => {
    setVisible(true);
    try {
      await DataService.setIniciarJornada({ tec: user })
      setAuth({ isInicio: true, ...auth })
      // console.log(auth)
      setIsInicio(true)
    } catch (error) {
      console.log(error);
    }
  }
  const setFinalizarJornadas = async () => {
    try {
      await DataService.setFinalizarJornada({ tec: user })
      setAuth({ isInicio: false, ...auth })
      setIsInicio(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadIsInicio(user);
    // console.log(isInicio)
  }, [])
  return (role === 1 ? <></> :
    <div className="home">
      {role === 2 ?
        <Card style={{ marginLeft: 20 }} bordered className="boton-inicio-ticket" onClick={handleListTicketTecnicos}>
          <Statistic value={'Averias'} precision={2} valueStyle={{ color: '#3f8600', }} />
        </Card>
        : [
          <Container className="div1">
            <ChartObjetivosView style={{ height: '20rem' }} />
          </Container>,
          <CardRanking className="div2" />,
          <CardRepoDiario title="DIARIO ALCANZADO" />,
          <CardTotalAlcanzado title="TOTAL ALCANZADO" />,
          <CardObjTrimestre title="OBJETIVOS TRIMESTRE" />,

        ]
      }
      {/* <Card style={{ marginLeft: 20 }} bordered className="boton-inicio-ticket" onClick={handleListTicket}>
        <Statistic value={'Ver Ticket'} precision={2} valueStyle={{ color: '#3f8600', }} />
      </Card> */}

      {role === 2 ? !isInicio ? <Card style={{ marginLeft: 20 }} bordered className="boton-inicio-ticket" onClick={setIniciarJornadas}>
        <Statistic value={'Iniciar'} precision={2} valueStyle={{ color: '#3f8600', }} /> </Card>
        : <Card style={{ marginLeft: 20 }} bordered className="boton-inicio-ticket" onClick={setFinalizarJornadas}>
          <Statistic value={'Finalizar'} precision={2} valueStyle={{ color: '#3f8600', }} /> </Card>
        : <></>
      }
      <ModalStartWorkingDayTec isVisible={visible} setVisible={setVisible} />
    </div>
  );
}
export default BotonesInicio;