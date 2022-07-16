import React, { useEffect, useState } from 'react';
import DataService from '../service/service'
import useAuth from '../hooks/useAuth';
import { Row, Col, Statistic, Card, Menu } from 'antd';
import ChartObjetivosView from './ChartObjetivos';
import iconTarget from '../style/img/objetivo.gif';
import '../style/PageObjetivos.css'

const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDay();
const currentWeek = date.getDay() + 7;

const itemsMenu = [
  { key: `${currentMonth}`, label: 'Mes Actual' },
  { key: `dia${currentDay}`, label: 'Dia Actual' },
  { key: `semana${currentWeek}`, label: 'Semana Actual' },
];


const PageObjetivos = () => {
  const [obj, setObj] = useState(0);
  const { auth } = useAuth();
  const { comunidad, user } = auth;
  const getObjetivos = async () => {
    const objetivos = await DataService.getObjetivosBySalon({ comunidad: comunidad, salon: user, periodo: 3 });
    const ob = objetivos.objetivo
    const totalAlcanzado = await DataService.getObjetivosTotalAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3 });
    const tDiario = await DataService.getObjetivosLastDayByAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3, dia: currentDay });
    const totalDiario = tDiario.data().value;
    setObj({ ob, totalAlcanzado, totalDiario });
  }
  const onCLickMenu = async (e) => {
  }
  useEffect(() => {
    getObjetivos();
  }, [])
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
            <Col span={18} >
              <ChartObjetivosView />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
export default PageObjetivos;