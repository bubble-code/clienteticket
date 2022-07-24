import React from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, List, Divider } from 'antd';
import "./style.css"


const data = [
    'Carabanchel',
    'Mejorada',
    'Villanueva',
    'Alcala 2',
    'Alcobendas',
];

const CardRanking = () => {
    return (
        <Card className="cardRanking" bordered={false}  >
            <h5>Ranking de Salones</h5>
            {/* <Divider className="cardRanking-divider" /> */}
            <List size="small" dataSource={data} renderItem={(item, index) => <p><span>{index + 1}</span>{item}</p>} />
        </Card>
    )
}
export default CardRanking;