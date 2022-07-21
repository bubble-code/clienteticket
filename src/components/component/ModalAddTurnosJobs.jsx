import React, { useState, useEffect } from 'react';
import DataService from '../../service/service';
// import useAuth from '../../hooks/useAuth';
import { Form, Card, Select, Input, Modal, message } from 'antd';

const { Option } = Select;

const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb',];
const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const ModalAddTurnoJobs = ({ funOpen, isOpen, datte, comunidad }) => {
    const [listTecn, setListTecn] = useState([]);
    const [listTare, setListTare] = useState([]);
    const date = new Date();
    const currentDate = ` ${dayOfWeek[datte.getDay()] + ' ' + datte.getDate() + ` - ` + month[(datte.getMonth())] + ' - ' + datte.getFullYear()}`;
    const [form] = Form.useForm();
    // const { auth } = useAuth();
    // const { comunidad, user } = auth;

    const loadListTec = async () => {
        const result = [];
        const listTareas = [];
        const listTec = await DataService.getListTecnicosByComu({ comunidad });
        const listJobs = (await DataService.getJobsTecnicos({ comunidad })).sort();

        listTec.forEach(tec => {
            result.push(tec.id);
        })
        setListTecn(result);

        listJobs.forEach(job => {
            listTareas.push(job.id);
        });
        setListTare(listTareas);

    }
    const handleOk = () => {
        console.log(form.getFieldsValue());
        message.success('Submit success!');
        funOpen(false);
        form.resetFields();
    };

    const handleCancel = () => {
        funOpen(false);
        form.resetFields();
    };
    const selectTecChang = async (value) => {
        form.setFieldsValue({
            'selectTecn': value
        });
    }
    const handleChange = async (value) => {}


    useEffect(() => {
        loadListTec();
    }, [comunidad, isOpen])

    return (
        <Modal title="Añadir Turno & Tarea" visible={isOpen} onOk={handleOk} onCancel={handleCancel} >
            <Card title={<h4>Fecha: {currentDate}</h4>}>
                <Form layout='horizontal' form={form} initialValues={{}}>
                    <Form.Item name={'selectTarea'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}   >
                        <h3>Tarea</h3>
                        <Select defaultValue="" style={{ width: 300 }} onChange={handleChange} placeholder='placeholder' className='border-select-selector' >
                            {listTare.map(job => <Option value={job} key={job}>{job}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'selectTecn'} rules={[{ required: true, message: 'Este campo es obligatorio' }]}   >
                        <h3>Tecnico</h3>
                        <Select mode='multiple' defaultValue="" style={{ width: 300 }} onChange={selectTecChang} placeholder='tecnico' className='border-select-selector' >
                            {listTecn.map(item => {
                                // const { id } = item;
                                return <Option value={item} key={item}>{item}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name={'inicio'} >
                        <h3>Inicio</h3>
                        <Select defaultValue="06:00" style={{ width: 300 }} /*onChange={selectTecChang}*/ placeholder='inicio' className='border-select-selector' >
                            <Option value={4} key={4}>04:00</Option>
                            <Option value={6} key={6}>06:00</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item name={'fin'} >
                        <h3>Fin</h3>
                        <Select defaultValue="10:00" style={{ width: 300 }} /*onChange={selectTecChang}*/ placeholder='inicio' className='border-select-selector' >
                            <Option value={8} key={8}>08:00</Option>
                            <Option value={10} key={10}>10:00</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <h3>Repetir</h3>
                        <Input placeholder='placeholder' className='border-select-selector' />
                    </Form.Item>
                </Form>
            </Card>
        </Modal>

    );
};

export default ModalAddTurnoJobs;