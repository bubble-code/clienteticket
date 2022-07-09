import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import DataService from '../service/service';
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
    width: 120,
  });
}

const PageHorariosTecnicos = () => {

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
    let globalQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Global" });
    let partialQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Partial" });
    let tecnicoQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Tecnico" });
    let alCierreQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "AlCierre" });
    let guardiaQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Guardia" });

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
    //data Otros
    const otrosObject = {
      key: 5,
      horario: `Otros`,
    }
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
    <div style={{ maxWidth: 1400, height: 'auto' }}>
      <Col span={18} offset={1}>
        <Row>
          <Table className='tableHorarioTecnicos'
            columns={columns}
            dataSource={data ?? []}
            pagination={{ pageSize: 10, responsive: true, }}
            direction='ltr' scroll={{ x: 500, y: 600 }}
            loading={loading}
            title={() => <Text>{`Calendario de Guardia de los tecnicos para el mes de ${date.getMonth() + 1}`} </Text>}
          />
        </Row>
      </Col>
    </div>
  );
}

export default PageHorariosTecnicos;