import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"



const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async e => {
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg: 'Ingresa un correo válido',
        error: true
      })
      return
    }

    try{
      const {data} = await clienteAxios.post(`/usuarios/olvide-password/`, {email})

      setAlerta({
        msg: data.msg,
        error: false
      })

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      return
    }
  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recuperar <span className="text-slate-700">Contraseña</span></h1>

      <form className="my-10 bg-white shadow rounded-lg py-10 px-10" onSubmit={handleSubmit}>

        {msg && <Alerta alerta={alerta} />}

        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
          <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50" type="email" id="email" placeholder="Email de usuario"
          
          onChange={e => setEmail(e.target.value)}

          />
        </div>

        <input type="submit" value="Recuperar Contraseña" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/login">
          ¿Ya tienes una cuenta? <span className="font-bold">Iniciar Sesión</span>
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword
