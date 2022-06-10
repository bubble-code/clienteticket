import React, { useEffect, useState } from 'react';
import DataService from '../service/service';
import { Form, Input, Button, Select, Switch, Space, Row, Col, Divider, message } from 'antd';
import SelectList0 from './SelectListMauinas';
import '../style/newTicket.css';

const { TextArea } = Input;
const listPriority = [
  { id: 'Baja' },
  { id: 'Normal' },
  { id: 'Alta' },
  { id: 'Emergencia' }
]
const estateMachine = [
  { id: 'Encendida' },
  { id: 'Fuera de Servicio' }
]
const NewTicket = () => {
  const [listMaquinas, setListMaquinas] = useState([]);
  const [listTipoAverias, setlistTipoAverias] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const onfinish = (values) => {
    message.success("Ticket creado correctamente");
    console.log('Received values of form: ', values);
    form.resetFields();
  }
  const cargarList = async (salon) => {
    try {
      const listMaquinas = await DataService.getMaquinas(salon);
      const listTipAverias = await DataService.getTipostAverias();
      setListMaquinas(listMaquinas.docs);
      setlistTipoAverias(listTipAverias.docs)
      // listMaquinas.docs.map(maquina => console.log(maquina.id))
    } catch (error) {
      console.log('error');
    }
  }
  // const getListTipoAverias = async ()=>{
  //   re
  // }
  useEffect(() => {
    cargarList('Alcala 260');
  }, []);
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onFinish={onfinish}
        form={form}
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
            <SelectList0 list={listMaquinas} handleChange={handleChange} id='maquina' placeholder='Seleccione una maquina' />
            <h3>Comentario</h3>
            <Form.Item name={'comentario'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <TextArea rows={4} title="Comentario" />
            </Form.Item>
            <Divider />
            <h3>Tipo de Averia</h3>
            <SelectList0 list={listTipoAverias} handleChange={handleChange} id='tipoAveria' placeholder='Seleccione una averia' />
            <h3>Prioridad</h3>
            <SelectList0 id='prioridad' list={listPriority} handleChange={handleChange} placeholder='Seleccione la prioridad' />
            <h3>Estado de la Maquina</h3>
            <SelectList0 id='estadoMaquina' list={estateMachine} handleChange={handleChange} placeholder='Diga el estado de la maquina' />
            <h3>Taquillero</h3>
            <Form.Item name={'taquillero'} rules={[{ required: true, message: 'Este campo es obligatorio' }]} style={{ width: 345 }}>
              <Input />
            </Form.Item>
            <Divider />
            <h3>Dinero en Maquina</h3>
            <h6>Dinero pendiente</h6>
            <h6>Este campo se completa cuando la maquina tenga dinero</h6>
            <Form.Item name={'isDinero'}>
              <Switch />
            </Form.Item>
            <h5>Cantidad de Dinero</h5>
            <Form.Item style={{ width: 345 }} name='cantDinero'>
              <Input />
            </Form.Item>
            <h5>Detalles de Ticket</h5>
            <Form.Item name={'detallesTicket'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <TextArea rows={4} title="Detalles de Ticket" />
            </Form.Item>
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




