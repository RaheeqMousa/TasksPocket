import {Navigate} from 'react-router-dom'
function LoggedInProtectedRouter({children}){
    const userId=localStorage.getItem('userId');
    if(userId){
        return <Navigate to='/user/profile' />
    }
    return children
}
export default LoggedInProtectedRouter;