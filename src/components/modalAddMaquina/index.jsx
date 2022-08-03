import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Row } from 'antd';
import DataService from "../../service/service";


const { TextArea } = Input;


const ModalAddMaquina = ({ visibl, cancel, comunidad, salon }) => {
    const [form] = Form.useForm();
    form.resetFields();

    const onfinish = async () => {
        await DataService.addMachine({ comunidad, salon, data: form.getFieldsValue() })
        form.resetFields();
        // cancel(false);
    }


    const handleCancel = () => {
        cancel(false);
    };


    return (
        <>
            <Modal
                visible={visibl}
                title={salon}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form layout="vertical" onFinish={onfinish} form={form} >
                    <Form.Item label="Plaza" name={"plaza"} initialValue={""}>
                        <Input placeholder='numero de maquina' className='border-select-selector' type={"number"} />
                    </Form.Item>
                    <Form.Item label="Número de Máquina" name={"noMaquina"} initialValue={""}>
                        <Input placeholder='numero segun tecnausa' className='border-select-selector' type={"number"} />
                    </Form.Item>
                    <Form.Item label="Permiso" name={"permiso"} initialValue={""}>
                        <Input placeholder='numero permiso segun filo' className='border-select-selector' />
                    </Form.Item>
                    <Form.Item label="Denominacion" name={"denominacion"} initialValue={""}>
                        <Input placeholder='tipo segun filo' className='border-select-selector' />
                    </Form.Item>
                    <Form.Item label="Observacion" name={"observacion"} initialValue={""}>
                        <Input placeholder='observacion' className='border-select-selector' />
                    </Form.Item>
                    <Row justify="space-evenly">
                        <Form.Item >
                            <Button type="primary" htmlType="button" onClick={handleCancel}>Cancelar</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="dashed" htmlType="submit" >Enviar</Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default ModalAddMaquina;