import { Table } from 'antd'


export const expandedRowRender = ({ key, Detalles }) => {
    // console.log({ key })
    const columns = [
        {
            title: 'Detalles',
            dataIndex: 'Detalles',
            key: 'Detalles',
        },
    ]
    const data = [];
    data.push({ key, Detalles })
    return <Table columns={columns} dataSource={data} pagination={false} className={'holahola'} sticky={true}/>;
};

// export  const columns = [
//     {
//       title: 'Salon',
//       dataIndex: 'Salon',
//       key: 'Salon',
//     },
//     {
//       title: 'Creado',
//       dataIndex: 'Creado',
//       key: 'Creado',
//     },
//     {
//       title: 'Maquina',
//       dataIndex: 'Maquina',
//       key: 'Maquina',
//     },
//     {
//       title: 'Estado',
//       key: 'Estado',
//       dataIndex: 'Estado',
//       render: (_, { tags }) => (
//         <>
//           {tags.map((tag) => {
//             let color;
//             color = tag === 'Abierto' ? 'green' : 'geekblue';

//             // if (tag === 'Abierto') {
//             //   color = 'green';
//             // } else {
//             //   color = 'geekblue';
//             // }

//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: 'Action',
//       dataIndex: 'operation',
//       key: 'operation',
//       render: isInicio ? (_, record) => (
//         <Space size="middle">
//           <Button onClick={() => { showModal({ id: record.key, maquina: record.Maquina }) }} >Resolver</Button>
//           <Button onClick={() => { showModalAplazar({ id: record.key }) }}>Aplazar</Button>
//         </Space>
//       ) : () => <></>,
//     },
//   ];