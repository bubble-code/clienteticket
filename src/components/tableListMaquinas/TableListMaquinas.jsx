import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { cntWeek, numberWeek, headerDiasTableHorario } from '../month';
import { schemaColumnListMaquinas } from '../../schemas/tables/tables';
import DataService from '../../service/service';




const TableListMaquinas = ({ salon, comunidad }) => {

    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMaquinas = async () => {
        setLoading(true);
        const listMaquinas = [];
        const arrayMaquinas = await DataService.getMaquinas({ salon, comunidad });
        arrayMaquinas.forEach((maqui) => {
            listMaquinas.push({
                id: maqui.id,
                noMaquina: maqui.data().noMaquina,
                permiso: maqui.data().permiso,
                denominacion: maqui.data().denominacion,
                observacion: maqui.data().observacion,
            });
        });
        setLoading(false);
        setMaquinas(listMaquinas);
    }

    useEffect(() => {
        loadMaquinas();
    }, [salon]);


    return <>
        <Table columns={schemaColumnListMaquinas} dataSource={maquinas} pagination={false} loading={loading} />
    </>;
}
export default TableListMaquinas;