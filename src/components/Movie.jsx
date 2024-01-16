import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faCrown, faEye } from '@fortawesome/free-solid-svg-icons'

const Movie = () => {

/**
* @author Diego Gutiérrez Vázquez
* 
* Parte central del proyecto, En ella se ejecutan la mayoría de acciones, como pueden ser el filtrado, la paginación...
*
*/  


//Estados
  const [pagina, setPagina] = useState(1)
  const [movieList, setMovieList] = useState([])
  const [loading, setloading] = useState(true)
  const [buscar, setbuscar] = useState("")
  
  const [mostrarModal, setModal] = useState(false)

  const [descripcion, setDescripcion] = useState("")
  const [titulo, setTitulo] = useState("")
  const [imagen, setImagen] = useState("")

  const [categoriaPelicula, setcategoriaPelicula] = useState("normal")

  const [mostrarToast, setMostrarToast] = useState(false)
  const [mensajeToast, setMensajeToast] = useState('')

  //Urls para llamar a la api y aplicar filtrados

  const urlBuscador =  `https://api.themoviedb.org/3/search/movie?api_key=5608ee4ba79c9f09429b6592bf221b94&query=${buscar}&include_adult=false&language=en-US&page=${pagina}`
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=5608ee4ba79c9f09429b6592bf221b94&page=${pagina}`
  const urlTaquilla = `https://api.themoviedb.org/3/movie/now_playing?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`
  const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`
  const urlBest = `https://api.themoviedb.org/3/movie/top_rated?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`

//Llamada a la API
const getMovie = ((urlMostrar) => {
    console.log(urlMostrar)
    setloading(true)
    fetch(urlMostrar)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results))
      .finally(() => setloading(false))
  })

//Renderiza cada cambio de página o de url de llamada a la API
useEffect(() => {
    let currentUrl
    switch (categoriaPelicula) {

      case "popular":
        currentUrl = urlPopular
        break

      case "taquilla":
        currentUrl = urlTaquilla
        break

      case "best":
        currentUrl = urlBest
        break

      case "buscador":
        currentUrl = urlBuscador
        break

      default:
        currentUrl = url 
        break
    } 
  
    getMovie(currentUrl)

  }, [pagina, categoriaPelicula])

//Funciones de sumar o restar página

function sumaPagina() {
        setPagina(pagina + 1)
  }

function restaPagina() {
    if (pagina > 1) {
      setPagina(pagina - 1)
    }
  }


//Funcion que se encarga de mostrar un modal 
const mostrarPelicula =((movie)=>{
  modal(movie.title,movie.poster_path,movie.overview)
})

const modal = (titulo,imagen,descripcion) => {
  setTitulo(titulo)
  setImagen(imagen)
  setDescripcion(descripcion)
  setModal(true)
}

const cerrarModal = () => {
  setModal(false)
}

//funcion que cambia la categoria según los parámetros pasados por las funciones:taquilla ,popular ,best y buscarPeli
const cambiarCategoria = (categoria, urlCategoria) => {
  setcategoriaPelicula(categoria)
  setPagina(1)
  getMovie(urlCategoria)
}

const taquilla = (e) => {
  e.preventDefault()
  cambiarCategoria("taquilla", urlTaquilla)
}

const popular = (e) => {
  e.preventDefault()
  cambiarCategoria("popular", urlPopular)
}

const best = (e) => {
  e.preventDefault()
  cambiarCategoria("best", urlBest)
}

const buscarPeli = (e) => {
  setbuscar(e.target.value)
  cambiarCategoria("buscador",urlBuscador)
}

//fucion llamada en el boton de añadir favoritos
const addFavoritos = (movie) => {
  const favorito = {
    titulo: movie.title,
    imagen: movie.poster_path
  }

  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  //comprueba si existe ya en la lista
  const existeEnFavoritos = favoritos.some((newfav) => newfav.titulo === favorito.titulo)

  !existeEnFavoritos? (
    (
      favoritos.push(favorito),localStorage.setItem('favoritos', JSON.stringify(favoritos)),

      Toast("Película añadida a favoritos.")
    )
  )
  : Toast("La película ya está en favoritos.")
  
}

const Toast = (mensaje) => {
  setMensajeToast(mensaje)
  setMostrarToast(true)

  setTimeout(() => {
    setMostrarToast(false)
  }, 2000)
}


  return (
  <>

  <form className='filtrado'>

    <section className='buscador-botones'>

        <label>
          <input  type="search" id='buscador'value={buscar} onChange={buscarPeli} placeholder="Buscar..."/>
        </label>

        <label>
          <button onClick={popular}>Populares</button>
        </label>

        <label>
          <button onClick={taquilla}>En taquilla</button>
        </label>

        <label>
          <button onClick={best}>Mejores Valoradas</button>
        </label>

    </section>

  </form>

    <section className='contenedor-btn-paginacion'>

      <button onClick={restaPagina}>
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>

      <button onClick={sumaPagina}>
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </button>
        
    </section>

    {loading && <div className="centrado-load"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
    <div className='galeria'>

    {/* Recorremos las peliculas y creamos un card por cada una */}
    {mostrarModal && (
      <div className="new-toast-container">

        <div className="new-toast">

          <h3>{titulo}</h3>
          <img src={`https://image.tmdb.org/t/p/w500${imagen}`}></img>
          <p>{descripcion}</p>

          <div className="new-toast-buttons">

            <button onClick={cerrarModal}>
              <FontAwesomeIcon icon={faCircleXmark}/>
            </button>

          </div>

        </div>
           
      </div>
      )}
      {movieList.map((movie) => (

        <div className="card" key={movie.id}>

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} />

          <div className="acciones">
            <button className="pie" title="Ver más" onClick={() => mostrarPelicula(movie)}><FontAwesomeIcon icon={faEye} /></button>
            <button className="pie" title="Añadir a favoritos" onClick={() => addFavoritos(movie)}><FontAwesomeIcon icon={faCrown}/></button>
          </div>
              
        </div>

      ))}

    </div>
    
    <section className='contenedor-btn-paginacion'>

        <button onClick={restaPagina}>
          <FontAwesomeIcon icon={faCircleArrowLeft} />
         </button>

        <button onClick={sumaPagina}>
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </button>

    </section>

    {mostrarToast && (
        
        <div className="toast">

          <p>{mensajeToast}</p>

        </div>

      )}

    </>
  )
}

export default Movie