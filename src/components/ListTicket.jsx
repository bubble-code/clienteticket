import React, { useState } from "react";
import { Row, Col, Space, Segmented, Tag, Table } from "antd";


const columns = [
  {
    title: 'Ticket',
    dataIndex: 'Ticket',
    key: 'Ticket',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Creado',
    dataIndex: 'Creado',
    key: 'Creado',
  },
  {
    title: 'Estado',
    key: 'Estado',
    dataIndex: 'Estado',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Asunto',
    dataIndex: 'Asunto',
    key: 'Asunto',
  },  
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

const data = [
  {
    key: '1',
    Ticket: 'John Brown',
    Creado: 32,
    Asunto: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    Ticket: 'Jim Green',
    Creado: 42,
    Asunto: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    Ticket: 'Joe Black',
    Creado: 32,
    Asunto: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



const ListTicket = () => {
  const [segmentValue, setSegmentValue] = useState("Abiertos");
  return (
    <Col>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} >

      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, }} justify='space-between'>
        <Col span={6} className="gutter-row" offset={3}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Segmented options={['Abiertos', 'Cerrados', 'Monthly', 'Quarterly', 'Yearly']} value={segmentValue} onChange={setSegmentValue} />
          </Space>

        </Col>
        <Col span={6} className="gutter-row" offset={3}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Segmented options={['New', 'Cerrados']} value={segmentValue} onChange={setSegmentValue} />
          </Space>

        </Col>
      </Row>
      <Row  >
        <Col span={18} className="gutter-row" offset={3}>
          <Table columns={columns} dataSource={data} style={{ width: '100%' }} />
        </Col>
      </Row>

    </Col>
  );
}

export default ListTicket;