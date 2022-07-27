import React from "react";
import { Calendar } from "antd";
import './style.css';

const Calendario = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className="site-calendar-demo-card" >
      <Calendar fullscreen={false} onPanelChange={onPanelChange} headerRender={() => { }} />
    </div>
  );
}
export default Calendario;