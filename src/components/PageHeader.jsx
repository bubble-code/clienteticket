import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Avatar, Divider, notification } from "antd";
import { SettingOutlined, BellOutlined, PoweroffOutlined } from '@ant-design/icons';
import useAuth from '../hooks/useAuth';
import '../style/header.css'
import logo from '../style/img/logo.png';

const MainPageHeader = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user } = auth;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }
  const openNotification = (placement) => {
    notification.info({
      message: `Notificationes`,
      description:
        'No tienes notificaciones',
      placement,
      className: 'notification',
      duration: 3,
      style: { color: 'white' }
    });
  };

  return (
    <PageHeader //src={logo}
      title={<img src="https://joeschmoe.io/api/v1/random" alt="logo" className="Header-img" />}
      className="site-page-header"
      extra={[
        <Avatar src="https://joeschmoe.io/api/v1/random" />,
        <span className="id-salon-header">Salon: {user}</span>,
        <Divider type="vertical" className="divider" />,
        <SettingOutlined className="icon-salon-header" />,
        <BellOutlined className="icon-salon-header" onClick={() => openNotification('top')} />,
        <PoweroffOutlined className="icon-salon-header" onClick={logout} />,
      ]}
    />
  );
}

export default MainPageHeader;