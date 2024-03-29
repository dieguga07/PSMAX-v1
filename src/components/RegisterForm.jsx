import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const RegisterForm = () => {

/**
* @author Diego Gutiérrez Vázquez
* 
* Formulario de Registro , parecido al de Login pero cambiando algunas cosas
*/

  //Estados
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [numeroTelefono, setNumeroTelefono] = useState('')
  const [password, setPassword] = useState('')

  const [mostrarToast, setMostrarToast] = useState(false)
  const [mensajeToast, setMensajeToast] = useState('')

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const Register = () => {
   
    if (usuario.trim() === "" || email.trim() === "" || numeroTelefono.trim() === "" || password.trim() === "") {
      Toast('Por favor, complete todos los campos')
      return
    }

    // Validación del número de teléfono usando expresión regular
    const numeroRegex = /^[6789]\d{8}$/

    if (!numeroRegex.test(numeroTelefono)) {
      Toast('El número de teléfono no es correcto o el formato es erróneo')
      
      return
    }

    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      Toast('El correo electrónico no es correcto o el formato es erróneo')
      
      return
    }

    // Obtener la lista de usuarios del localStorage o inicializarla si no existe
    const userListJSON = localStorage.getItem('userList')
    const userList = userListJSON ? JSON.parse(userListJSON) : []

    // Validar si el usuario ya existe
    const userExiste = userList.some(user => user.usuario === usuario)

    if (userExiste) {
      Toast('El usuario ya existe')
      return
    }

    // Agregar el nuevo usuario a la lista
    const nuevoUser = { usuario, email, numeroTelefono, password };
    userList.push(nuevoUser);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('userList', JSON.stringify(userList));

      setUser(true)
      navigate("/dashboard")

  }

  const Toast = (mensaje) => {

    setMensajeToast(mensaje)
    setMostrarToast(true)
   
    setTimeout(() => {
      setMostrarToast(false)
    }, 5000)
  }

  return (
    <>
      <article className="container">

        <form>

          <h2>Registro</h2>

          <label >Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

          <label >Correo electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Número de Teléfono:</label>
          <input type="text" value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />

          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="button" onClick={Register}>Registrarse</button>

        </form>

      </article>

      {/* La expresión {mostrarToast && (...)} se utiliza para condicionalmente renderizar el bloque JSX dentro de los paréntesis 
      solo si mostrarToast es true. De lo contrario, no se renderiza nada.Si intentara poner {mostrarToast(...)} , estaría tratando de 
      invocar mostrarToast directamente en vez de un elemento JSX */}

      {mostrarToast && (
        
        <div className="toast">

          <p>{mensajeToast}</p>

        </div>

      )}
    </>
  )
}

export default RegisterForm