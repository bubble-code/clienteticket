import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import DataService from '../service/service';
import '../style/TablehorarioTecnicos.css';


const { Text } = Typography;
const date = new Date()
const currentCantDaybyMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',];
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
    width: 150,
  });
}


// for (let i = 1; i < 10; i++) {
//   data.push({
//     key: i,
//     horario: `${i + 1}:00`,
//     dia1: 'dale',
//   });
// }


const PageHorariosTecnicos = () => {
  const [data, setData] = useState([{}])
  // const data = []
  // {
  //   key: 0,
  //   horario: `Global`,
  //   1: <div className='cardInTableHorarios'>
  //     <p>Tropicana</p>
  //     <p>04:00 - 08:00</p>
  //     <p>Yamila - Viviana</p>
  //   </div>
  // },
  // {
  //   key: 1,
  //   horario: `Parcial`,
  // },
  // {
  //   key: 2,
  //   horario: `Tecnico`,
  // },
  // {
  //   key: 3,
  //   horario: `Al Cierre`,
  // },
  // {
  //   key: 4,
  //   horario: `Vacaciones`,
  // },
  // {
  //   key: 5,
  //   horario: `Otros`,
  // }
  // ];
  const dd = async () => {
    let globalQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Global" });
    let partialQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Partial" });
    let tecnicoQuery = await DataService.getPartialRecaudacion({ comunidad: "Mallorca", mes: "Julio", queryData: "Tecnico" });
    const globalObject = {
      key: 0,
      horario: `Global`,
    };
    globalQuery.forEach((el, key) => {
      let day = 0;
      day = el.id;
      globalObject[day] = <div className='cardInTableHorarios'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    },
    )
    // data de parciales
    const partialObject = {
      key: 1,
      horario: `Parcial`,
    }
    partialQuery.forEach((el, key) => {
      let day = 0;
      day = el.id;
      partialObject[day] = <div className='cardInTableHorarios cardInTablePartial'>
        <p>{el.data().salon}</p>
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    },
    )
    // data de tecnicos
    const tecnicoObject = {
      key: 2,
      horario: `Tecnico`,
    }
    tecnicoQuery.forEach((el) => {
      let day = 0;
      day = el.id;
      tecnicoObject[day] = <div className='cardInTableHorarios cardInTableTecnico'>
        {/* <p>{el.data().salon}</p> */}
        <p>{el.data().inicio} - {el.data().fin}</p>
        <p>{el.data().Tecnicos}</p>
      </div>
    },
    );
    // data de cierre
    const cierreObject = {
      key: 3,
      horario: `Al Cierre`,
    }
    setData([globalObject, partialObject, tecnicoObject]);
  }
  useEffect(() => {
    dd();
  }, [])
  return (
    <div style={{ maxWidth: 1600, height: 'auto' }}>
      <Col span={18} offset={1}>
        <Row>
          {data ? <Table className='tableHorarioTecnicos' columns={columns} dataSource={data} pagination={false} scroll={{ x: 1500, y: 400, }} /> : <></>}
        </Row>
      </Col>
    </div>
  );
}

export default PageHorariosTecnicos;