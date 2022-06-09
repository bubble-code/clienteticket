import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('/', { replace: true })
  return (
    <main className='App'>
      <h1>Hola Layout</h1>
      <section>
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
        </div>
      </section>
      <Outlet />
    </main>
  )
};
export default Layout;