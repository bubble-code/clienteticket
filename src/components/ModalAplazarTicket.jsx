import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Row } from 'antd';
import DataService from '../service/service'


const { TextArea } = Input;
const ModalAplazarTicker = ({ id, visibl, cancel }) => {
  const [form] = Form.useForm();

  const onfinish = async (values) => {
    DataService.aplazarTicket({ ticket: id, comment: values.comment })
    cancel();
  }

  const handleCancel = () => {
    cancel();
  };
  useEffect(() => {

  }, [])

  return (
    <>
      <Modal
        visible={visibl}
        title={id}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form layout="vertical" onFinish={onfinish} form={form} >
          <Form.Item label="Descripcion" name={"comment"} initialValue={""}>
            <TextArea rows={4} />
          </Form.Item>
          <Row justify="space-evenly">
            <Form.Item >
              <Button type="primary" htmlType="button" onClick={handleCancel}>Cancelar</Button>
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit" >Actualizar</Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAplazarTicker;