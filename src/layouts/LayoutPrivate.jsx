import React, { useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Dashboard from '../components/Dashboard'

const LayoutPrivate = () => {
  
  const { user } = useContext(UserContext)

  return (
    <>
      {user ? (
        <>
          <Outlet />
          <Dashboard/>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default LayoutPrivate