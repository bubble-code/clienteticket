import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataService from '../service/service';
import useAuth from '../hooks/useAuth';
import SelectList0 from './SelectListMauinas';
import { Form, Input, Button, Switch, Space, Row, Col, Divider, message } from 'antd';
import '../style/newTicket.css';
import { async } from '@firebase/util';

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
  const { auth } = useAuth();
  const { user } = auth;
  const navigate = useNavigate();

  /**
   * GoBack() is a function that navigates to the root route, replacing the current
   * route in the history stack.
   */
  const goBack = () => navigate('/', { replace: true })
  /**
   * Onfinish is a function that takes in a parameter called values, and then
   * creates a new date, and then displays a message, and then resets the form, and
   * then calls a function called DataService.newTicket, and then calls a function
   * called goBack.
   */
  const onfinish = async (values) => {
    const date = new Date();
    const currenTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    message.success("Ticket creado correctamente");
    form.resetFields();
    await DataService.newTicket({ ...values, currentDate, currenTime, user });
    goBack();
  }
  /**
   * LoadLists is an async function that calls DataService.getMaquinas and
   * DataService.getTipostAverias, and then sets the state of listMaquinas and
   * listTipoAverias.
   */
  const loadLists = async (salon) => {
    try {
      const listMaquinas = await DataService.getMaquinas(salon);
      const listTipAverias = await DataService.getTipostAverias();
      setListMaquinas(listMaquinas.docs);
      setlistTipoAverias(listTipAverias.docs)
    } catch (error) {
      console.log('error');
    }
  }

  useEffect(() => {
    loadLists(user);
  }, [user]);
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
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <h1 style={{ marginBottom: 0 }}>Abrir nuevo ticket</h1>
              <h5 style={{ marginTop: 0 }}>Por favor, complete el siguiente formulario para crear un nuevo ticket</h5>
            </Space>
            {/* <Divider /> */}
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col span={16} className="gutter-row" offset={3}>
            <Row>
              <Divider className='divider' />
              <Col span={8}>
                {/* <h3>Email:</h3> */}
                <h3>Cliente:</h3>
              </Col>
              <Col span={8}>
                {/* <h3>{user}@merkur-casino.com</h3> */}
                <h3>{user}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }}>
          <Col span={16} className="gutter-row" offset={3}>
            <h3>Formulario de rellenado de nuevo ticket</h3>
            <Divider className='divider' />
            <h3>Maquina *</h3>
            <SelectList0 list={listMaquinas} id='maquina' placeholder='Seleccione una maquina' />
            {/* <h3>Comentario</h3>
            <Form.Item name={'comentario'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <TextArea rows={2} title="Comentario" className='border-select-selector' />
            </Form.Item> */}
            {/* <Divider /> */}
            <h3>Tipo de Averia</h3>
            <SelectList0 list={listTipoAverias} id='tipoAveria' placeholder='Seleccione una averia' />
            <h3>Prioridad</h3>
            <SelectList0 id='prioridad' list={listPriority} placeholder='Seleccione la prioridad' />
            <h3>Estado de la Maquina</h3>
            <SelectList0 id='estadoMaquina' list={estateMachine} placeholder='Diga el estado de la maquina' />
            <h3>Taquillero</h3>
            <Form.Item name={'taquillero'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input style={{ width: 300 }} className='border-select-selector' />
            </Form.Item>
            {/* <Divider /> */}
            <h3>Dinero en Maquina</h3>
            <h6>Dinero pendiente</h6>
            <h6>Este campo se completa cuando la maquina tenga dinero</h6>
            <Form.Item name={'isDinero'} initialValue={false}>
              <Switch />
            </Form.Item>
            <h3>Cantidad de Dinero</h3>
            <Form.Item name='cantDinero' initialValue={0}>
              <Input style={{ width: 300 }} className='border-select-selector' />
            </Form.Item>
            <h3>Detalles de Ticket</h3>
            <Form.Item name={'detallesTicket'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <TextArea rows={4} title="Detalles de Ticket" className='border-select-selector' />
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




