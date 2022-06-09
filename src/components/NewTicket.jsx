import React, { useState } from 'react';
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Space, Card, Row, Col, Divider, } from 'antd';
import '../style/newTicket.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;


const NewTicket = () => {

  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col span={16} className="gutter-row" offset={3}>
            <Space direction="vertical" size="middle" style={{ display: 'flex', }}>
              <p>Abrir nuevo ticket</p>
              <h3>Por favor, complete el siguiente formulario para crear un nuevo ticket</h3>
            </Space>
            <Divider />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col span={16} className="gutter-row" offset={3}>
            <Row>
              <Col span={8}>
                <h3>Email:</h3>
                <h3>Cliente:</h3>
              </Col>
              <Col span={8}>
                <h3>Carabanchel@merkur-casino.com</h3>
                <h3>Carabanchel 2</h3>
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col span={16} className="gutter-row" offset={3}>
            <h3>Carabanchel 2 Formulario</h3>
            <Divider />
            <h3>Maquina *</h3>
            <Select defaultValue="" style={{ width: 200 }} onChange={handleChange} placeholder='Seleccione la maquina' >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" >Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <h3>Comentario</h3>
            <TextArea rows={4} title="Comentario" />
            <Divider />
            <h3>Tipo de Averia</h3>
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" >Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <h3>Prioridad</h3>
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" >Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <h3>Estado de la Maquina</h3>
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" >Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <h3>Taquillero</h3>
            <Form.Item style={{ width: 345 }}>
              <Input />
            </Form.Item>
            <Divider />
            <h3>Dinero en Maquina</h3>
            <h6>Dinero pendiente</h6>
            <h6>Este campo se completa cuando la maquina tenga dinero</h6>
            <Form.Item >
              <Switch />
            </Form.Item>
            <h5>Cantidad de Dinero</h5>
            <Form.Item style={{ width: 345 }}>
              <Input />
            </Form.Item>
            <h5>Detalles de Ticket</h5>
            <TextArea rows={4} title="Detalles de Ticket" />
            <Form.Item>
              <Button type="primary" htmlType="submit" >Enviar</Button>
            </Form.Item>
          </Col>
        </Row>


      </Form>
    </>
  );
};


export default NewTicket;




