import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'reactstrap'
import { Card, Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined, PlayCircleOutlined } from '@ant-design/icons';
import '../style/login.css';
import logoMerkur from '../style/img/logo.png';

const users = [
  {
    user: 'Adrian',
    pass: '123',
    role: 2,
    comunidad: 'Madrid',
  },
  {
    user: 'Jonay',
    pass: '123',
    role: 2,
    comunidad: 'Madrid',
  },
  {
    user: 'Ramiro',
    pass: '123',
    role: 2,
    comunidad: 'Mallorca',
  },
  {
    user: 'Yamila',
    pass: '123',
    role: 2,
    comunidad: 'Mallorca',
  },
  {
    user: 'Viviana',
    pass: '123',
    role: 2,
    comunidad: 'Mallorca',
  },
  {
    user: 'Jose Manuel',
    pass: '123',
    role: 2,
    comunidad: 'Cantabria',
  },
  {
    user: 'Javier',
    pass: '123',
    role: 2,
    comunidad: 'Cantabria',
  },
  {
    user: 'Nelson',
    pass: '123',
    role: 2,
    comunidad: 'Navarra',
  },
  {
    user: 'Joaquin',
    pass: '123',
    role: 2,
    comunidad: 'Navarra',
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
  {
    user: 'Santoña',
    pass: '123',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Torrelavega',
    pass: '123',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Santander',
    pass: '123',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Alsasua',
    pass: '123',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Mendebaldea',
    pass: '123',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Olite',
    pass: '123',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Tudela',
    pass: '123',
    role: 4,
    comunidad: 'Navarra',
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
    <div className="auth-page" >
      <Container>
        <Card className='login ' bordered={false}>
          <header className='login-title'>
            <img src={logoMerkur} alt="logo" style={{ height: '60px', display: 'block', zIndex: 1, width: '60%', margin: 0, padding: 0 }} />
          </header>
          <p className='login-info'>Use su usuario para acceder</p>
          {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
          <Form onFinish={login} className={"login-form"}>
            <div className='login-form-input-group'>
              <h5 htmlFor="username">Usuario:</h5>
              <Input style={{ backgroundColor: '#12142b', color: 'white', border: 'none' }}
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={userIn}
                required
                prefix={<UserOutlined />}
              />
            </div>
            <div className='login-form-input-group'>
              <h5 htmlFor="password">Contraseña:</h5>
              <Input style={{ backgroundColor: '#12142b', color: 'white', border: 'none' }}
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required={true}
                prefix={<LockOutlined />}
              />
            </div>

            <div className='login-form-button-submit'>
              <Button type='primary' htmlType='submit' shape="default" icon={<PlayCircleOutlined />} title='Login'>Login</Button>
              {/* <button type='submit' className='submit__btn'>Aceptar</button> */}
            </div>
          </Form>
        </Card>
      </Container>
      <footer className='contentFooter'>
        2022 @ Desarrollado por <a href="https://github.com/bubble-code" >bubble-code</a> and <a href="https://merkur-slots.es/index-2.html" >Merkur Instinct</a>
      </footer>
    </div>
  );
}
export default LoginPage;