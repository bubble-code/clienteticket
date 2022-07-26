import React from "react";
import { PageHeader, Button, Tag, Avatar, Divider, notification } from "antd";
import { SettingOutlined, BellOutlined, PoweroffOutlined } from '@ant-design/icons';
import useAuth from '../hooks/useAuth';
import '../style/header.css'
import logo from '../style/img/logo.png';
// import fondo from '../style/img/fondo.png';

const MainPageHeader = () => {
  const { auth } = useAuth();
  const { user } = auth;

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
    <PageHeader
      title={<img src={logo} alt="logo" className="Header-img" />}
      className="site-page-header"
      // subTitle="This is a subtitle"
      // tags={<Tag color="blue">Running</Tag>}
      extra={[
        <Avatar src="https://joeschmoe.io/api/v1/random" />,
        <span className="id-salon-header">Salon: {user}</span>,
        <Divider type="vertical" className="divider" />,
        <SettingOutlined className="icon-salon-header" />,
        <BellOutlined className="icon-salon-header" onClick={() => openNotification('top')} />,
        <PoweroffOutlined className="icon-salon-header" onClick={logout} />,
      ]}
    />
    // <header className="App-header" >
    //   <div className="Header-container" style={{ backgroundImage: `url(${fondo})` }}>
    //     <div className="Header-img"><img src={logo} alt="" /></div>
    //     <div></div>
    //   </div>
    // </header>
  );
}

export default MainPageHeader;