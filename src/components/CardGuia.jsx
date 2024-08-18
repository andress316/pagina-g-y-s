import React from 'react'

const CardGuia = ({nombre, guia_nombre_display, fecha, url, url_preview_img}) => {
    return (
        <>
            <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">

                <img className="h-40 object-cover rounded-xl" src={url_preview_img} alt="" />
                <div className="p-2">

                    <h2 className="font-bold text-lg mb-2 ">Guia: <br/> {guia_nombre_display}</h2>

                    <p className="text-sm text-gray-600">Paciente: {nombre}</p>
                    <p className="text-sm text-gray-600">Fecha: {fecha}</p>
                </div>

                <div className="m-2">
                    <a role='button' href={url} target="_blank" className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700 w-full">Ver guía</a>
                </div>
            </div>
        </>
    )
}

export default CardGuia
