import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Home from "./pages/Home.jsx"
import Cart from "./pages/Cart.jsx"
import Books from "./pages/Books.jsx"
import Login from "./pages/Login.jsx"
import Payment from "./pages/Payment.jsx"
import Registration from './pages/Registration.jsx'
import Sell from './pages/Sell.jsx'
import Show from "./pages/Show.jsx"
import Signup from './pages/Signup.jsx'

import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom"




const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
     <Route index element={<Home/>}></Route>
     <Route path="books" >
        <Route index element={<Books/>}></Route>
        <Route path="show/:id" element={<Show/>}></Route>

     </Route>
     <Route path="seller" element={<Registration/>}></Route>
     <Route path="cart" >
        <Route index element={<Cart/>}></Route>
        <Route path="payment" element={<Payment/>}> </Route>
     </Route>
     <Route path="login" element={<Login/>}></Route>
     <Route path="signup" element={<Signup/>}></Route>

    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
