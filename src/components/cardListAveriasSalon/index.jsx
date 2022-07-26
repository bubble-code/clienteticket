import React, { useState, useEffect } from "react";
import { Card, Row, Space, Segmented, Col, Table, Tag } from 'antd';

import useAuth from "../../hooks/useAuth";
import DataService from '../../service/service';
import { columnsRender } from './columnsRender';
import "./style.css"



const CardListAveriasSalon = ({ salon }) => {
    const [segmentValue, setSegmentValue] = useState("Abiertos");
    const [listTickets, setListTickets] = useState([]);
    const { auth } = useAuth();
    const { user } = auth;
    const dataListTickets = [];
    const onChangeSegment = async (e) => {
        if (e === 'Abiertos') {
            const data = await DataService.getTicketCloseByHall({ hall: user });
            data.map(ticket => console.log(ticket.data()));
        } else if (e === "Cerrados") {
            loadListFauls();
        }
        setSegmentValue(e);
    }
    const loadListFauls = async () => {
        let res;
        try {
            res = await DataService.getListaAverias(user);
        } catch (error) {
            console.log('error');
        }
        buildList(res);

    }

    const buildList = (listDocs) => {
        listDocs?.forEach((doc, index) => {
            const tem = doc.data();
            const { currentDate, state = 'Abierto', detallesTicket = "", taquillero, maquina } = tem;
            dataListTickets.push({ key: index, Ticket: index, Creado: currentDate, Asunto: detallesTicket, tags: [state], taqui: [taquillero], Taquillero: taquillero, Maquina: maquina });
        })
        setListTickets(dataListTickets)
    }

    useEffect(() => {
        loadListFauls();
    }, []);

    return (
        <Card className="mainCardListTicket">
            <h3>LISTA DE AVERIAS</h3>
            <Row >
                <Col span={24}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Segmented options={['Abiertos', 'Cerrados']} value={segmentValue} onChange={onChangeSegment} />
                    </Space>
                </Col>
            </Row>
            <Row  >
                <Col span={24}>
                    <Table columns={columnsRender} dataSource={listTickets} style={{ width: '100%', fontSize: '0,2rem' }} />
                </Col>
            </Row>
        </Card>
    )
}

export default CardListAveriasSalon;