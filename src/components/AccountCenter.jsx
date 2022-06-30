import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Row, Col, Card, Divider, Steps, Avatar, Badge } from "antd";
import { UserOutlined } from '@ant-design/icons';
import DataService from '../service/service';
import '../style/WorkplaceView.css';


const AccountCenter = () => {
  const { auth } = useAuth();
  const { user } = auth;
  const { Step } = Steps;
  const [horaInicio, setHoraInicio] = useState('00:00:00');
  const loadingData = async () => {
    let result;
    try {
      result = await DataService.getTimeStartTec({ tec: 'Adrian' });
      setHoraInicio(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);
  return (
    <Col>
      <Row gutter={24}>
        <Col span={22}>
          <Card title={"Tecnico Recaudador"} bordered={true} className={'cardHallsWorkPlace'} >
            <Row gutter={24} justify='start'>
              <Col>
                <Badge dot >
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </Col>
              <Col>
                <span className="name"> `Tecnico: ${user}`</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row >
      <Divider />
      <Row gutter={24}>
        <Col span={22}>
          <Card title={"Work Route"} bordered={true} className={'cardHallsWorkPlace'} >
            <Steps current={1}>
              <Step title="Inicio" description={horaInicio} />
              <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Card>
        </Col>
      </Row >
      <Divider />
      <Row gutter={24} >
        <Col span={22} >
          <Card title={"Account Profile"} bordered={true} className={'cardHallsWorkPlace'} style={{ height: '500px' }} >
            <Steps current={1}>
              <Step title="Inicio" description="Hora" />
              <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Card>
        </Col>
      </Row >
    </Col >
  );
}

export default AccountCenter;