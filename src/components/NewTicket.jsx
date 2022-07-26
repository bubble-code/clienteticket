import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataService from '../service/service';
import useAuth from '../hooks/useAuth';
import SelectList0 from './SelectListMauinas';
import { Form, Input, Button, Switch, Space, Row, Col, Divider, message, Card } from 'antd';
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
  const { auth } = useAuth();
  const { user } = auth;
  const navigate = useNavigate();

  /**
   * GoBack() is a function that navigates to the root route, replacing the current
   * route in the history stack.
   */
  const goBack = () => navigate(-1)
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
    // goBack();
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
    <Card className='mainCardTicket' >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onFinish={onfinish}
        form={form}
      >
        <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }} >
          <Col span={20} className="gutter-row" >
            <Row justify='space-around'>
              <Col span={20}>
                <h1 style={{ marginBottom: 0 }}>Formulario de rellenado de nuevo ticket</h1>
                <h5 style={{ marginTop: 0 }}>Por favor, complete el siguiente formulario para crear un nuevo ticket</h5>
                {/* <Divider className='divider' /> */}
              </Col>
              <Col>
                <h3>Cliente: <span>{user}</span></h3> 
              </Col>
            </Row>
          </Col>
          <Row justify='space-between' gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }} style={{ margin: 5 }}>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Maquina</h3>
              <SelectList0 list={listMaquinas} id='maquina' placeholder='Seleccione una maquina' />
            </Col>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Tipo de Averia</h3>
              <SelectList0 list={listTipoAverias} id='tipoAveria' placeholder='Seleccione una averia' />
            </Col>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Prioridad</h3>
              <SelectList0 id='prioridad' list={listPriority} placeholder='Seleccione la prioridad' />
            </Col>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Estado de la Maquina</h3>
              <SelectList0 id='estadoMaquina' list={estateMachine} placeholder='Diga el estado de la maquina' />
            </Col>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Taquillero</h3>
              <Form.Item name={'taquillero'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                <Input style={{ width: 300 }} className='border-select-selector' />
              </Form.Item>
            </Col>
            <Col span={{ xs: 24, sm: 8, md: 8, lg: 8 }} className="gutter-row">
              <h3>Dinero pendiente</h3>
              {/* <Form.Item name={'isDinero'} initialValue={false}>
                <Switch />
              </Form.Item> */}
              <Form.Item name='cantDinero' initialValue={0}>
                <Input style={{ width: 300 }} className='border-select-selector' />
              </Form.Item>
            </Col>
            <Col span={18} className="gutter-row">
              <h3>Detalles de la Averia</h3>
              <Form.Item name={'detallesTicket'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                <TextArea rows={4} title="Detalles de Ticket" className='border-select-selector' />
              </Form.Item>
            </Col>
            <Col span={24} className="gutter-row">
              <Form.Item>
                <Button type="primary" htmlType="submit" >Enviar</Button>
              </Form.Item>
            </Col>
          </Row>

        </Row>
      </Form>
    </Card >
  );
};



export default NewTicket;




