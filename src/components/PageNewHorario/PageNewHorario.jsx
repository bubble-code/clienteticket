import React, { useState } from "react";
import { Col, Divider, Row, Table } from "antd";
import TabListComunidadesHeader from "../tabsListSalonesHeader/TabListSalones";
import DatePick from '../DatePick/index';
import { month } from '../month'
import MenuTopHorario from "../component/MenuTopHorario";


import './style.css';
import TableHorarioCreate from "../tableHorarioCreate/TableHorarioCreate";

const PageNewHorario = () => {
    const [comunidad, setComunidad] = useState(null);
    const [fecha, setFecha] = useState(null);
    return (
        <Col span={22} >
            <div className="header-title-newHorario" >
                <h1>Cuadrante horario</h1>
                <h1>{comunidad}</h1>
            </div>
            <TabListComunidadesHeader setComunidad={setComunidad} />
            <Row gutter={6} className="row-fecha-horario" >
                <Col span={3} >
                    <DatePick setFecha={setFecha} type='month' />
                </Col>
                <Col span={3}>
                    <h1>{month[(new Date(fecha).getMonth())]}</h1>
                </Col>
            </Row>
            <Col span={24}>
                <TableHorarioCreate />
            </Col>
            {/* <MenuTopHorario /> */}
        </Col >
    );
}

export default PageNewHorario;