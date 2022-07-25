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
    getItem('Inicio', 'inicio', <TableOutlined />,),
    getItem('Crear Ticket', 'inicio/newticket', <TableOutlined />,),
    getItem('Lista de Ticket', 'inicio/listticket', <TableOutlined />,),
    getItem('Horarios Tecnicos', 'inicio/pagehorariostecnicos', <TableOutlined />),
    getItem('Dashboard', 'sub1', <FieldTimeOutlined />),
];

const MenuLayoutSalones = () => {
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(e.key, { replace: true });
    };
    return (
        <div style={{ display: "grid", gridTemplateColumns: '1fr 4fr', marginRight: 0, height: '100%' }}  >
            <Col style={{ width: 250 }} >
                {/* <Col style={{ border: 'solid 1px red' }}> */}
                <Layout.Sider style={{ width: 256, background: 'transparent !important' }} >
                    <Menu onClick={onClick} style={{ background: 'transparent !important' }} defaultSelectedKeys={['inicio']} defaultOpenKeys={['sub1']} mode="vertical" items={items} />
                </Layout.Sider>
                {/* </Col> */}
            </Col>
            <Col >
                <Outlet />
            </Col>
        </div>
    );
}

export default MenuLayoutSalones;