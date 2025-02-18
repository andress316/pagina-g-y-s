const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-700'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-5`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta
