import Style from './Profile.module.scss'
import FormContainer from '../../Components/FormContainer';
import UpdateUsernameForm from '../../Components/UpdateUsername/UpdateUsernameForm'
import { UserContext } from '../../Context/UserContext';
import UserContextProvider from '../../Context/userContextProvider';
import { useContext, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';

function UpdateUsername(){
    const {user,setUser,loading}= useContext(UserContext);
    const [error,setError] = useState(null);

    const handleSubmit=async (data)=>{
        const {username}=data;
        const newUser={
            username:username,
            email:user.email,
            password:user.password,
        }
        try{
            const res= await axios.put(`https://localhost:7092/api/Users/update/${localStorage.getItem('userId')}`,
                newUser,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(res);
            if(await res){
                alert("User's username updated successfully.")
            }

            setUser(newUser)
        }catch(er){
            const message =
                er.response && er.response.data && er.response.data.message
                ? er.response.data.message
                : er.message || "Unexpected error";

            setError(message);
        }
    }

    if(loading){
        return <Loader />
    }


    return(
        <div className={`row flex-direction-column justify-center`}>
            <section className={`flex flex-direction-column `}>   
                <h2>Update Username</h2>  
                    <FormContainer onSubmit={handleSubmit} serverError={error}>
                        <UpdateUsernameForm />
                    </FormContainer>
            </section>
        </div>
    );
}
export default UpdateUsername;