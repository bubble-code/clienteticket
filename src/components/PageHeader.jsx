import React from "react";
import '../style/header.css'
import logo from '../style/img/logo.png';
import fondo from '../style/img/fondo.png';

const PageHeader = () => {

  return (
    <header className="App-header" >
      <div className="Header-container" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="Header-img"><img src={logo} alt="" /></div>
        <div></div>
      </div>
    </header>
  );
}

export default PageHeader;