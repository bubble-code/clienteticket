import React from 'react';
import { Select, Form } from 'antd';

const SelectList0 = ({ id, list, handleChange, placeholder }) => {
  const { Option } = Select;
  return (
    <Form.Item name={id} rules={[{ required: true, message: 'Este campo es obligatorio' }]}  >
      <Select defaultValue="" style={{ width: 200 }} onChange={handleChange} placeholder={placeholder} >
        {list.map(item => {
          const { id } = item;
          return <Option value={id} key={id}>{id}</Option>
        })}
      </Select>
    </Form.Item>
  )
}

export default SelectList0;