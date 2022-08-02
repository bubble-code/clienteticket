import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { cntWeek, numberWeek, headerDiasTableHorario } from '../month'


const dataColSemana = [
    {
        key: '0',
        semana: 'Guardias',
        tags: ['nice', 'developer'],
    },
    {
        key: '1',
        semana: 'Otros',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        semana: 'Vacaciones',
        render: (text) => <a style={{ color: 'blue' }}>{text}</a>,
    },
    {
        key: '3',
        semana: 'Tecnico',
        tags: ['nice', 'developer'],
    },
    {
        key: '4',
        semana: 'Global',
        tags: ['nice', 'developer'],
    },
    {
        key: '5',
        semana: 'Parcial',
        tags: ['nice', 'developer'],
    },
    {
        key: '6',
        semana: 'Al Cierre',
        tags: ['nice', 'developer'],
    },
];


const TableHorarioCreate = ({ mes }) => {
    const listTablesHorarios = [];
    const [dataCuadrante, setDataCuadrante] = ([dataColSemana]);
    for (let i = 0, dia = 1; i < cntWeek(); i++, dia = dia + 7) {
        let stringDate = `2022-${mes}-${dia}`;
        const columns = [...headerDiasTableHorario({ semana: 31 + i, fecha: stringDate })]
        listTablesHorarios.push(<Table columns={columns} dataSource={dataCuadrante} pagination={false} />)
    }
    return <>
        {[...listTablesHorarios]}
    </>;
}
export default TableHorarioCreate;