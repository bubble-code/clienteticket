import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, Statistic, Divider, Row } from 'antd';

import DataService from "../../service/service";
import useAuth from "../../hooks/useAuth";



const CardObjTrimestre = ({ title }) => {
    const [trimestre, setTrimestre] = useState(0)
    const { auth } = useAuth();
    const { comunidad, user } = auth;

    const loadigTrimestre = async () => {
        const objetivo = await DataService.getObjetivosBySalon({ comunidad: comunidad, salon: user, periodo: 3 })
        setTrimestre(objetivo)
    }
    useEffect(() => {
        loadigTrimestre();
    }, [comunidad, user])
    return (
        <Card className="cardRepoDiario" bordered={false} >
            <h5>{title}</h5>
            <Row>
                <Statistic value={trimestre.objetivo} valueStyle={{ color: 'white', fontSize: '2rem', color: '#db2a34', fontWeight: 600 }} style={{ color: 'white' }} precision={2} prefix={"€"} groupSeparator="." decimalSeparator="," />
            </Row>
            {/* <Progress percent={150} status="active" /> */}
            {/* <Divider className="cardRepoDiario-divider" /> */}
        </Card>
    )
}
export default CardObjTrimestre;