import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import DataService from '../../service/service';
import ListLeftTecHorario from './ListLeftTecnicoHorario';
import CalenNewHorario from './CalenNewHorario';
import ModalAddTurnoJobs from './ModalAddTurnosJobs';
import '../../style/gridNewHorarioStyles.css';


const MenuTopHorario = () => {
    const [itemsComunidades, setItemsComunidades] = useState([]);
    const [current, setCurrent] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());
    const loadListComunidades = async () => {
        const items = [];
        const list = await DataService.getListComunidad()//.sort((a, b) => b.id - a.id);
        list.forEach(item => {
            items.push({
                label: item.id,
                key: item.id,
                icon: <MailOutlined />,
            });
        })
        setItemsComunidades(items);
    }
    useEffect(() => {
        loadListComunidades();
    }, [])

    const onClickListTByC = (e) => {
        setCurrent(e.key);
    };
    useEffect(() => {
        loadListComunidades();
    }, [])

    return (
        <Col  >
            <Col >
                <Menu onClick={onClickListTByC} selectedKeys={[current]} mode="horizontal" items={itemsComunidades} />
            </Col>
            <div className='container-grid-horario-new'>
                <ListLeftTecHorario comunidad={current} /> 
                <CalenNewHorario comunidad={current} valDate={setValueDate} isMoVisible={setIsModalVisible} isvisible={isModalVisible} />
                <ModalAddTurnoJobs isOpen={isModalVisible} funOpen={setIsModalVisible} datte={valueDate} comunidad={current} />
            </div>
        </Col>

    );
};

export default MenuTopHorario;