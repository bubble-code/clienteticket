import React, { useState, useEffect, useCallback } from "react";
import { Col, Row } from "antd";
import TabListComunidadesHeader from "../tabsListSalonesHeader/TabListSalones";
import MonitorView from "../MonitorView";
import MarkerHall from "../markToMap/MarkerHall";
import DataService from "../../service/service";


import './style.css';
import CardListTecnicosActivos from "../cardListTecnicoActivos/CardListTecnicosActivos";

const PageMapa = () => {
    const [comunidad, setComunidad] = useState(null);
    const [locationList, setLocationList] = useState([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [listTecnicos, setListTecnicos] = useState([]);

    const loadingsLocations = async (comuni) => {
        const markers = [];
        const locations = await DataService.getLocationsHall({ comunidad: comuni });
        const faults = await DataService.getHallWithTicketOpen({ comunidad: comuni });
        for (const item in locations) {
            markers.push(
                <MarkerHall
                    comunity={comuni}
                    hall={item} key={item}
                    cantOpen={faults[item] ?? 0}
                    lat={locations[item]._lat}
                    lng={locations[item]._long}
                />);
            // console.log(locations[item]);
        }
        setLocationList(markers);
    }

    const locationComunidad = async (comuni) => {
        const { _lat, _long } = await DataService.getLocationComunidad({ comunidad: comuni });
        setCenter({ lat: _lat, lng: _long });
    }


    const loadigTecnicos = useCallback(async (comuni) => {
        console.log(comuni)
        const listTec = [];
        const lisTecTemp = await DataService.getListTecnicosByComu({ comunidad: comuni });
        lisTecTemp.forEach((tecnico) => {
            listTec.push({ id: tecnico.id, activo: tecnico.data().isInicio })
        });
        setListTecnicos(listTec);
    }, []);

    useEffect(() => {
        loadingsLocations(comunidad);
        locationComunidad(comunidad);
        loadigTecnicos(comunidad);
    }, [comunidad, loadigTecnicos])

    return (
        <Col span={22} >
            <div className="header-title-newHorario" >
                <h1>Mapa de Operaciones</h1>
                <h1>{comunidad}</h1>
            </div>
            <TabListComunidadesHeader setComunidad={setComunidad} />
            <Row gutter={6}  >
                <Col span={18} >
                    <MonitorView center={center} listMarker={locationList} />
                </Col>
                <Col span={6}>
                    <CardListTecnicosActivos listTecnicos={listTecnicos} />
                </Col>
            </Row>
        </Col >
    );
}

export default PageMapa;