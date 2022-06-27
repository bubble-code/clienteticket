import React from 'react';
import { Popover } from 'antd';
import '../style/markerStyles.css';

const MarkerHall = ({ hall, cantFaults }) => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <Popover content={content} title={`${hall}`} style={{background:'#000',opacity:0.3 }}>
      <div className={'holderStyle'}>
        <div className={'textStyle'}>{cantFaults}</div>
      </div>
    </Popover>
  );
}

export default MarkerHall;