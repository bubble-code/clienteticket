import React, { useState, useEffect } from 'react';
import DataService from '../../service/service';
import { Tabs } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './style.css';

const { TabPane } = Tabs;


const TabListComunidadesHeader = ({ setComunidad }) => {
    const [itemsComunidades, setItemsComunidades] = useState([]);

    const onChange = (key) => {
        setComunidad(key);
    };
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
    return (<>
        <Tabs  onChange={onChange} color='red' className='tab-header-camunidades' defaultActiveKey=''>
            {itemsComunidades.map(item => (
                <TabPane tab={item.label} key={item.key}> </TabPane>
            ))}
        </Tabs>;
    </>
    );
};

export default TabListComunidadesHeader;