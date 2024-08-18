import useAuth from "../../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import CardGuia from "../components/CardGuia";

const AppInicio = () => {
  const { auth, cargando } = useAuth();
  const [guias, setGuias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState([]);
  const mensajesEndRef = useRef(null);

  useEffect(() => {
    const consultarGuias = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data } = await clienteAxios.get(`/pdf-guide/${auth._id}`, config);
        setGuias(data);
      } catch (error) {
        console.error('Error al consultar las guías:', error);
      }
    };

    const consultarConversacion = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data } = await clienteAxios.get(`/mensaje/conversaciones/${auth._id}`, config);
        // Formatear los datos adecuadamente
        const formattedData = data.map(msg => [
          { sender: 'me', text: msg.mensajeUsuario.split(/Thu|Sun|Mon|Tue|Wed|Fri|Sat/)[0], createdAt: msg.createdAt },
          { sender: 'bot', text: msg.MensajeRespuestaBot.split(/Thu|Sun|Mon|Tue|Wed|Fri|Sat/)[0], createdAt: msg.createdAt }
        ]).flat();

        // Si no hay conversaciones previas, añadir mensaje de bienvenida del bot
        if (formattedData.length === 0) {
          const welcomeMessage = { sender: 'bot', text: `Hola ${auth.nombre}, ¿En qué puedo ayudarte hoy?`, createdAt: new Date() };
          formattedData.push(welcomeMessage);
        }

        setConversacion(formattedData);
      } catch (error) {
        console.error('Error al consultar la conversación en el chat:', error);
      }
    };

    //consultarGuias();
    consultarConversacion();

    // Manejador de scroll para asegurar que la página esté arriba al cargar
    window.scrollTo(0, 0);

  }, [auth._id, auth.nombre]);

  useEffect(() => {
    if (mensajesEndRef.current) {
      mensajesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mensaje);
    try {
      const { data } = await clienteAxios.post(`/mensaje/registrar`, { mensaje, id: auth._id });
      setConversacion([
        ...conversacion,
        { sender: 'me', text: mensaje, createdAt: new Date() },
        { sender: 'bot', text: data.msg.split(/Thu|Sun|Mon|Tue|Wed|Fri|Sat/)[0], createdAt: new Date() }
      ]);
      setMensaje('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  if (cargando) return 'Cargando...';

  return (
    <>
      <div className="flex flex-col h-[70vh] max-w-lg mx-auto border rounded-lg overflow-hidden bg-gray-800">
        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
          {conversacion.length > 0 ? (
            conversacion.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === 'me'
                    ? 'bg-blue-200 self-end text-right'
                    : 'bg-white self-start text-left'
                }`}
              >
                <p className="text-xs" style={{ fontSize: '12px' }}>{msg.text}</p>
                <small className="text-xs text-gray-500" style={{ fontSize: '12px' }}>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center">No hay conversaciones previas.</div>
          )}
          <div ref={mensajesEndRef} />
        </div>
        <form className="flex p-4 bg-gray-700 border-t border-gray-600" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 bg-gray-600 text-white"
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
      {/* <h1 className="text-sky-600 font-black text-3xl.capitalize">
        Bienvenido <span className="text-slate-700">{auth.nombre}</span>
      </h1>
      <div className="mb-10">
        Desde el inicio de tu aplicación
      </div>
      <h2 className="text-sky-600 font-black text-3xl capitalize">Acá va un chat</h2>
      <div className="bg-gray-100 w-full gap-4 flex-wrap flex justify-center items-center mt-20">
        {guias.length ? (
          guias.map((guia) => (
            <CardGuia
              key={guia._id}
              nombre={guia.nombre}
              guia_nombre_display={guia.guia_nombre_display}
              fecha={guia.fecha}
              url={guia.url}
              url_preview_img={guia.url_preview_img}
            />
          ))
        ) : (
          'No has creado ninguna guía aún...'
        )}
      </div>
      <div className="flex gap-4 mt-10">
        <Link to="/guias/cancer" className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
          Crear nuevas guías
        </Link>
      </div> */}
    </>
  );
};

export default AppInicio;
