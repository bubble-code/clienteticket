import React, { useState, useEffect } from "react";

import DataService from '../../service/service';
import useAuth from "../../hooks/useAuth";

import "./style.css"


const CardListTecLeft = () => {


    const [listTecnicos, setListTecnicos] = useState([])
    const { auth } = useAuth();
    const { comunidad } = auth;


    const loadListTecnicos = async () => {
        const queryListTecnicos = await DataService.getListTecnicosByComu({ comunidad: comunidad })
        const temp = [];
        queryListTecnicos?.forEach((el) => {
            temp.push(<p>{el.id}<div><span>{el.data().movil}</span></div></p>)
        });
        setListTecnicos(temp)
    }


    useEffect(() => {
        loadListTecnicos();
    }, [comunidad]);

    return <div className='card-left-horario-page card-left-horario-page-flex'>
        <h3>Tecnicos</h3>
        {[...listTecnicos]}
    </div>
}

export default CardListTecLeft;