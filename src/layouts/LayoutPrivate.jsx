import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const LayoutPrivate = () => {

  
  
  const { user } = useContext(UserContext)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    
    const userListJSON = localStorage.getItem('userList')

    if (userListJSON) {

      const userList = JSON.parse(userListJSON);
      // Busca en la lista de usuarios 
      const Usuarioseleccionado = userList.find((storedUser) => storedUser.usuario === user)

      if (Usuarioseleccionado) {
        setUserData(Usuarioseleccionado)
      }else {
      // Limpiamos la información almacenada
        setUserData(null);
      }
    }
  }, [user])

  return (
    <>
      {user ? <Outlet /> : <Navigate to="/" />}

      <div>
        <p>Usuario:</p>
        <p>Correo:</p>
        <p>Numero de teléfono:</p>
      </div>
    </>
  )
}

export default LayoutPrivate
