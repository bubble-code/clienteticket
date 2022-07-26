import React, { useEffect, useState } from 'react';
import DataService from '../service/service'
import useAuth from '../hooks/useAuth';
import { Row, Col, Statistic, Card, Menu } from 'antd';
import ChartObjetivosView from './ChartObjetivos';
import iconTarget from '../style/img/objetivo.gif';
import '../style/PageObjetivos.css'
import { async } from '@firebase/util';
import { useCallback } from 'react';

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDay();
const currentWeek = date.getDay() + 7;

const itemsMenu = [
  { key: `${currentMonth}`, label: 'Mes Actual' },
  { key: `dia${currentDay}`, label: 'Dia Actual' },
  { key: `semana${currentWeek}`, label: 'Semana Actual' },
];

const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',];
const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const orderArray = (array) => {
  const newArray = [];
  array.forEach(element => {
    newArray.push(element);
  })
  return newArray;
}


const PageObjetivos = () => {
  const [obj, setObj] = useState(0);
  const [ddia, setDDia] = useState('');
  const [rancking, setRancking] = useState([]);
  const { auth } = useAuth();
  const { comunidad, user } = auth;
  const rankingSalones = [];
  const getObjetivos = async () => {
    const objetivos = await DataService.getObjetivosBySalon({ comunidad: comunidad, salon: user, periodo: 3 });
    // para obtener la posicion del salon
    const listSalones = await DataService.getListHall({ comunidad: comunidad });
    Promise.all(
      listSalones.map(async (salon) => {
        const { totalDiario: totalDia } = await DataService.getObjetivosLastDayByAlcanzadosBySalon({ comunidad: comunidad, salon: salon.id, periodo: 3, dia: currentDay });
        rankingSalones[salon.id] = totalDia;
      })).then(() => {
        // const arrayOrdenado = rankingSalones.sort((a, b) => b - a);
        setRancking(rankingSalones);
      })
    setRancking(rankingSalones);
    console.log(rancking);
    // fin
    const ob = objetivos.objetivo 
    const totalAlcanzado = await DataService.getObjetivosTotalAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3 });
    const { totalDiario, diaa } = await DataService.getObjetivosLastDayByAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3, dia: currentDay });
    const diaActualizacion = new Date(`${date.getFullYear() + '-' + date.getMonth() + '-' + diaa}`).getDay();
    const currentDay1 = ` ${dayOfWeek[diaActualizacion] + ' ' + diaa + ` - ` + month[(date.getMonth())] + ' - ' + date.getFullYear()}`
    setDDia(currentDay1);
    setObj({ ob, totalAlcanzado, totalDiario, diaa });
  }
  const onCLickMenu = async (e) => {
  }
  useEffect(() => {
    getObjetivos();
  },[])
  return (
    <Col span={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
        <Col span={6} >
          <div className='card-left-horario-page'>Objetivos del Trimestre {user}
            <img className='icon-target' src={iconTarget} alt="user" />
          </div>
          <div className='card-left-horario-page'>Rango de Tiempo
            <Menu
              onClick={(e) => onCLickMenu(e)}
              defaultSelectedKeys={[`${currentMonth}`]}
              mode='inline'
              items={itemsMenu} />
            {/* <p>Mes Actual</p>
          <p>Semana Actual</p> 
          <p>Dia Actual</p> */}
          </div>
        </Col>
        <Col span={18}>
          <h1>Ultima Actualizacion: {ddia}</h1>
          <h1>Posicion del Salon: {rancking.length}</h1>
          <Row>
            <Col span={6} className='card-new-objetivos' >
              <Card style={{ background: 'transparent' }}>
                <Statistic title="Diario Alcanzado" value={obj.totalDiario} precision={2} decimalSeparator="," groupSeparator='.' suffix="€" />
              </Card>
            </Col>
            <Col span={6} className='card-new-objetivos' >
              <Card style={{ background: 'transparent' }}>
                <Statistic title="Total Alcanzado" value={obj.totalAlcanzado} precision={2} decimalSeparator="," groupSeparator='.' suffix="€" />
              </Card>
            </Col>
            <Col span={6} className='card-new-objetivos' >
              <Card style={{ background: 'transparent' }}>
                <Statistic title="Objetivo Trimestre" value={obj.ob} precision={0} decimalSeparator="," groupSeparator='.' suffix="€" />
              </Card>
            </Col>
          </Row>
          <Row gutter={24} justify='start'>
            <Col span={22} >
              <ChartObjetivosView />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
export default PageObjetivos;