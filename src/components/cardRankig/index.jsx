import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, List, Divider } from 'antd';
import oro from "../../style/img/pngwing.com.png";
import plata from "../../style/img/plata.png";
import bronce from "../../style/img/bronce.png";
import "./style.css"


import DataService from "../../service/service";
import useAuth from "../../hooks/useAuth";

const data = [
    'Carabanchel',
    'Mejorada',
    'Villanueva',
    'Alcala 2',
    'Alcobendas',
];

const renderRanking = (item, index) => {
    switch (index) {
        case 0:
            return <span className="items-ranking"><p key={index} >
                <span className="position-ranking">{index + 1}</span>
                {item}</p > <img src={oro} />
            </span>;
        case 1:
            return <span className="items-ranking"><p key={index} >
                <span className="position-ranking">{index + 1}</span>
                {item}</p > <img src={plata} />
            </span>;
        case 2:
            return <span className="items-ranking"><p key={index} >
                <span className="position-ranking">{index + 1}</span>
                {item}</p > <img src={bronce} />
            </span>;
        default:
            return <span className="items-ranking"><p key={index} >
                <span className="position-ranking">{index + 1}</span>
                {item}</p >
            </span>;
    }
}


const CardRanking = () => {
    const [ranking, setRanking] = useState([])
    const { auth } = useAuth();
    const { comunidad, user } = auth;

    const loadigRanking = async () => {
        const arrayDocs = [];
        const listSalones = await DataService.getListHall({ comunidad: comunidad });
        Promise.all(
            listSalones.map(async (salon) => {
                const { totalDiario: totalDia } = await DataService.getObjetivosLastDayByAlcanzadosBySalon({ comunidad: comunidad, salon: salon.id, periodo: 3 });
                arrayDocs.push({ salon: salon.id, totalDia });
                // arrayDocs[salon.id] = totalDia;
            })).then(() => {
                let arrayOrdenado = arrayDocs.sort(function (a, b) {
                    if (parseFloat(a.totalDia) < parseFloat(b.totalDia)) {
                        return 1;
                    }
                    if (parseFloat(a.totalDia) > parseFloat(b.totalDia)) {
                        return -1;
                    }
                    return 0;
                });
                const tem = [];
                arrayOrdenado.forEach((item, index) => {
                    tem.push(item.salon)
                })
                //   setRancking(rankingSalones);
                // console.log(arrayDocs);
                console.log({ arrayOrdenado });
                console.log({ tem });
                setRanking(tem)
            }
            );
    }

    useEffect(() => {
        loadigRanking();
    }, [comunidad])

    return (
        <Card className="cardRanking" bordered={false}  >
            <h5>Ranking de Salones por Dias</h5>
            <Divider className="cardRanking-divider" />
            <List size="small" dataSource={ranking} renderItem={renderRanking} />
        </Card>
    )
}
export default CardRanking;