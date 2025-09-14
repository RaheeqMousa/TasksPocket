import Style from './Profile.module.scss'
import FormContainer from '../../Containers/FormContainer';
import UpdateUsernameForm from '../../Components/UpdateUsername/UpdateUsernameForm'
import { UserContext } from '../../Context/UserContext';
import UserContextProvider from '../../Context/UserContextProvider';
import { useContext, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import MessageAlert from '../../Components/Alert/MessageAlert';

function UpdateUsername(){
    const {user,setUser,loading}= useContext(UserContext);
    const [error,setError] = useState(null);
    const [showAlert,setShowAlert]= useState(false);


    const handleSubmit=async (data)=>{
        const {username}=data;
        const newUser={
            username:username,
            email:user.email,
            password:user.password,
        }
        try{
            const res= await axios.put(`${import.meta.env.VITE_API_BASE_URL}/Users/update/${localStorage.getItem('userId')}`,
                newUser,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if(res.status===200){
                setShowAlert(true);
            }

            setUser(newUser)
        }catch(er){
            console.log(er);
            setError('');
 
            const users=JSON.parse(localStorage.getItem("users")||'[]');
            const userId=localStorage.getItem('userId');
            const nameExist=users.find(u=>
                u.username===newUser.username
            )
            
            if(nameExist){
                setError('Name already exist');
                return;
            }

            const updatedUsers=users.map(u=>
                u.id === userId ? {...u, ...newUser}:u
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            const updatedUser = updatedUsers.find(u => u.id === userId);
            setUser(updatedUser);
            if(updatedUser){
                setShowAlert(true);
            }
        }
    }

    if(loading){
        return <Loader />
    }


    return(
        <div className={`row flex-direction-column justify-center`}>
            <section className={`flex flex-direction-column `}>   
                <h2>Update Username</h2>  
                    <FormContainer onSubmit={handleSubmit} serverError={error} initialData={user}>
                        <UpdateUsernameForm />
                    </FormContainer>
            </section>

            {showAlert &&
                <MessageAlert message="User has been updated successfully" duration={1000} type='success'/>
            }
        </div>
    );
}
export default UpdateUsername;