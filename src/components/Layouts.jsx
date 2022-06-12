import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from './PageHeader';

const Layout = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const goBack = () => navigate('/', { replace: true })
  return (
    <main className='App'>
      <PageHeader />
      <section>
        {(pathName === '/' || pathName === '/login') ? <></> : <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>}

      </section>
      <Outlet />
    </main>
  )
};
export default Layout;