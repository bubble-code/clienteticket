import React, { useState } from "react";
import { Button, Col, Divider, Row, Table } from "antd";


import './style.css';
import TabListComunidadesHeader from "../tabsListSalonesHeader/TabListSalones";
import TableListMaquinas from "../tableListMaquinas/TableListMaquinas";
import BotonesSalon from "../botonesSalon";
import ModalAddMaquina from "../modalAddMaquina";

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
                            {salon ? <Button type="primary" onClick={() => setIsModalVisible(true)} >Agregar Maquina</Button> : <></>}
                            <ModalAddMaquina
                                cancel={setIsModalVisible}
                                visibl={isModalVisible}
                                comunidad={comunidad}
                                salon={salon}
                            />
                        </Row>
                        {salon ? <TableListMaquinas salon={salon} /> : <h1>Seleccione un Salon</h1>}
                    </Col>
                </Row> :
                <Col span={24}><h1>Debe seleccionar una comunidad</h1></Col>}
        </Col >
    );
}

export default PageMaquinasAdmin;