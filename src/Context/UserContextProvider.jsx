import {useState, useEffect } from 'react'; 
import axios from 'axios';
import {UserContext} from './UserContext';
import Loader from '../Components/Loader/Loader';

function UserContextProvider({children}){

    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);

    const getUser=async()=>{
        const token= localStorage.getItem('userId');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try{
            const res=await axios.get(`https://localhost:7092/api/Users/${token}`);
            console.log(res.data);
            setUser(await res.data);
        }catch(e){
            console.log(e);
            const users=JSON.parse(localStorage.getItem('users')||[]);
            const searchedUser=users.find(u=> u.id===token);
            setUser(searchedUser);
        
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        getUser()
    },[])



    return (
        <UserContext.Provider value={{user,setUser,loading}}>
            {children}
        </UserContext.Provider>
    );

}
export default UserContextProvider;