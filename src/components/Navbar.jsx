import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset, faHouse, faRightFromBracket, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

/**
* @author Diego Gutiérrez Vázquez
* 
* Parte del proyecto que refleja el resultado del router con una pequeña funcionalidad de Logout
*/


  const {user,setUser}= useContext(UserContext)
  const navigate = useNavigate()


  const Logout = () =>{
    setUser(false)
    navigate("/")
  }



  return (
    <>

      <nav className="navbar">
        <ul className="navbar-list">
          {user ? (
            <>

              <li className="navbar-list-item">
                <NavLink to="/" className="navbar-link" title="Inicio"><FontAwesomeIcon icon={faHouse} /></NavLink>
              </li>

              <li className="navbar-list-item">
                <NavLink to="/contact" className="navbar-link" title="Contácto"><FontAwesomeIcon icon={faHeadset} /></NavLink>
              </li>

              <li className="navbar-list-item ">
                <h1>PSMAX</h1>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/dashboard" className="navbar-link" title="Usuario"><FontAwesomeIcon icon={faUser} /></NavLink>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/" onClick={Logout} className="navbar-link" title="Cerrar sesión"><FontAwesomeIcon icon={faRightFromBracket} /></NavLink>
              </li>
            
            </>
          ) : (
            <>

              <li className="navbar-list-item">
                <NavLink to="/" className="navbar-link" title="Inicio"><FontAwesomeIcon icon={faHouse} /></NavLink>
              </li>

              <li className="navbar-list-item">
                <NavLink to="/contact" className="navbar-link" title="Contácto"><FontAwesomeIcon icon={faHeadset} /></NavLink>
              </li>

              <li className="navbar-list-item ">
                <h1>PSMAX</h1>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/login" className="navbar-link" title="Iniciar sesión"><FontAwesomeIcon icon={faRightToBracket}/></NavLink>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/register" className="navbar-link" title="Registrarse"><FontAwesomeIcon icon={faUserPlus} /></NavLink>
              </li>

            </>
          )}
        </ul>
      </nav>
  
  </>

  )
}


export default Navbar