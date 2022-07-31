import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataService from '../../service/service';
import useAuth from '../../hooks/useAuth';
import SelectList0 from '../SelectListMauinas';
import TabListComunidadesHeader from '../tabsListSalonesHeader/TabListSalones';
import { Form, Input, Button, Switch, Space, Row, Col, Divider, message, Card } from 'antd';
import './style.css';

const { TextArea } = Input;
const listPriority = [
    { id: 'Baja' },
    { id: 'Normal' },
    { id: 'Alta' },
    { id: 'Emergencia' }
]
const estateMachine = [
    { id: 'Encendida' },
    { id: 'Fuera de Servicio' }
]
const CardObjetivosSalones = () => {
    const [listMaquinas, setListMaquinas] = useState([]);
    const [listTipoAverias, setlistTipoAverias] = useState([]);
    const [form] = Form.useForm();
    const { auth } = useAuth();
    const { user } = auth;
    const navigate = useNavigate();

    /**
     * GoBack() is a function that navigates to the root route, replacing the current
     * route in the history stack.
     */
    const goBack = () => navigate(-1)
    /**
     * Onfinish is a function that takes in a parameter called values, and then
     * creates a new date, and then displays a message, and then resets the form, and
     * then calls a function called DataService.newTicket, and then calls a function
     * called goBack.
     */
    const onfinish = async (values) => {
        const date = new Date();
        const currenTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        message.success("Ticket creado correctamente");
        form.resetFields();
        await DataService.newTicket({ ...values, currentDate, currenTime, user });
        // goBack();
    }
    /**
     * LoadLists is an async function that calls DataService.getMaquinas and
     * DataService.getTipostAverias, and then sets the state of listMaquinas and
     * listTipoAverias.
     */
    const loadLists = async (salon) => {
        try {
            const listMaquinas = await DataService.getMaquinas(salon);
            const listTipAverias = await DataService.getTipostAverias();
            setListMaquinas(listMaquinas.docs);
            setlistTipoAverias(listTipAverias.docs)
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        loadLists(user);
    }, [user]);
    return (
        <Card className='mainCardTicket' >
            <TabListComunidadesHeader />
        </Card >
    );
};



export default CardObjetivosSalones;




