import React from 'react';
import { Space, Table, Tag } from 'antd';
import { cntWeek, numberWeek } from '../month'
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    }
];
//  function to get the list of days of the current week
const getDaysOfWeek = () => {
    const date = new Date();
    const days = [];
    for (let i = 1; i <= 7; i++) {
        const day = new Date(date);
        day.setDate(date.getDate() - date.getDay() + i);
        days.push(day);
    }
    console.log(days);
    return days;
};
// number of week by date
const cntdfWeek = () => {

}


const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


console.log(cntWeek());
console.log(numberWeek());

const TableHorarioCreate = () => {
    getDaysOfWeek();
    return (
        <Table columns={columns} dataSource={data} />);
}
export default TableHorarioCreate;