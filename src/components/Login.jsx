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
    user: 'Tec1',
    pass: 'mio',
    role: 2,
    comunidad: 'Madrid',
  },  
  {
    user: 'Tec2',
    pass: 'mio',
    role: 2,
    comunidad: 'Mallorca',
  },
  {
    user: 'Tec3',
    pass: 'mio',
    role: 2,
    comunidad: 'Cantabria',
  },
  {
    user: 'Tec4',
    pass: 'mio',
    role: 2,
    comunidad: 'Navarra',
  },
  {
    user: 'Admin',
    pass: 'mio',
    role: 1,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcala 260',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcala 610',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Alcobendas',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Carabanchel',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Carabanchel 2',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Mejorada del campo',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Villanueva de la Cañada',
    pass: 'mio',
    role: 4,
    comunidad: 'Madrid',
  },
  {
    user: 'Tropicana',
    pass: 'mio',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Riviera',
    pass: 'mio',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Fortuna',
    pass: 'mio',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Malibu',
    pass: 'mio',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Cancun',
    pass: 'mio',
    role: 4,
    comunidad: 'Mallorca',
  },
  {
    user: 'Santoña',
    pass: 'mio',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Torrelavega',
    pass: 'mio',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Santander',
    pass: 'mio',
    role: 4,
    comunidad: 'Cantabria',
  },
  {
    user: 'Alsasua',
    pass: 'mio',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Mendebaldea',
    pass: 'mio',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Olite',
    pass: 'mio',
    role: 4,
    comunidad: 'Navarra',
  },
  {
    user: 'Tudela',
    pass: 'mio',
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
        switch (role) {
          case 1:
            navigate('/admin', { replace: true });
            break;
          case 2:
            navigate('/pagetecnicos/botonesInicio', { replace: true });
            break;
          default:
            navigate('/salon/inicio', { replace: true });
        }
        return;
      }

    })
  }
  return (
    <div className="auth-page" >
      <Container>
        <Card className='login ' bordered={false}>
          <header className='login-title'>
            {/* <img src={logoMerkur} alt="logo" style={{ height: '60px', display: 'block', zIndex: 1, width: '60%', margin: 0,  }} /> */}
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
        Copyright @ 2022 Todos los Derechos Reservados  <a href="https://github.com/bubble-code" >Alejandro</a>
      </footer>
    </div>
  );
}
export default LoginPage;