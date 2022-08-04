import React from 'react';
import { Select, Form } from 'antd';

const SelectList0 = ({ id, list, handleChange, placeholder }) => {
  const { Option } = Select;
  return (
    <Form.Item name={id} rules={[{ required: true, message: 'Este campo es obligatorio' }]}  >
      <Select defaultValue="" style={{ width: 300 }} onChange={handleChange} placeholder={placeholder} className='border-select-selector' >
        {list.map(item => {
          const { id, denominacion="" } = item;
          return <Option value={`${id} ${denominacion}`} key={id}>{`${id} ${denominacion}`}</Option>
        })}
      </Select>
    </Form.Item>
  )
}

export default SelectList0;