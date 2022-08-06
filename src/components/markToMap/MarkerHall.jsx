import React, { useState, useEffect, useCallback } from 'react';
import DataService from '../../service/service'
import { Popover, Badge, Card } from 'antd';
import './style.css';

const MarkerHall = ({ comunity, hall, cantOpen, cantClose, cantProcess }) => {
  const [cant, setCant] = useState(0);
  const [stanBy, setStanBy] = useState(0);

  const loadFault = async ({ comunit, salon }) => {
    const closeToDay = await DataService.getCantTicketCloseToday({ comunidad: comunit, hall: salon });
    const inSBY = await DataService.getCantTicketStandBy({ comunidad: comunit, hall: salon });
    setCant(closeToDay);
    setStanBy(inSBY);
  }

  useEffect(() => {
    loadFault({ comunit: comunity, salon: hall });
  }, [comunity, hall])

  const content = (
    <div key={hall} className='badge-mapa'>
      <Badge.Ribbon text="Abiertas" color="#f5222d" className='badge-ribbon-text' >
        <Card className='badge-text'>
          <p>{cantOpen}</p>
        </Card>
      </Badge.Ribbon>
      <Badge.Ribbon text="En Proceso" color="purple" className='badge-ribbon-text' >
        <Card className='badge-text'>
          <p>{stanBy}</p>
        </Card>
      </Badge.Ribbon>
      <Badge.Ribbon text="Cerradas" color="green" className='badge-ribbon-text' >
        <Card className='badge-text'>
          <p>{cant}</p>
        </Card>
      </Badge.Ribbon>
    </div>
  );

  return (
    <Popover
      content={content}
      title={`${hall}`}
      style={{ color: '#fff' }}
      color={'rgba(0,0,0,0.7)'}
      overlayClassName='badge-ribbon-text badge-ribbon-container'
    >
      <div className={'holderStyle'}>
        <div className={'textStyle'}>{cantOpen}</div>
      </div>
    </Popover>
  );
}

export default MarkerHall;