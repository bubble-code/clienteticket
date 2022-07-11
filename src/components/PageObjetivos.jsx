import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import iconTarget from '../style/img/objetivo.gif';

const PageObjetivos = () => {
  return (
    <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
      <Col span={6} >
        <div className='card-left-horario-page'>Objetivos del Trimestre
          <img className='icon-target' src={iconTarget} alt="user" />
        </div>
        <div className='card-left-horario-page'>Rango de Tiempo
          <p>Mes Actual</p>
          <p>Semana Actual</p>
          <p>Dia Actual</p>
        </div>
      </Col>
      <Row gutter={{xs: 8, sm: 24, md: 24, lg: 32}}>
        <Col span={18} >
          <Card>
            <Statistic title="Objetivo" value={12.8} precision={2} suffix="%" style={{ border: '1px solid grey' }} />
          </Card>
        </Col>
      </Row>
    </Row>
  );
}
export default PageObjetivos;