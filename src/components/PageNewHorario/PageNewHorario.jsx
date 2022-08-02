import React, { useState } from "react";
import { Button, Col, Divider, Row, Table } from "antd";
import TabListComunidadesHeader from "../tabsListSalonesHeader/TabListSalones";
import DatePick from '../DatePick/index';
import { month } from '../month';


import './style.css';
import TableHorarioCreate from "../tableHorarioCreate/TableHorarioCreate";
import ModalAddTurnoJobs from "../modalAddTurnosJobs/ModalAddTurnosJobs";

const PageNewHorario = () => {
    const [comunidad, setComunidad] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);
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
                <Col span={3}>
                    <Button type="primary" onClick={() => { setIsModalVisible(true) }}>Nuevo turno</Button>
                </Col>
            </Row>
            <Col span={24}>
                <TableHorarioCreate mes={new Date(fecha).getMonth() + 1} />
            </Col>
            {/* <MenuTopHorario /> */}
            <ModalAddTurnoJobs isOpen={isModalVisible} funOpen={setIsModalVisible} datte={fecha} comunidad={comunidad} />
        </Col >
    );
}

export default PageNewHorario;