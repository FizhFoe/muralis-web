import { RouterProvider } from 'react-router'
import { router } from './router'
// import { useState } from 'react'

export default function App(){
  // const [token, setToken] = useState();
  return <RouterProvider router={ router } />
}