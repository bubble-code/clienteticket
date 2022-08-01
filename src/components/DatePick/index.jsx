import { DatePicker, Space } from 'antd';
import React from 'react';
import './style.css';


const DatePick = ({ setFecha, type }) => {
    const onChange = (date, dateString) => {
        setFecha(dateString);
        console.log(dateString);
    };
    return (
        <Space direction="horizontal">
            <DatePicker onChange={onChange} className='date-picker-main' picker={type} />
        </Space>);
};

export default DatePick;