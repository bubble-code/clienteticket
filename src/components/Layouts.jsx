import React from 'react';
import { Col, Row } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MainPageHeader from './PageHeader';
import MenuHeader from './MenuHeader';

const Layout = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const goBack = () => navigate('/', { replace: true })
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24}>
        <main className='App'>
          {(pathName === '/' || pathName === '/login') ? <></> : <MainPageHeader />}
          {/* <section>
            {(pathName === '/' || pathName === '/login' || pathName === '/inicio') ? <></> : <div className="flexGrow"> */}
              {/* <button onClick={goBack}>Go Back</button> */}
              {/* <MenuHeader />
            </div>}
          </section> */}
          <Outlet />
        </main>
      </Col>
    </Row >
  )
};
export default Layout;