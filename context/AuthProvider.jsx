import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../src/config/clienteAxios";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    // Utilizamos el useEffect para autorizar a los usuarios con el Token
    //Para eso se consulta la API con el token y se guarda los datos de Auth en el state
    useEffect(() => {

        const autenticarUsuario = async () => {
            // Revisamos si el token para auth se guardo en local storage
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }
            
            // Definimos la configuración para hacer una consulta a la api
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            // Realizamos una consulta a la API
            try {
                const {data} = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)

                if (!auth._id) {
                    navigate('/app')
                    return
                }

            } catch (error) {
                setAuth({})
            } finally{
                setCargando(false)
            }
        }

        autenticarUsuario() // Llamamos la funnción
        
    }, [])




    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext;







