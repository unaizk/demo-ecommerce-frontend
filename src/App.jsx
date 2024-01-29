import './App.css'
import Header from './component/Header'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AdminHeader from './component/AdminHeader';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <>
    {isAdmin ? <AdminHeader /> : <Header /> }
    
    <ToastContainer style={{marginTop : '75px'}} />
    <Outlet />
    
    </>
  )
}

export default App
