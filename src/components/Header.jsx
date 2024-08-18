import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; // Importa la imagen del logo

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-lg py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 flex-wrap">
        {/* Logo */}
        <Link to="/" className="text-4xl text-sky-600 font-black flex items-center">
          <img src={logo} alt="Logo Guía y Salud" className="h-12 mr-2" />
         
        </Link>
        
        {/* Icono de menú de hamburguesa */}
        <button 
          onClick={toggleMenu} 
          className="text-2xl text-purple-900 md:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center gap-4 ml-auto">
          <Link to="/" className="font-bold uppercase text-purple-900 hover:text-gray-900">Inicio</Link>
          <Link to="/guia-y-apoyo" className="font-bold uppercase text-purple-900 hover:text-gray-900">Guía y Apoyo</Link>
          <Link to="/nosotros" className="font-bold uppercase text-purple-900 hover:text-gray-900">Nosotros</Link>
          <Link to="/blog" className="font-bold uppercase text-purple-900 hover:text-gray-900">Blog</Link>
          
          {/* Contenedor para los botones de inicio de sesión y registro */}
          <div className="ml-auto flex gap-4 items-center"> {/* ml-auto para moverlos a la derecha y gap-4 para espacio entre ellos */}
            <div className="inline-block border border-black rounded-lg overflow-hidden">
              <Link to="/login" className="block font-bold uppercase text-purple-900 hover:text-pink-900 py-2 px-4">
                Iniciar Sesión
              </Link>
            </div>
            <Link to="/registrar" className="text-white text-sm bg-pink-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700">
              Crear Cuenta
            </Link>
          </div>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      <nav className={`md:hidden ${isOpen ? "block" : "hidden"} px-6 pt-4 pb-2 space-y-2 bg-white shadow-md w-full`}>
        <Link to="/" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Inicio</Link>
        <Link to="/guia-y-apoyo" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Guía y Apoyo</Link>
        <Link to="/nosotros" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Nosotros</Link>
        <Link to="/blog" className="block font-bold uppercase text-purple-900 hover:text-gray-900">Blog</Link>
        
        {/* Botones de inicio de sesión y registrar en móvil */}
        <div className="flex flex-col gap-4">
          <div className="inline-block border border-black rounded-lg overflow-hidden">
            <Link to="/login" className="block text-center font-bold uppercase text-purple-900 hover:text-pink-900 py-2 px-4">
              Iniciar Sesión
            </Link>
          </div>
          <Link to="/registrar" className="block text-center text-white text-sm bg-pink-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700">
            Crear Cuenta
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
