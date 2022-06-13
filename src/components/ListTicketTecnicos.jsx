import React, { useEffect, useState } from "react";
import DataService from '../service/service';
import { Col, Row, Space, Table, Tag, Badge, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Creado',
    dataIndex: 'Creado',
    key: 'Creado',
  },
  {
    title: 'Maquina',
    dataIndex: 'Maquina',
    key: 'Maquina',
  },
  {
    title: 'Estado',
    key: 'Estado',
    dataIndex: 'Estado',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color;
          // let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'Abierto') {
            color = 'green';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Salon',
    dataIndex: 'Salon',
    key: 'Salon',
  },
  {
    title: 'Taquillero',
    dataIndex: 'Taquillero',
    key: 'Taquillero',
  }
];

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: 'Action 1',
      },
      {
        key: '2',
        label: 'Action 2',
      },
    ]}
  />
);

const ListTicketTecnicos = () => {
  const dataListTickets = [];
  const [listTickets, setListTickets] = useState([]);
  const loadListTicket = async () => {
    let res;
    try {
      res = await DataService.getListTicketTecnico();
    } catch (error) {
      console.log(error);
    }
    buildList(res);
  }
  const buildList = (listDocs) => {
    listDocs?.forEach((doc, index) => {
      const tem = doc.data();
      const { currentDate, state = 'Abierto', detallesTicket = "", taquillero, maquina, user } = tem;
      dataListTickets.push({ key: index, Ticket: index, Creado: currentDate, Asunto: detallesTicket, tags: [state], Taquillero: taquillero, Maquina: maquina, Salon: user });
      expandedRowRender({ key: index, Detalles: detallesTicket })
    })
    setListTickets(dataListTickets)
  }

  const expandedRowRender = ({ key, Detalles }) => {
    // console.log({ key, Detalles })
    const columns = [
      {
        title: 'Detalles',
        dataIndex: 'Detalles',
        key: 'Detalles',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Resolver</a>
            <a>Aplazar</a>
          </Space>
        ),
      },
    ];
    const data = [];
    data.push({ key, Detalles })

    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i,
    //     Detalles: '2014-12-24 23:12:00',
    //   });
    // }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  useEffect(() => {
    loadListTicket();
  }, [])

  return (<Col>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} >
    </Row>
    <Row  >
      <Col span={18} className="gutter-row" offset={3}>
        <Table columns={columns} dataSource={listTickets} style={{ width: '100%' }} expandable={{ expandedRowRender: (record) => { return <p>{record.Asunto}</p> } }} />
      </Col>
    </Row>
  </Col>)
}

export default ListTicketTecnicos;