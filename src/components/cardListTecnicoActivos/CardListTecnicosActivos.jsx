import React from "react";
import { Card, Divider, List, Badge } from 'antd';
import './style.css';



const renderRanking = ({ id, activo }) => {
    return (
        <div>
            <Badge status={activo ? 'success' : 'default'} text={id} className='tec-activos-badge' />
        </div>
    )
};


const CardListTecnicosActivos = ({ listTecnicos }) => {

    return (
        <Card className="cardRanking" bordered={false}  >
            <h5>Tecnicos Activos</h5>
            <Divider className="cardRanking-divider" />
            <List size="small" dataSource={listTecnicos} renderItem={renderRanking} />
        </Card>
    )
}

export default CardListTecnicosActivos;