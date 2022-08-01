import React from 'react';
import { Row, Col, Divider } from 'antd';
import './style.css';
import TableSalonesObjeEditable from '../tableSalonesObjEditable/TableSalonesObjeEditable';


const FormObjSalones = ({ comunidad }) => {
    return (

        <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }} >
            <Col span={22} className="gutter-row"  >
                <Row justify='start' className='title-table-objetivos'>
                    <h1 style={{ marginBottom: 0 }}>Objetivos para {comunidad}</h1>
                    <Divider id='divider-obj' />
                </Row>
            </Col>
            <Col span={22}  >
                <TableSalonesObjeEditable comunidad={comunidad} periodo={3} />
            </Col>
        </Row>
    );
};

export default FormObjSalones;




