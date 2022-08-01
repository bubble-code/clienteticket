import React, { useState } from 'react';
import TableFacturacionSalon from '../tableFacturacionSalon';
import { Row, Col, Divider } from 'antd';
import './style.css';
import DatePick from '../DatePick';

const date = new Date();
const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


const FormFacturacionSalones = ({ comunidad }) => {
    const [currfecha, setFecha] = useState(currentDate);

    return (

        <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }} >
            <Col span={22} className="gutter-row"  >
                <Row justify='start' className='title-table-objetivos'>
                    <h1 style={{ marginBottom: 0 }}>Facturacion de salones de {comunidad}</h1>
                    <DatePick setFecha={setFecha} />
                    <h1>{currfecha}</h1>
                    <Divider id='divider-obj' />
                </Row>
            </Col>
            <Col span={8}  >
                <TableFacturacionSalon comunidad={comunidad} periodo={3} fecha={currfecha} />
            </Col>
        </Row>
    );
};

export default FormFacturacionSalones;