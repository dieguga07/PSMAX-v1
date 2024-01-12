import React from 'react'

const ContactForm = () => {

    const { setUser } = useContext(UserContext)

    const [user, setUsernombre] = useState("")
    const [aportacion, setAportacion] = useState("")
  
    const [mostrarToast, setMostrarToast] = useState(false)
    const [mensajeToast, setMensajeToast] = useState("")

    const handleContact = (()=>{

        if (user.trim() === "" || aportacion.trim() === "") {
            Toast('Por favor, complete todos los campos')
            return
          }
    })


  return (
    <div>ContactForm</div>
  )
}

export default ContactForm