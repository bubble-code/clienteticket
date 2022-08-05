import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { Col, Menu } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import Calendario from '../calendario/Calendario';
import './style.css';
import CardListTecLeft from '../cardListTecLeft';


const PageTecnicos = () => {
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate(e.key, { replace: true });
    };

    return (

        <Col >
            <Outlet />
        </Col>
    );

}

export default PageTecnicos;