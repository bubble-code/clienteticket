import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { cntWeek, numberWeek, headerDiasTableHorario } from '../month';
import { schemaColumnListMaquinas } from '../../schemas/tables/tables';
import DataService from '../../service/service';




const TableListMaquinas = ({ salon }) => {

    const [maquinas, setMaquinas] = useState([]);

    const loadMaquinas = async () => {
        const listMaquinas = [];
        const arrayMaquinas = await DataService.getMaquinas(salon);
        arrayMaquinas.forEach((maqui) => {
            console.log(maqui.data());
            listMaquinas.push({
                id: maqui.id,
                noMaquina: maqui.data().noMaquina,
                permiso: maqui.data().permiso,
                denominacion: maqui.data().denominacion,
                observacion: maqui.data().observacion,
            });
        });
        setMaquinas(listMaquinas);
    }

    useEffect(() => {
        loadMaquinas();
    }, [salon]);


    return <>
        <Table columns={schemaColumnListMaquinas} dataSource={maquinas} pagination={false} />
    </>;
}
export default TableListMaquinas;