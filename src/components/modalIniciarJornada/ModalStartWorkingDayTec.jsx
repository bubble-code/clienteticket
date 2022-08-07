import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import DataService from '../../service/service'
import { Button, Modal, Form } from 'antd';
import 'antd/dist/antd.min.css';
import 'antd/dist/antd.variable.min.css';
import SelectList0 from "../SelectListMauinas";
import { useEffect } from "react";


const ModalStartWorkingDayTec = ({ isVisible, setVisible }) => {

  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { user, comunidad } = auth;
  const [form] = Form.useForm();
  const [listHalls, setListHalls] = useState([]);
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const titleModal = `Tecnico: ${user} - Fecha: ${currentDate}`;

  const loadIsInicio = async ({ com }) => {
    let listHalls = await DataService.getListHall({ comunidad: com })
    listHalls = [...listHalls, { id: 'Otro' }]
    setListHalls(listHalls)
  }

  const handleOk = async (values) => {
    setLoading(true);
    const { salon } = values;
    // console.log({ salon, user, comunidad })
    await DataService.setIniciarJornada({ comunidad, tec: user, place: salon });
    setLoading(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadIsInicio({ com: comunidad });    
  }, [comunidad]);

  return (
    <>
      <Modal
        visible={isVisible}
        title={titleModal}
        onCancel={handleCancel}
        footer={[

        ]}
      >
        <Form layout="vertical" onFinish={handleOk} form={form} initialValues={{}} >
          <SelectList0 list={listHalls} id='salon' placeholder={'Seleccione el salon'} />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Form.Item>
                <Button key="back" type="primary" onClick={handleCancel} danger shape="round">
                  No Iniciar
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit" shape="round">
                  Comenzar
                </Button>
              </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalStartWorkingDayTec;