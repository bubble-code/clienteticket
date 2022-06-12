import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from './PageHeader';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => navigate('/', { replace: true })
  return (
    <main className='App'>
      <PageHeader />
      <section>
        <div className="flexGrow">
          {location.pathname === '/' ? <></> : <button onClick={goBack}>Go Back</button>}
        </div>
      </section>
      <Outlet />
    </main>
  )
};
export default Layout;