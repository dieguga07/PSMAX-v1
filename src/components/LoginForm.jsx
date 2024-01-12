import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const LoginForm = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [user, setUsernombre] = useState("")
  const [password, setPassword] = useState("")

  const [mostrarToast, setMostrarToast] = useState(false)
  const [mensajeToast, setMensajeToast] = useState("")

  // Validación de campos vacíos y creación de un toast por si da error
  const handleLogin = () => {
  const userListJSON = localStorage.getItem('userList')

    if (user.trim() === "" || password.trim() === "") {
      Toast('Por favor, complete todos los campos')
      return
    }

    const userList = userListJSON ? JSON.parse(userListJSON) : []

    // Buscar el usuario en la lista
    const comparaUser = userList.find((storedUser) => storedUser.usuario === user && storedUser.password === password)

    if (comparaUser) {
      setUser(true)
      navigate('/dashboard')
    } else {
      Toast('El usuario o la contraseña no coinciden')
    }
  };

  // Función para mostrar el toast y establecer temporizador
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

          <h2>Iniciar Sesión</h2>

          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" value={user} onChange={(e) => setUsernombre(e.target.value)}/>

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <button type="button" onClick={handleLogin}>Iniciar Sesión</button>

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
  );
};

export default LoginForm