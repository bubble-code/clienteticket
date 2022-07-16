import React, { useEffect, useState } from "react";
import DataService from '../service/service';
import useAuth from '../hooks/useAuth';
import { Col, Row, Space, Table, Tag, Badge, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ModalAccionTicker from "./ModalAccionTicke";
import ModalAplazarTicker from "./ModalAplazarTicket";

const ListTicketTecnicos = () => {
  const [isInicio, setIsInicio] = useState(false)
  const [visibleModalAccinoTicke, setVisibleModalAccinoTicke] = useState(false);
  const [visibleModalAplazarTicke, setVisibleModalAplazarTicke] = useState(false);
  const [idModal, setIdModal] = useState(0);
  const dataListTickets = [];
  const { auth } = useAuth();
  // const { isInicio } = auth;
  const { user } = auth;
  const [listTickets, setListTickets] = useState([]);
  // console.log(auth)
  const showModal = ({ id }) => {
    setIdModal(id)
    // console.log(id)
    setVisibleModalAccinoTicke(true);
  };
  const showModalAplazar = ({ id }) => {
    setIdModal(id)
    // console.log(id)
    setVisibleModalAplazarTicke(true);
  };
  const handleModalAplazar = () => {
    setVisibleModalAplazarTicke(false);
  }
  const handleCancel = () => {
    setVisibleModalAccinoTicke(false);
  };
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
  const columns = [
    {
      title: 'Salon',
      dataIndex: 'Salon',
      key: 'Salon',
    },
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
            color = tag === 'Abierto' ? 'green' : 'geekblue';

            // if (tag === 'Abierto') {
            //   color = 'green';
            // } else {
            //   color = 'geekblue';
            // }

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
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: isInicio ? (_, record) => (
        <Space size="middle">
          <Button onClick={() => { showModal({ id: record.key }) }} >Resolver</Button>
          <Button onClick={() => { showModalAplazar({ id: record.key }) }}>Aplazar</Button>
        </Space>
      ) : () => <></>,
    },
  ];
  // console.log({ isInicio })
  const loadListTicket = async () => {
    let res;
    try {
      res = await DataService.getListTecnicosByComu();
    } catch (error) {
      console.log(error);
    }
    buildList(res);
  }
  const buildList = (listDocs) => {
    listDocs?.forEach((doc, index) => {
      const tem = doc.data();
      const { currentDate, state = 'Abierto', detallesTicket = "", taquillero, maquina, user } = tem;
      dataListTickets.push({ Salon: user, key: doc.id, Ticket: doc.id, Creado: currentDate, Asunto: detallesTicket, tags: [state], Taquillero: taquillero, Maquina: maquina, });
      expandedRowRender({ key: doc.id, Detalles: detallesTicket })
    })
    setListTickets(dataListTickets)
  }

  const expandedRowRender = ({ key, Detalles }) => {
    // console.log({ key })
    const columns = [
      {
        title: 'Detalles',
        dataIndex: 'Detalles',
        key: 'Detalles',
      },
    ]
    const data = [];
    data.push({ key, Detalles })
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  useEffect(() => {
    loadListTicket();
    loadIsInicio(user)
  }, [])

  return (<Col>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} >
    </Row>
    <Row  >
      <Col span={18} className="gutter-row" offset={3}>
        <Table columns={columns} dataSource={listTickets} style={{ width: '100%' }} expandable={{ expandedRowRender: (record) => { return <p>{record.Asunto}</p> } }} />
      </Col>
    </Row>
    <ModalAccionTicker visibl={visibleModalAccinoTicke} cancel={handleCancel} id={idModal} />
    <ModalAplazarTicker visibl={visibleModalAplazarTicke} cancel={handleModalAplazar} id={idModal} />
  </Col>)
}

export default ListTicketTecnicos; 