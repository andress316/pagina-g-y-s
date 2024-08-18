import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import Oath from "../components/Oath"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no so iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: 'Contraseña muy corta, tu contraseña debe tener mínimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    // Creamos el usuario a través de la API
    try{
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }



  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crear <span className="text-slate-700">Cuenta</span></h1>

      <form className="my-10 bg-white shadow rounded-lg py-10 px-10" onSubmit={handleSubmit}>

      {msg && <Alerta alerta={alerta}/>}

        <div className="my-5">
          <label htmlFor="nombre" className="uppercase text-gray-700 block text-xl font-bold">Nombre</label>
          <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="text" id="nombre" placeholder="Ingresa tu nombre"
          
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          
          />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
          <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="email" id="email" placeholder="Email de registro"
          
          value={email}
          onChange={e => setEmail(e.target.value)}
          
          />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Contraseña</label>
          <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" id="password" placeholder="Ingresa tu contraseña"
          
          value={password}
          onChange={e => setPassword(e.target.value)}

          />
        </div>
        <div className="my-5">
          <label htmlFor="repetirPassword" className="uppercase text-gray-700 block text-xl font-bold">Repetir Contraseña</label>
          <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="password" id="password2" placeholder="Ingresa tu contraseña"
          
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}

          />
        </div>

        <input type="submit" value="Crear cuenta" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />

        <Oath />
        
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/login">
          ¿Ya tienes una cuenta? <span className="font-bold">Iniciar Sesión</span>
        </Link>
      </nav>




    </>
  )
}

export default Registrar
