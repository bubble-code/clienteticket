import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';


export const columnsRender = [
    // {
    //   title: 'Ticket',
    //   dataIndex: 'Ticket',
    //   key: 'Ticket',
    //   // render: (text) => <a>{text}</a>,
    // },
    {
        title: 'CREADO',
        dataIndex: 'Creado',
        key: 'Creado',
    },
    {
        title: 'MAQUNA',
        dataIndex: 'Maquina',
        key: 'Maquina',
    },
    {
        title: 'ESTADO',
        key: 'Estado',
        dataIndex: 'Estado',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color;
                    // let color = tag.length > 5 ? 'geekblue' : 'green';

                    if (tag === 'Abierto') {
                        color = '#2477ff';
                    }
                    if (tag === 'En Proceso') {
                        color = '#2d8515';
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
        title: 'DESCRIPCION',
        dataIndex: 'Asunto',
        key: 'Asunto',
    },
    {
        title: 'TAQUILLERO',
        key: 'Taquillero',
        dataIndex: 'Taquillero',
        render: (_, { taqui }) => (<>
            {taqui.map((tag) => {
                return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <UserOutlined style={{ color: '#2477ff' }} />  <span>{tag.toUpperCase()}</span>
                </div>
                );
            })}
        </>
        ),

    }
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