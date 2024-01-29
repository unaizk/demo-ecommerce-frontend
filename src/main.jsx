import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './index.css'
import UserHomeScreen from './screens/UserHomeScreen.jsx'
import LoginScreen from './screens/LoginScren.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import store from './store.js';
import { PrivateRouter } from './component/PrivateRouter.jsx'
import {Provider} from 'react-redux'
import CartScreen from './screens/CartScreen.jsx'
import AdminHomeScreen from './screens/AdminHomeScreen.jsx'
import { AdminPrivateRouter } from './component/AdminPrivateRouter.jsx'
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import AddProductScreen from './screens/AddProductScreen.jsx'
import EditProductScreen from './screens/EditProductScreen.jsx'
import AdminRegisterScreen from './screens/AdminRegisterScreen.jsx'
import ProductDetailPage from './screens/ProductDetailPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />} >
      {/*================================= user route handler========================================== */}
      <Route index={true} path='/' element={<UserHomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/productDetail' element={<ProductDetailPage />} />
      {/*================================= Private Router========================================== */}
      <Route path="" element = {<PrivateRouter />}>
        <Route path="/cart" element={<CartScreen />} /> 
      </Route>

      {/*================================= admin route handler========================================== */}
      <Route path="" element = {<AdminPrivateRouter />}>
          <Route index={true} path="/admin" element={<AdminHomeScreen />} />
          <Route path="/admin/addProduct" element={<AddProductScreen />} />
          <Route path="/admin/editProduct" element={<EditProductScreen />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route path="/admin/register" element={<AdminRegisterScreen />} />
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
