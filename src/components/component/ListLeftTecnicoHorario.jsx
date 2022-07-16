import React, { useState, useEffect } from 'react';
import DataService from '../../service/service';
import { Avatar, List } from 'antd';
import '../../style/container-list-left-tecnicos-horario.css';


const ListLeftTecHorario = ({ comunidad }) => {
    const [currentListTec, setCurrentListTec] = useState([]);
    const [loading, setLoading] = useState(true)
    const loadListTec = async () => {
        setLoading(true);
        const tem = [];
        const list = await DataService.getListTecnicosByComu({ comunidad })
        list.forEach(item => {
            tem.push({
                name: item.id,
                description: item.data().job,
                sex: item.data().sex
            })
        });
        setCurrentListTec(tem);
        setLoading(false);
    }
    useEffect(() => {
        loadListTec();
    }, [comunidad])
    return (
        <div className='container-list-left-tecnicos-horario '>
            {comunidad && <List
                itemLayout="horizontal"
                dataSource={currentListTec}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.sex === 'm' ? <Avatar src="https://joeschmoe.io/api/v1/male/jon" /> : <Avatar src="https://joeschmoe.io/api/v1/female/jess" />}
                            title={item.name}
                            description={item.description}
                        />
                    </List.Item>
                )}
                loading={loading}
            />
            }
        </div>
    )
};

export default ListLeftTecHorario;