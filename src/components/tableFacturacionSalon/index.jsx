import React, { useContext, useEffect, useRef, useState } from 'react';
import DataService from '../../service/service';

import './style.css';
import { Button, Form, Input, Popconfirm, Table } from 'antd';


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const TableFacturacionSalon = ({ comunidad, periodo, fecha }) => {
    const [dataSource, setDataSource] = useState([]);
    const [facturacionHall, setFacturacionHall] = useState({});

    const loadData = async () => {
        const arrayDocs = [];
        const arraySalones = [];
        const resultList = await DataService.getListHall({ comunidad: comunidad });
        resultList?.forEach((item, index) => {
            let name = item.id;
            arraySalones.push({ key: index, salon: item.id, facturacion: 0 });
        });
        setDataSource(arraySalones);
        setFacturacionHall({});
    }
    useEffect(() => {
        loadData();
    }, [comunidad])


    const defaultColumns = [
        {
            title: 'Salon',
            dataIndex: 'salon',
            width: '30%',
        },
        {
            title: 'Facturacion',
            dataIndex: 'facturacion',
            editable: true,
            width: '15%',
        }
    ];

    // ****************************************Para actualizar el objetivo cambiado***************************************************************
    const handleSave = (row) => {
        const tem = facturacionHall;
        let { salon, facturacion } = row;
        tem[salon] = facturacion;
        console.log(tem);
        setFacturacionHall(tem);
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        // console.log('facturacionHall', facturacionHall);
    };
    // ******************************************************************************************************************************
    const saveObjetivo = async () => {
        const day = parseInt(fecha.split('-')[2]);
        const month = parseInt(fecha.split('-')[1]);
        for (const key in facturacionHall) {
            console.log('key', key);
            let facturac = facturacionHall[key];
            console.log({ comunidad, periodo: 3, salon: key, value: facturac, dia: day, mes: month });
            await DataService.postFacturacionBySalon({ comunidad, periodo: 3, salon: key, value: facturac, dia: day, mes: month });
        }
        setFacturacionHall({});
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Button
                onClick={saveObjetivo}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Save
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                id="tableSalonesObjEditable"
                pagination={false}
            />
        </div>
    );
};

export default TableFacturacionSalon;

