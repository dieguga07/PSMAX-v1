import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const LayoutPrivate = () => {
  
  const { user } = useContext(UserContext)
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    const favoritosJSON = localStorage.getItem("favoritos")

    if (favoritosJSON) {
      const favoritosArray = JSON.parse(favoritosJSON)
      setFavoritos(favoritosArray)
    }
  }, []) // Este efecto se ejecutará solo una vez al montar el componente

  return (
    <>
      {user ? (
        <>
          <Outlet />
          <section className="favoritos">
            <h2>Tus Favoritos</h2>
            <div className="galeria">
              {favoritos.map((favorito, index) => (
                <div className="card" key={index}>
                  <h1>{favorito.titulo}</h1>
                  <img src={`https://image.tmdb.org/t/p/w500${favorito.imagen}`} alt={favorito.titulo} />
                  <button>Eliminar</button>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default LayoutPrivate