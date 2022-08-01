import { DatePicker, Space } from 'antd';
import React from 'react';
import './style.css';


const DatePick = ({ setFecha }) => {
    const onChange = (date, dateString) => {
        setFecha(dateString);
        console.log(dateString);
    };
    return (
        <Space direction="horizontal">
            <DatePicker onChange={onChange} />
        </Space>);
};

export default DatePick;