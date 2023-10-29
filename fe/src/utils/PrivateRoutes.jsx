import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    console.log('private', token)
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes