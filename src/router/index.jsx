import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import List from '../pages/List'
import LayoutRoot from '../layouts/LayoutRoot'
import Login from '../pages/Login'
import Error from '../pages/Error'
import LayoutPrivate from '../layouts/LayoutPrivate'
import Navbar from '../components/Navbar'
import Contacto from '../pages/Contacto'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleArrowLeft);

export const router = createBrowserRouter([
  {
    path:"/",
      element: <LayoutRoot/>,
      errorElement: <Error />,
      children: [
        {
          errorElement: <Error />,
          children: [
          {
            index:true,
            element: <Home/>,
          },
          {
            path:"/login",
            element: <Login/>,
          },
          {
            path:"/register",
            element: <Register/>,
            
          },
          {
            path:"/list",
            element: <List/>,
            
          },
          {
            path:"/contact",
            element: <Contacto/>,
            
          },
          {
            path: "/:id",
            
            
          }
        ]
      }
    ]
},
{
  path:"/dashboard",
  element:<LayoutPrivate></LayoutPrivate>,
  children:[
    {
      index:true,
      element:<Navbar/>
    },
    
  ]
  
}

])