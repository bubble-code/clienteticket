import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../style/login.css';

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [userT, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const login = () => {
    navigate('/', { replace: true });
  }
  return (
    <div className='login'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={login} className={"login__form"}>
        <h1>Sign In 😰</h1>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={userT}
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