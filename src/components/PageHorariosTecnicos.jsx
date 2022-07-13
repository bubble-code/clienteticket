import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Typography, Card, Menu } from 'antd';
import DataService from '../service/service';
import useAuth from '../hooks/useAuth';
import Calendario from './Calendario';
import '../style/TablehorarioTecnicos.css';
import { useCallback } from 'react';
import { async } from '@firebase/util';


const { Text } = Typography;
const date = new Date()
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentWeek = date.getDay();

const itemsMenu = [
  { key: `Month`, label: 'Mes Actual', dia: 1 },
  { key: `dia`, label: 'Dia Actual', dia: currentDay },
  { key: `semana`, label: 'Semana Actual', dia: currentWeek },
];
const currentCantDaybyMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb',];
const columns = [
  {
    title: 'Horario',
    width: 100,
    dataIndex: 'horario',
    key: 'horario',
    fixed: 'left',
  },
];
for (let i = 1; i <= currentCantDaybyMonth; i++) {
  const dayofWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();
  columns.push({
    title: `${dayOfWeek[dayofWeek]} ${i}`,
    dataIndex: i,
    key: `dia${i}`,
    width: 90,
  });
}

const PageHorariosTecnicos = () => {
  const { auth } = useAuth();
  const { comunidad } = auth;
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true)
  const [colums, setColums] = useState(columns);
  const [dayStartHorario, setDayStartHorario] = useState(currentDay - currentWeek);
  const [listTecnicos, setListTecnicos] = useState([])
  const dd = useCallback(async ({ dayStart }) => {
    const temColums1 = colums[0];
    const temColums = colums.filter(col => col.dataIndex >= dayStart);
    setColums([temColums1, ...temColums]);
    const globalObject = {
      key: 0,
      horario: `Global`,
    };
    const partialObject = {
      key: 1,
      horario: `Parcial`,
    };
    const tecnicoObject = {
      key: 2,
      horario: `Tecnico`,
    };

    const cierreObject = {
      key: 3,
      horario: `Al Cierre`,
    };
    //data Otros
    const otrosObject = {
      key: 5,
      horario: `Otros`,
    }

    let globalQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Global", startDay: dayStart });
    let partialQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Partial", startDay: dayStart });
    let tecnicoQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Tecnico", startDay: dayStart });
    let alCierreQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "AlCierre", startDay: dayStart });
    let guardiaQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Guardia", startDay: dayStart });
    let otrosQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Otros", startDay: dayStart });

    globalQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      globalObject[day] = <div className='cardInTableHorarios'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    })
    // data de parciales   
    partialQuery.forEach((el, key) => {
      let day = 0;
      day = el.id;
      partialObject[day] = <div className='cardInTableHorarios cardInTablePartial'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    })
    // data de tecnicos   
    tecnicoQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      tecnicoObject[day] = <div className='cardInTableHorarios cardInTableTecnico'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    });
    // data de cierre   
    alCierreQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      cierreObject[day] = <div className='cardInTableHorarios cardInTableCierre'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    });
    //data de Guardia
    const guardiaObject = {
      key: 4,
      horario: `Guardia`,
    }
    guardiaQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      guardiaObject[day] = <div className='cardInTableHorarios cardInTableGuardia'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    })
    // data Otros
    otrosQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      otrosObject[day] = <div className='cardInTableHorarios cardOtros'>
        <p>{el.data().place}</p>
        <p>{el.data().causa}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    })
    //data Vacaciones
    const vacacionesObject = {
      key: 6,
      horario: `Vacaciones`,
    }
    setData([globalObject, partialObject, tecnicoObject, cierreObject, guardiaObject, otrosObject, vacacionesObject]);
    setLoading(false)
  }, []);
  const loadListTecnicos = async () => {
    const queryListTecnicos = await DataService.getListTicketTecnico({ comunidad: comunidad })
    const temp = [];
    queryListTecnicos?.forEach((el) => {
      temp.push(<p>{el.id}<div><span>Movil</span><span>{el.data().movil}</span></div></p>)
    });
    setListTecnicos(temp)
  }
  const onCLickMenu = (e) => {
    const firtDayofWeek = currentDay - currentWeek;
    const f = {
      'Month': 1,
      'semana': firtDayofWeek,
      'dia': currentDay,
    }
    setDayStartHorario(f[e.key])
    // dd({ dayStart: dayStartHorario })
  }
  useEffect(() => {
    dd({ dayStart: dayStartHorario });
    loadListTecnicos();
  }, [dayStartHorario, dd]);
  return (
    <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
      <Col span={6} >
        <div className='card-left-horario-page'>Horarios Técnicos {comunidad}</div>
        <div className='card-left-horario-page'>
          <Menu
            onClick={(e) => onCLickMenu(e)}
            defaultSelectedKeys={[`semana`]}
            mode='inline'
            items={itemsMenu} />
        </div>
        <div className='card-left-horario-page'> 
          <Calendario /> 
        </div>
        <div className='card-left-horario-page card-left-horario-page-flex'>
          {[...listTecnicos]}
        </div>
      </Col>
      <Col span={18} >
        <Card className='main-card-horario-page'  >
          <Row>
            <Table className='tableHorarioTecnicos'
              columns={colums}
              dataSource={data ?? []}
              pagination={{ pageSize: 10, responsive: true, }}
              direction='ltr' scroll={{ x: 500, y: false }}
              loading={loading}
            // title={() => <Text>{`Calendario de Guardia de los tecnicos para el mes de ${date.getMonth() + 1}`} </Text>}
            />
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default PageHorariosTecnicos;