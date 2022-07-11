import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/login.css';

const users = [
  {
    user: 'Adrian',
    pass: '123',
    role: 2,
    comunidad: 'Madrid',
  },
  {
    user: 'Admin',
    pass: '123',
    role: 1,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcala 260',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcala 610',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcobendas',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Carabanchel',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Carabanchel 2',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Mejorada del campo',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Villanueva de la Cañada',
    pass: '123',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Tropicana',
    pass: '123',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Riviera',
    pass: '123',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Fortuna',
    pass: '123',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Malibu',
    pass: '123',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Cancun',
    pass: '123',
    role: 4,
    comunidad: 'Mallorca',
  },

]

const LoginPage = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [userIn, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  // const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])
  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd]);

  const login = (e) => {
    let te = false;
    users.forEach(ele => {
      const { user, pass, role, comunidad } = ele;
      if (user === userIn && pass === pwd) {
        te = true;
        setAuth({ user, pwd, role, isInicio: false, comunidad });
        setUser('');
        setPwd('');
        navigate('/inicio', { replace: true });
      }

    })
  }
  return (
    <div className='login'>
      {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
      <form onSubmit={login} className={"login__form"}>
        <h1>Sign In 😰</h1>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={userIn}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button type='submit' className='submit__btn'>Aceptar</button>
      </form>
    </div>
  );
}
export default LoginPage;