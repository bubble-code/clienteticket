import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { Col, Menu, Row } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import Calendario from '../calendario/Calendario';
import './style.css';
import CardListTecLeft from '../cardListTecLeft';

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
    getItem('Inicio', '/salon/inicio', <TableOutlined />,),
    getItem('Crear Ticket', 'newticket', <TableOutlined />,),
    getItem('Lista de Ticket', 'listticket', <TableOutlined />,),
    getItem('Horarios Tecnicos', 'pagehorariostecnicos', <TableOutlined />)
];

const MenuLayoutSalones = () => {
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(e.key, { replace: true });
    };
    return ( 
        <div style={{ display: "grid", gridTemplateColumns: '1fr 5fr', marginRight: 0, height: '100%' }}  >
            <Col style={{ marginTop: '50px' }} span={20} >
                {/* <Col style={{ border: 'solid 1px red' }}> */}
                {/* <Layout.Sider style={{ width: '100% !important', background: 'transparent !important', border:'solid 1px red' }} > */}
                <Menu onClick={onClick} style={{ background: 'transparent !important' }} defaultSelectedKeys={['inicio']} defaultOpenKeys={['sub1']} mode="vertical" items={items} />
                <Calendario />
                <CardListTecLeft />
                {/* </Layout.Sider> */}
                {/* </Col> */}
            </Col>
            <Col span={20} >
                <Outlet />
            </Col>
        </div>
    );
}

export default MenuLayoutSalones;