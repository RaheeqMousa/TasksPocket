import { Navigate, Outlet } from "react-router-dom";
function AuthProtectedRoute(){
    const userId= localStorage.getItem('userId');
    if(!userId){
        return <Navigate to='/auth/login' />
    }
    return <Outlet/>
}
export default AuthProtectedRoute;