import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements}  from 'react-router-dom'
import All from './components/All.jsx'
import App from './App'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<All.SignIn/>}>
            <Route path='/SignUp' element={<All.SignUp/>}/>
            <Route path='/Chat' element={<All.Chat/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <App/>
  </React.StrictMode>,
)
