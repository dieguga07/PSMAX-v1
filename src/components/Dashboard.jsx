import React, { useEffect, useState } from 'react'

const Dashboard = () => {

/**
* @author Diego Gutiérrez Vázquez
* 
* Esta parte se utiliza para la página personal , la cual contiene los favoritos.
*/

//Estados

  const [favoritos, setFavoritos] = useState([])


  //Cada vez que el usuario elimine una pelicula , esto se vera reflejado con el useEffect
  useEffect(() => {
    const favoritosJSON = localStorage.getItem("favoritos")
  
    if (favoritosJSON) {
      const favoritosList = JSON.parse(favoritosJSON)
      setFavoritos(favoritosList)
    }
  }, [])

  //función que filtra los favoritos y actualiza la lista
  const eliminarFav = (titulo) => {
    const favoritosFiltrados = favoritos.filter((favorito) => favorito.titulo !== titulo)
    setFavoritos(favoritosFiltrados)
    localStorage.setItem('favoritos', JSON.stringify(favoritosFiltrados))
  }

  return (
    <>
      <section className="favoritos">
        <h2>Tus Favoritos</h2>
        <div className="galeria">
          {favoritos.map((favorito, index) => (
            <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${favorito.imagen}`} title={favorito.titulo} />
              <button onClick={() => eliminarFav(favorito.titulo)}>Eliminar</button>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default Dashboard