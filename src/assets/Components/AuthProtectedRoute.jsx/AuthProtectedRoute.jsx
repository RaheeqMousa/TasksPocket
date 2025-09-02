import { Navigate } from "react-router-dom";
function AuthProtectedRoute({children}){
    const userId= localStorage.getItem('userId');
    if(!userId){
        return <Navigate to='/auth/login' />
    }
    return children;
}
export default AuthProtectedRoute;