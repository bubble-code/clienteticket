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
  getItem('Dashboard', 'sub1', <FieldTimeOutlined />, [
    getItem('Analisis', 'analisview'),
    getItem('Monitor', 'monitorview'),
    getItem('Workplace', 'workplaceview'),
  ]),
  getItem('Account', 'sub2', <UserOutlined />, [
    getItem('Account Center', 'accountcenter'),
    getItem('Account Settings', '5'),
  ]),
  getItem('List', 'sub3', <TableOutlined />, [
    getItem('Search List', '6'),
    getItem('Faults List', '7'),
    getItem('Solved List', '8'),
    getItem('Delayed List', '9'),
  ]),
];

const PageAdmin = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log('click ', e);
    navigate(e.key, { replace: true });
  };
  return (
    <Row style={{ display: "grid", gridTemplateColumns: '1fr 4fr' }}>
      <Col >
        <Layout.Sider>
          <Menu onClick={onClick} style={{ width: 256, }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" items={items} theme="dark" />
        </Layout.Sider>
      </Col>
      <Col >
        <Outlet />
      </Col>
    </Row>
  );
}

export default PageAdmin;