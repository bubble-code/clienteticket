import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Typography, Card } from 'antd';
import DataService from '../service/service';
import useAuth from '../hooks/useAuth';
import '../style/TablehorarioTecnicos.css';


const { Text } = Typography;
const date = new Date()
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

  const dd = async () => {
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

    let globalQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Global" });
    let partialQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Partial" });
    let tecnicoQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Tecnico" });
    let alCierreQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "AlCierre" });
    let guardiaQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Guardia" });
    let otrosQuery = await DataService.getPartialRecaudacion({ comunidad: comunidad, mes: "Julio", queryData: "Otros" });

    globalQuery.forEach((el, key) => {
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
  }

  useEffect(() => {
    dd();
  }, [])
  return (
    <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
      <Col span={6} >
        <div className='card-left-horario-page'>Horarios Técnicos {comunidad}</div>
        <div className='card-left-horario-page'>Rango de Tiempo
          <p>Mes Actual</p>
          <p>Semana Actual</p>
          <p>Dia Actual</p>
        </div>
      </Col>
      <Col span={18} >
        <Card className='main-card-horario-page'  >
          <Row>
            <Table className='tableHorarioTecnicos'
              columns={columns}
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