import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRouter = () => {
    const {userInfo} = useSelector((state)=>state.auth)
  return userInfo ? <Outlet /> : <Navigate to = '/login' replace />
}
