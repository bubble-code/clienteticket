import React, { useState } from 'react';
import TabListComunidadesHeader from '../tabsListSalonesHeader/TabListSalones';
import { Card } from 'antd';
import './style.css';
import FormFacturacionSalones from '../formFacturacionSalones';


const CardFacturacionSalones = () => {
    const [currentComunidad, setCurrentComunidad] = useState(null);

    return (
        <Card className='mainCardTicket' >
            <TabListComunidadesHeader setComunidad={setCurrentComunidad} />
            <FormFacturacionSalones comunidad={currentComunidad} />
        </Card >
    );
};

export default CardFacturacionSalones;