import React, { useState } from 'react';
import TabListComunidadesHeader from '../tabsListSalonesHeader/TabListSalones';
import { Card } from 'antd';
import './style.css';
import FormObjSalones from '../formObjeSalones/FormObjSalones';


const CardObjetivosSalones = () => {

    const [currentComunidad, setCurrentComunidad] = useState(null);
    return (
        <Card className='mainCardTicket' >
            <TabListComunidadesHeader setComunidad={setCurrentComunidad} />
            <FormObjSalones comunidad={currentComunidad} />
        </Card >
    );
};



export default CardObjetivosSalones;




