import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button, Descriptions, PageHeader, Row, Statistic, Tag, Affix } from 'antd';
import '../style/menuHeader.css'

const date = new Date();
const currentDate = `Buenos dias: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const titleArray = {
  'newticket': {
    'title': 'Abrir Nuevo Ticket',
    'subtitle': currentDate
  },
  'listticket': { 'title': 'Lista de Tickets' },
  'PageHorariosTecnicos': { 'title': 'Horarios de Tecnicos' },
}


const MenuHeader = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname.replace('/inicio/', '');
  const { auth } = useAuth();
  const { role, user } = auth;
  console.log(pathName)
  return (
    <Affix offsetTop={0}>
      <PageHeader className='menu-header'
        onBack={() => navigate(-1)}
        title={titleArray[pathName].title || 'Inicio'}
        tags={<Tag color="blue">Salon: {user}</Tag>}
        subTitle={titleArray[pathName].subtitle || ''}
        extra={[
          // <Button key="3">New Ticket</Button>,
          <Statistic title="Abiertos" value="0"  style={{margin: '0 32px'}}/>,
          <Statistic title="Abiertos" value="0" style={{margin: '0 32px'}} />,
          // <Button key="2">List Ticket</Button>,
          // <Button key="2">Horarios</Button>,
          // <Button key="1" type="primary">
          //   Objetivos
          // </Button>,
        ]}
      >
        {/* <Row >
          <Statistic title="Abiertos" value="0" />
          <Statistic
            title="En Proceso"
            value={0}
            style={{
              margin: '0 32px',
            }}
          />
        </Row> */}
      </PageHeader>
    </Affix>)
};

export default MenuHeader;