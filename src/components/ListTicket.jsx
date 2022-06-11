import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Row, Col, Space, Segmented, Tag, Table } from "antd";
import DataService from '../service/service';


const columns = [
  // {
  //   title: 'Ticket',
  //   dataIndex: 'Ticket',
  //   key: 'Ticket',
  //   // render: (text) => <a>{text}</a>,
  // },
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
    title: 'Asunto',
    dataIndex: 'Asunto',
    key: 'Asunto',
  },
  {
    title: 'Taquillero',
    dataIndex: 'Taquillero',
    key: 'Taquillero',
  }
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

const ListTicket = () => {
  const [segmentValue, setSegmentValue] = useState("Abiertos");
  const [listTickets, setListTickets] = useState([]);
  const { auth } = useAuth();
  const { user } = auth;
  const dataListTickets = [];
  const loadListFauls = async () => {
    let res;
    try {
      res = await DataService.getListaAverias(user);
    } catch (error) {
      console.log('error');
    }
    buildList(res);

  }
  const buildList = (listDocs) => {
    listDocs?.forEach((doc, index) => {
      const tem = doc.data();
      const { currentDate, state = 'Abierto', detallesTicket = "", taquillero, maquina } = tem;
      dataListTickets.push({ key: index, Ticket: index, Creado: currentDate, Asunto: detallesTicket, tags: [state], Taquillero: taquillero, Maquina: maquina });
    })
    setListTickets(dataListTickets)
  }

  useEffect(() => {
    loadListFauls();
  }, []);
  return (
    <Col>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} >

      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify='space-between'>
        <Col span={6} className="gutter-row" offset={3}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Segmented options={['Abiertos', 'Cerrados']} value={segmentValue} onChange={setSegmentValue} />
          </Space>

        </Col>
        {/* <Col span={6} className="gutter-row" offset={3}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Segmented options={['New', 'Cerrados']} value={segmentValue} onChange={setSegmentValue} />
          </Space>

        </Col> */}
      </Row>
      <Row  >
        <Col span={18} className="gutter-row" offset={3}>
          <Table columns={columns} dataSource={listTickets} style={{ width: '100%' }} />
        </Col>
      </Row>

    </Col>
  );
}

export default ListTicket;