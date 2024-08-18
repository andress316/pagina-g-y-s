import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import logo from "../assets/logo.png"; // Importa la imagen del logo

const AuthHeader = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCerrarSesion = e => {
    e.preventDefault();
    setAuth({});
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-lg py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 flex-wrap">
        {/* Logo */}
        <Link to="/app" className="text-4xl text-sky-600 font-black flex items-center">
          <img src={logo} alt="Logo Guía y Salud" className="h-12 mr-2" />
        </Link>

        {/* Icono de menú de hamburguesa */}
        <button onClick={toggleMenu} className="text-2xl text-purple-900 md:hidden">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center gap-4 ml-auto">
          
          <Link to="/app/perfil" className="font-bold uppercase text-purple-900 hover:text-gray-900">Mi Perfil</Link>
          <Link to="/blog" className="font-bold uppercase text-purple-900 hover:text-gray-900">Blog</Link>
          <button type="button" className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700" onClick={handleCerrarSesion}>
            Cerrar Sesión
          </button>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      <nav className={`md:hidden ${isOpen ? "block" : "hidden"} px-6 pt-4 pb-2 space-y-2 bg-white shadow-md w-full`}>
        <Link to="/app/perfil" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Mi Perfil</Link>
        <Link to="/blog" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Blog</Link>
        <button type="button" className="w-full text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default AuthHeader;
