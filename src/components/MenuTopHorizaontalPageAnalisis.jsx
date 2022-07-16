import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import DataService from '../service/service';
import ListLeftTecHorario from './component/ListLeftTecnicoHorario';


// const items = [
//     {
//         label: 'Navigation One',
//         key: 'mail',
//         icon: <MailOutlined />,
//     },
//     {
//         label: 'Navigation Two',
//         key: 'app',
//         icon: <AppstoreOutlined />,
//         disabled: true,
//     },
//     {
//         label: 'Navigation Three - Submenu',
//         key: 'SubMenu',
//         icon: <SettingOutlined />,
//         children: [
//             {
//                 type: 'group',
//                 label: 'Item 1',
//                 children: [
//                     {
//                         label: 'Option 1',
//                         key: 'setting:1',
//                     },
//                     {
//                         label: 'Option 2',
//                         key: 'setting:2',
//                     },
//                 ],
//             },
//             {
//                 type: 'group',
//                 label: 'Item 2',
//                 children: [
//                     {
//                         label: 'Option 3',
//                         key: 'setting:3',
//                     },
//                     {
//                         label: 'Option 4',
//                         key: 'setting:4',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: (
//             <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//                 Navigation Four - Link
//             </a>
//         ),
//         key: 'alipay',
//     },
// ];

const MenuTopHorizontalPAnalis = () => {
    const [itemsComunidades, setItemsComunidades] = useState([]);
    const [current, setCurrent] = useState();
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
        <>
            <Menu onClick={onClickListTByC} selectedKeys={[current]} mode="horizontal" items={itemsComunidades} />
            <ListLeftTecHorario comunidad={current} />
        </>

    );
};

export default MenuTopHorizontalPAnalis;