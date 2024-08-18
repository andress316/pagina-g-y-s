import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../../hooks/useAuth";
import Oath from "../components/Oath";
import loginImage from '../assets/home.png'; // Asegúrate de importar tu imagen correctamente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/app'); // Sección privada
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-white-500">
          <img src={loginImage} alt="Login Illustration" className="h-full w-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-gray-100 space-y-8">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Iniciar <span className="text-sky-600">Sesión</span>
            </h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Email de registro"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Iniciar Sesión
              </button>
            </div>

            <Oath />
          </form>
          <nav className="flex flex-col items-center space-y-4">
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">
              ¿No tienes una cuenta? <span className="font-bold">Regístrate</span>
            </Link>
            <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">
              Recuperar <span className="font-bold">Contraseña</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Login;
