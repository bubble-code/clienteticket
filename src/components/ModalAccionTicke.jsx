import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Row } from 'antd';
import DataService from '../service/service'


const { TextArea } = Input;
const ModalAccionTicker = ({ current, visibl, cancel }) => {
  const { id, maquina } = current;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onfinish = async (values) => {
    DataService.closeTicket({ ticket: id, comment: values.comment })
    cancel(false);
  }

  const handleCancel = () => {
    cancel(false);
  };
  useEffect(() => {

  }, [])

  return (
    <>
      <Modal
        visible={visibl}
        title={maquina}
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
              <Button type="dashed" htmlType="submit" >Enviar</Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAccionTicker;