import React, { useEffect, useState } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faCrown } from '@fortawesome/free-solid-svg-icons'

const Movie = () => {
  const [pagina, setPagina] = useState(1)
  const [movieList, setMovieList] = useState([])
  const [loading, setloading] = useState(true)
  const [buscar, setbuscar] = useState("")
  
  const [mostrarModal, setModal] = useState(false)
  const [descripcion, setDescripcion] = useState("")
  const [titulo, setTitulo] = useState("")
  const [imagen, setImagen] = useState("")

  const [aviso, setAviso] = useState(true)
  const [checkboxMarcada, setCheckboxMarcada] = useState(false)

  const [categoriaPelicula, setcategoriaPelicula] = useState("general")

  const urlBuscador =  `https://api.themoviedb.org/3/search/movie?query=${buscar}&include_adult=false&language=en-US&page=${pagina}`
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=5608ee4ba79c9f09429b6592bf221b94&page=${pagina}`
  const urlTaquilla = `https://api.themoviedb.org/3/movie/now_playing?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`
  const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`
  const urlBest = `https://api.themoviedb.org/3/movie/top_rated?api_key=5608ee4ba79c9f09429b6592bf221b94&language=en-US&page=${pagina}`


  const getMovie = ((urlMostrar) => {
    console.log(urlMostrar)
    setloading(true)
    fetch(urlMostrar)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results))
      .finally(() => setloading(false))
  })

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

      default:
        currentUrl = url 
        break;
    } 
  
  setTimeout(() => {
    setAviso(false)
  }, 10000)

    getMovie(currentUrl)
  }, [pagina, categoriaPelicula])



  function sumaPagina() {
        setPagina(pagina + 1)
  }

  function restaPagina() {
    if (pagina > 1) {
      setPagina(pagina - 1)
    }
  }

const mostrarPelicula =((movie)=>{
  console.log(movie)
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


const handleCheckboxChange = () => {
 setCheckboxMarcada(!checkboxMarcada) 
  setAviso(false)
  
 

}

  return (
  <>
  
  {aviso && (
  <div className="aviso-container">

    <p>Si NO desea aceptar los terminos de la pagina espere 10 segundos, de lo contrario aceptelos en la siguiente casilla:
      <input type="checkbox" onChange={handleCheckboxChange} /></p>
   

    
    

  </div>
)}

  <form className='filtrado'>

    <section className='buscador-botones'>

        <label>
          <input  type="search" id='buscador' placeholder="Buscar..."/>
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



    {loading && <div>Cargando...</div>}
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

            <button className="favorite" >
              <FontAwesomeIcon icon={faCrown} />
            </button>

          </div>

        </div>
           
      </div>
      )}
      {movieList.map((movie) => (

        <div className="card" key={movie.id}>

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

          <a className="pie"  onClick={() => mostrarPelicula(movie)}>
            <FontAwesomeIcon icon={faCircleArrowDown}/>
          </a>

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

    </>
  )
}

// Se declaran varios estados utilizando el hook useState para manejar diferentes aspectos de la aplicación, como la página actual
// (pagina),la lista de películas (movieList), el estado de carga (loading), términos de búsqueda (buscar), etc.

// Se utiliza el hook useEffect para ejecutar el código dentro de él cuando cambian las dependencias especificadas (pagina y categoriaPelicula). 
// Dentro de este efecto, se determina la URL actual en función de la categoría seleccionada y se llama a getMovie con esa URL.

// Estas funciones cambian la categoría de las películas y reinician la página, luego llaman a getMovie con la nueva URL 
// correspondiente a la categoría seleccionada.

export default Movie