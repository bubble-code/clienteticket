import React from 'react';
import { Outlet } from 'react-router-dom'
import { Col } from 'antd';
import './style.css';


const PageTecnicos = () => {

    return (

        <Col >
            <Outlet />
        </Col>
    );

}

export default PageTecnicos;