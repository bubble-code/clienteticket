import React, { useEffect, useState } from "react";
import DataService from '../../service/service';
import { Button, Col, Divider, Row, Table } from "antd";
import './style.css';



const BotonesSalon = ({ comunidad, setSalon }) => {
    const [salones, setSalones] = useState([]);
    const [activeSalon, setActiveSalon] = useState(null);

    const onClickSalon = (id) => {
        setActiveSalon(id);
        setSalon(id);
    }
    const loadSalones = async () => {
        const arraySalones = await DataService.getListHall({ comunidad });
        setSalones(arraySalones);
    }

    useEffect(() => {
        loadSalones();
    }, [comunidad]);

    return (
        <>
            {salones.map((salon) => {
                return (
                    <Button
                        key={salon.id}
                        id={salon.id}
                        type='primary'
                        className={`boton-salones ${activeSalon === salon.id ? 'active' : ''}`}
                        onClick={() => onClickSalon(salon.id)}
                    >
                        {salon.id}
                    </Button>)
            }
            )
            }
        </>)
}

export default BotonesSalon;