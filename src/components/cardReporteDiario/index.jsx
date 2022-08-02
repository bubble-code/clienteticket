import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, Statistic, Divider, Row } from 'antd';
import "./style.css"

import DataService from "../../service/service";
import useAuth from "../../hooks/useAuth";



const CardRepoDiario = ({ title }) => {
    const [diario, setDiario] = useState(0)
    const [dia, setDia] = useState(0)
    const { auth } = useAuth();
    const { comunidad, user } = auth;
    const date = new Date();

    const loadigDiario = async () => {
        const { totalDiario, diaa } = await DataService.getObjetivosLastDayByAlcanzadosBySalon({
            comunidad: comunidad,
            salon: user,
            periodo: 3,
            mes: date.getMonth() + 1
        });
        const diaActualizacion = `${diaa + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear()}`;
        setDiario(totalDiario);
        setDia(diaActualizacion);
    }

    useEffect(() => {
        loadigDiario();
    }, [comunidad, user])
    return (
        <Card className="cardRepoDiario" bordered={false} >
            <h5>{title}</h5>
            <Row>
                <Statistic title={`Actualizado: ${dia}`} value={diario} valueStyle={{ color: 'white', fontSize: '2rem', color: '#2d8515', fontWeight: 600 }} style={{ color: 'white' }} precision={2} prefix={"€"} groupSeparator="." decimalSeparator="," />
            </Row>
            {/* <Progress percent={150} status="active" /> */}
            {/* <Divider className="cardRepoDiario-divider" /> */}
        </Card>
    )
}
export default CardRepoDiario;