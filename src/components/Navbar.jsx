import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {


  const {user,setUser}= useContext(UserContext)
  const navigate = useNavigate()

  const Login = () =>{
    setUser(true)
    navigate("/dashboard")
  }

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
                <NavLink to="/" className="navbar-link">Inicio</NavLink>
              </li>

              <li className="navbar-list-item">
                <NavLink to="/list" className="navbar-link">Lista</NavLink>
              </li>

              <li className="navbar-list-item ">
                <h1>PSMAX</h1>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/" onClick={Logout} className="navbar-link">Cerrar sesión</NavLink>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/dashboard" className="navbar-link">Usuario</NavLink>
              </li>

              <li className="navbar-list-item">
                <NavLink to="/contact" className="navbar-link">Contacto</NavLink>
              </li>

            </>
          ) : (
            <>
              <li className="navbar-list-item">
                <NavLink to="/" className="navbar-link">Inicio</NavLink>
              </li>

              <li className="navbar-list-item ">
                <h1>PSMAX</h1>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/login" className="navbar-link">Iniciar sesión</NavLink>
              </li>

              <li className="navbar-list-item ">
                <NavLink to="/register" className="navbar-link">Registrarse</NavLink>
              </li>

              <li className="navbar-list-item">
                <NavLink to="/contact" className="navbar-link">Contacto</NavLink>
              </li>

            </>
          )}
        </ul>
      </nav>
    </>
  );
}


export default Navbar