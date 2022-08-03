import React, { useState } from "react";
import { Button, Col, Divider, Row, Table } from "antd";


import './style.css';
import TabListComunidadesHeader from "../tabsListSalonesHeader/TabListSalones";
import TableListMaquinas from "../tableListMaquinas/TableListMaquinas";
import BotonesSalon from "../botonesSalon";

const PageMaquinasAdmin = () => {
    const [comunidad, setComunidad] = useState(null);
    const [salas, seSalas] = useState([]);
    const [salon, setSalon] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <Col span={22} >
            <div className="header-title-newHorario" >
                <h1>Listado de Maquinas por Salones</h1>
                <h1>{comunidad}</h1>
            </div>
            <Col span={24}>
                <TabListComunidadesHeader setComunidad={setComunidad} />
            </Col>
            {comunidad ?
                <Row span={24}>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col>
                                <BotonesSalon comunidad={comunidad} setSalon={setSalon} />
                            </Col>
                            <Button type="primary" onClick={() => setIsModalVisible(true)} >Agregar Maquina</Button>
                        </Row>
                        <TableListMaquinas salon={salon} />
                    </Col>
                </Row> :
                <Col span={24}></Col>}
        </Col >
    );
}

export default PageMaquinasAdmin;