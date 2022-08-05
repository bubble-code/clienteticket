import React from "react";
import { Container } from "reactstrap";
import { Col, Row } from "antd";
import ChartObjetivosView from "../ChartObjetivos";
import CardRanking from "../cardRankig";
import CardRepoDiario from "../cardReporteDiario";
import CardTotalAlcanzado from "../cardTotalAlcanzado";
import CardObjTrimestre from "../cardObjTrimestre";

import './style.css'



const PageInicioSalon = () => {

    return (
        <Row >
            <Col span={16}>
                <Container className="div1">
                    <ChartObjetivosView style={{ height: '14rem' }} />
                </Container>,
            </Col>
            <Col span={6}>
                <CardRanking className="div2" />,
            </Col>

            <Col span={8}>
                <CardRepoDiario title="DIARIO ALCANZADO" />
            </Col>
            <Col span={8}>
                <CardTotalAlcanzado title="TOTAL ALCANZADO" />,
            </Col>
            <Col span={8}>
                <CardObjTrimestre title="OBJETIVOS TRIMESTRE" />,
            </Col>

        </Row>
    )
}

export default PageInicioSalon;