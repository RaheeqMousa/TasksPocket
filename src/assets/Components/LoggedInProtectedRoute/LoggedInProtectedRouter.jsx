import {Navigate} from 'react-router-dom'
function LoggedInProtectedRouter(){
    const userId=localStorage.getItem('userId');
    if(userId){
        return <Navigate to='/user/profile' />
    }

}
export default LoggedInProtectedRouter;