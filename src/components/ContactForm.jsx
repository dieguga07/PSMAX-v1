import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ContactForm = () => {

    const { setUser } = useContext(UserContext)

    const [user, setUsernombre] = useState("")
    const [aportacion, setAportacion] = useState("")
    const [email, setEmail] = useState("")
   
    const [mostrarToast, setMostrarToast] = useState(false)
    const [mensajeToast, setMensajeToast] = useState("")

    const handleContacto = (()=>{

        if (user.trim() === "" || aportacion.trim() === "" || email.trim() ==='') {
            Toast('Por favor, complete todos los campos')
            return
          }

          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(email)) {
            Toast('El correo electrónico no es correcto o el formato es erróneo')
            return
          }

          setUsernombre("")
          setAportacion("")
          setEmail("")

          Toast('Enviando datos...')
    })


    const Toast = (mensaje) => {
      setMensajeToast(mensaje)
      setMostrarToast(true)
  
      setTimeout(() => {
       
        setMostrarToast(false)
      }, 3000)
    }

  return (
    <>

    <article className="container">

      <form>

        <h2>Contactanos</h2>

        <label>Usuario:</label>
        <input typeof='text' value={user} onChange={(e) => setUsernombre(e.target.value)}/>

        <label>Correo electrónico:</label>
        <input typeof='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Aportacion:</label>
        <textarea value={aportacion} onChange={(e) => setAportacion(e.target.value)} />
        
        <button type="button" onClick={handleContacto}><FontAwesomeIcon icon={faPaperPlane} /></button>

      

      </form>

    </article>

    {/* La expresión {mostrarToast && (...)} se utiliza para condicionalmente renderizar el bloque JSX dentro de los paréntesis 
    solo si mostrarToast es true. De lo contrario, no se renderiza nada.Si intentara poner {mostrarToast(...)} , estaría tratando de 
    invocar mostrarToast directamente en vez de un elemento JSX */}

    {mostrarToast && (
      <div className="toast">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p>{mensajeToast}</p>
      </div>
    )}

  </>
  )
}

export default ContactForm