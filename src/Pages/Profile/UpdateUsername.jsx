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

    const handleSubmit=(data)=>{
        const {username}=data;
        const newUser={
            username:username,
            password:user.password,
            email:user.email
        }
        try{
            const res= axios.put(`https://localhost:7092/api/Users/update`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            if(res.data){
                console.log("User updated successfully");
                //User username updated successfully
            }

            setUser(newUser)
        }catch(e){
            setError(e);
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