import { Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Header from "../components/Header"
import AuthHeader from "../components/AuthHeader"

const AuthLayout = () => {

  const { auth, cargando } = useAuth();
  if(cargando) return 'Cargando...'


  return (
    <>
    {auth._id ? <AuthHeader /> : <Header />}
    <main className="container-fluid mx-auto md:justify-center">
      <div>
       <Outlet />
      </div>
    </main>
    </>
  )
}

export default AuthLayout
