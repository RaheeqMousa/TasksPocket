import {useState, useEffect, useMemo } from 'react'; 
import axios from 'axios';
import {UserContext} from './UserContext';
import Loader from '../Components/Loader/Loader';

function UserContextProvider({children}){

    const [user,setUser]= useState(null);
    const [loading,setLoading]= useState(true);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        loading
    }), [user, setUser, loading]);

    const getUser=async()=>{
        const token= localStorage.getItem('userId');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try{
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Users/${token}`);
            setUser(await res.data);
        }catch(e){
            console.log(e);
            const users=JSON.parse(localStorage.getItem('users')||'[]');
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
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );

}
export default UserContextProvider;