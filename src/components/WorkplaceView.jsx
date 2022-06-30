import React, { useEffect, useState } from "react";
import DataService from "../service/service";
import { Row, Col, Card } from "antd";
import '../style/WorkplaceView.css';

const WorkplaceView = () => {
  const [listHall, setListHall] = useState([]);
  const getListHall = async () => {
    const listHall = await DataService.getListHall();
    // console.log(listHall);
    setListHall(listHall);
  }
  useEffect(() => {
    getListHall();
  }, []);
  return (
    <div className="workplace-card-wrapper">
      {/* <Row justify="space-around" gutter={16}> */}
      {listHall.map((hall, index) => {
        return (
          <Col span={24} key={index}>
            <Card title={hall.id} bordered={true} className={"cardHallsWorkPlace"} extra={<a href="#">More</a>}>
              Card content
            </Card>
          </Col>
        )
      })}
      {/* </Row> */}
    </div>
  );
}

export default WorkplaceView;