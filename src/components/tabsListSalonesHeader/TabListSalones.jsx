import React, { useState, useEffect } from 'react';
import DataService from '../../service/service';
import FormObjSalones from '../formObjeSalones/FormObjSalones';

import { Tabs } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './style.css';

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

const TabListComunidadesHeader = () => {
    const [itemsComunidades, setItemsComunidades] = useState([]);
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
    return (
        <Tabs defaultActiveKey="1" onChange={onChange} color='red'>
            {itemsComunidades.map(item => (
                <TabPane tab={item.label} key={item.key}>{<FormObjSalones comunidad={item.label} key={item.label} />} </TabPane>
            ))}
        </Tabs>);
};

export default TabListComunidadesHeader;