import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AdminPrivateRouter = () => {
    const {adminInfo} = useSelector((state)=>state.adminAuth)
  return adminInfo ? <Outlet /> : <Navigate to = '/admin/login' replace />
}