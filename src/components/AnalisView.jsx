import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic } from 'antd';
import DataService from '../service/service'
import CharFaulsByHall from "./CharFaulsByHall";
import MenuTopHorizontalPAnalis from "./MenuTopHorizaontalPageAnalisis";



const AnalisView = () => {
  const [cant, setCant] = useState({});
  const refillDataValues = async () => {
    let totalSolvedToday = await DataService.getCantTicketCloseToday();
    let totalOpenToday = await DataService.getCantTicketOpen();
    let totalStandbyToday = await DataService.getCantTicketStandBy();
    totalOpenToday += totalSolvedToday;
    let totalPercent = ((totalStandbyToday / totalOpenToday) * 100).toFixed(2);
    let arrayHallWithTicketOpen = await DataService.getHallWithTicketOpen();
    // console.log(arrayHallWithTicketOpen);
    setCant({ totalOpenToday, totalStandbyToday, totalSolvedToday, totalPercent, arrayHallWithTicketOpen });
  }

  useEffect(() => {
    refillDataValues()
  }, []);
  return (
    <Col>
      <Row>
        <MenuTopHorizontalPAnalis />
      </Row>
      <Row justify="space-around">
        <Col span={5}>
          <Statistic title="Today's faults" value={cant.totalOpenToday} style={{ border: '1px solid #eae6e6', borderRadius: '3px', padding: '8px' }} />
        </Col>
        <Col span={5}>
          <Statistic title="Solved today" value={cant.totalSolvedToday} style={{ border: '1px solid #eae6e6', borderRadius: '3px', padding: '8px' }} />
        </Col>
        <Col span={5}>
          <Statistic title="Standby" value={cant.totalStandbyToday} style={{ border: '1px solid #eae6e6', borderRadius: '3px', padding: '8px' }} />
        </Col>
        <Col span={5}>
          <Statistic title="Percentage" value={cant.totalPercent} style={{ border: '1px solid #eae6e6', borderRadius: '3px', padding: '8px' }} suffix={"%"} />
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <CharFaulsByHall labels={cant.arrayHallWithTicketOpen} />
        </Col>
      </Row>
    </Col>);
}

export default AnalisView;