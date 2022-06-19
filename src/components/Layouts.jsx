import React from 'react';
import { Col, Row } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from './PageHeader';

const Layout = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const goBack = () => navigate('/inicio', { replace: true })
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <main className='App'>
          <PageHeader />
          <section>
            {(pathName === '/' || pathName === '/login'|| pathName==='/inicio') ? <></> : <div className="flexGrow">
              <button onClick={goBack}>Go Back</button>
            </div>}
          </section>
          <Outlet />
        </main>
      </Col>
    </Row >
  )
};
export default Layout;