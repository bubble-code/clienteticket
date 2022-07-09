import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button, Modal } from 'antd';


const ModalStartWorkingDayTec = ({ isVisible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { user } = auth;
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const titleModal = `Hola ${user}, ¿Deseas iniciar la jornada de trabajo?`;

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={isVisible}
        title={titleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>{currentDate}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalStartWorkingDayTec;