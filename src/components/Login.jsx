import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../style/login.css';

const users = [
  {
    user: 'Admin',
    pass: '123'
  },
  {
    user: 'Alcala 260',
    pass: '123'
  },
  {
    user: 'Alcala 610',
    pass: '123'
  },
  {
    user: 'Alcobendas',
    pass: '123'
  },
  {
    user: 'Carabanchel',
    pass: '123'
  },
  {
    user: 'Carabanchel 2',
    pass: '123'
  },
  {
    user: 'Mejorada del campo',
    pass: '123'
  },
  {
    user: 'Villanueva de la Cañada',
    pass: '123'
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
      const { user, pass } = ele;
      if (user === userIn && pass === pwd) {
        te = true;
        setAuth({ user, pwd });
        setUser('');
        setPwd('');
        // setUser(true);
        navigate('/', { replace: true });
        // return;
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