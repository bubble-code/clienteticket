import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuTopHorario from "./component/MenuTopHorario";

const PageNewHorario = () => {
    const [viewListTecnico, setViewListTecnico] = useState(false);
    return (
        <div>
            <h1>Cuadrante</h1>
            <h1>PageNewHorario</h1>
            <MenuTopHorario />
        </div >
    );
}

export default PageNewHorario;