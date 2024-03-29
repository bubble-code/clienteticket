import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { Col, Layout, Menu, Row } from 'antd';
import { FieldTimeOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Menu Admin', '/admin', <TableOutlined />,),
  getItem('Horarios', 'horarios', <TableOutlined />, [
    getItem('Hacer Horario', 'newHorario', <TableOutlined />,),
    getItem('Listar Horario', 'listHorario', <TableOutlined />,),
  ]),
  getItem('Monitor', 'sub1', <FieldTimeOutlined />, [
    getItem('Analisis', 'analisview'),
    getItem('Mapa', 'monitorview'),
    getItem('Workplace', 'workplaceview'),
  ]),
  getItem('Account', 'sub2', <UserOutlined />, [
    getItem('Account Center', 'accountcenter'),
    getItem('Account Settings', 'PageHorariosTecnicos'),
  ]),
  getItem('List', 'sub3', <TableOutlined />, [
    getItem('Search List', '6'),
    getItem('Faults List', '7'),
    getItem('Solved List', '8'),
    getItem('Delayed List', '9'),
  ]),
  getItem('Salones', 'sub4', <TableOutlined />, [
    getItem('Objetivos', 'objetivos'),
    getItem('Facturacion', 'facturacion'),
    getItem('Maquinas', 'maquinasAdmin'),
    // getItem('Solved List', '8'),
    // getItem('Delayed List', '9'),
  ]),
];

const PageAdmin = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key, { replace: true });
  };
  return (
    <Row style={{ display: "grid", gridTemplateColumns: '1fr 4fr', marginLeft: 0 }}>
      <Col style={{ marginRight: 0 }}>
        <Layout.Sider >
          <Menu
            onClick={onClick}
            style={{ width: 256, }}
            defaultSelectedKeys={['inicio']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            theme="dark"
            inlineCollapsed={true}
          />
        </Layout.Sider>
      </Col>
      <Col style={{ marginLeft: 0 }} span={24} offset={-6}>
        <Outlet />
      </Col>
    </Row>
  );
}

export default PageAdmin;