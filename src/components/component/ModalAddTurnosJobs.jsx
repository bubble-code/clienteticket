import React, { useState } from 'react';
import DataService from '../../service/service';
import { Form, Card, Select, Input, Modal } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const dayOfWeek = ['Dom', 'Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb',];
const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const ModalAddTurnoJobs = ({ funOpen, isOpen, datte, comunidad }) => {
    const [listTecn, setListTecn] = useState([]);
    const date = new Date();
    const currentDate = ` ${dayOfWeek[datte.getDay()] + ' ' + datte.getDate() + ` - ` + month[(datte.getMonth())] + ' - ' + datte.getFullYear()}`;
    const { form } = Form.useForm();
    const loadListTec = async () => {
        const result = [];
        const listTec = await DataService.getListTecnicosByComu({ comunidad })
        listTec.forEach(tec => {
            result.push(tec.id);
        })
        setListTecn(result);
    }
    const handleOk = () => {
        funOpen(false);
        form.resetFields();
    };

    const handleCancel = () => {
        funOpen(false);
        form.resetFields();
    };
    const selectTecChang = (value) => {
form.setFieldsValue({
    'listTecn': value
})
    }
    useEffect(() => {
        loadListTec();
    }, [comunidad, isOpen])

    return (
        <Modal title="Añadir Turno & Tarea" visible={isOpen} onOk={handleOk} onCancel={handleCancel} >
            <Card title={<h4>Fecha: {currentDate}</h4>}>
                <Form layout='horizontal' form={form}>
                    <Form.Item name='listTarea' rules={[{ required: true, message: 'Este campo es obligatorio' }]}   >
                        <h3>Tarea</h3>
                        <Select defaultValue="" style={{ width: 300 }} /*onChange={handleChange}*/ placeholder={'placeholder'} className='border-select-selector' >

                        </Select>
                    </Form.Item>
                    <Form.Item name='listTecn' rules={[{ required: true, message: 'Este campo es obligatorio' }]}   >
                        {/* <h3>Tecnico</h3> */}
                        <Select mode='multiple' defaultValue="" style={{ width: 300 }} onChange={selectTecChang} placeholder={'placeholder'} className='border-select-selector' >
                            {listTecn.map(item => {
                                // const { id } = item;
                                return <Option value={item} key={item}>{item}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <h3>Inicio</h3>
                        <Input placeholder='placeholder' className='border-select-selector' />
                    </Form.Item>
                    <Form.Item >
                        <h3>Fin</h3>
                        <Input placeholder='placeholder' className='border-select-selector' />
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