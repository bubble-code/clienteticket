import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, Statistic, Divider, Row } from 'antd';
import "./style.css"

import DataService from "../../service/service";
import useAuth from "../../hooks/useAuth";



const CardTotalAlcanzado = ({ title }) => {
    const [total, setTotal] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
    const { auth } = useAuth();
    const { comunidad, user } = auth;

    const loadigTotal = async () => {
        const objetivo = await DataService.getObjetivosBySalon({ comunidad: comunidad, salon: user, periodo: 3 })
        const totalAlcanzado7 = await DataService.getObjetivosTotalAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3, mes: 7 }) || 0;
        const totalAlcanzado8 = await DataService.getObjetivosTotalAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3, mes: 8 }) || 0;
        const totalAlcanzado9 = await DataService.getObjetivosTotalAlcanzadosBySalon({ comunidad: comunidad, salon: user, periodo: 3, mes: 9 }) || 0;
        const totalAlcanzado = totalAlcanzado7 + totalAlcanzado8 + totalAlcanzado9;
        const porce = Math.floor((Math.floor(totalAlcanzado) / Math.floor(objetivo.objetivo)) * 100);
        // console.log(Math.floor(objetivo.objetivo));
        setTotal(totalAlcanzado);
        setPorcentaje(porce);
    }
    useEffect(() => {
        loadigTotal();
    }, [comunidad, user])
    return (
        <Card className="cardRepoDiario" bordered={false} >
            <h5>{title}</h5>
            <Row>
                <Statistic value={total} valueStyle={{ color: 'white', fontSize: '2rem', color: '#2477ff', fontWeight: 600 }} style={{ color: 'white' }} precision={2} prefix={"€"} groupSeparator="." decimalSeparator="," />
            </Row>
            <Progress percent={porcentaje} status="active" />
            {/* <Divider className="cardRepoDiario-divider" /> */}
        </Card>
    )
}
export default CardTotalAlcanzado;