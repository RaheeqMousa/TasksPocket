
import FormContainer from "../../Containers/FormContainer";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import Style from '../../Styles/auth.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register(){
    const [serverError,setServerError]=useState("");
    const navigate=useNavigate();

    const registerSubmit=async (data)=>{
        const {username,email,password}=data;

        const newUser = {
            username: username,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(
                "https://localhost:7092/api/Users/create",
                newUser,
                {
                    headers: {
                    "Content-Type": "application/json"
                    }
                }
            )


            const createdUser = await response.data;

            localStorage.setItem('userId', createdUser.id);

            navigate('/user/profile');
        } catch (er) {
            console.error("Error creating user:", er);
            const message =
                er.response && er.response.data && er.response.data.message
                ? er.response.data.message
                : er.message || "Unexpected error";

            setServerError(message);
            
        }
    }

    return(
        <div className={`row flex-direction-column ${Style['auth-page']}`}>
            <section className={`flex flex-direction-column ${Style['form-section']}`}>
                <h2>SignUp</h2>
                <FormContainer onSubmit={registerSubmit} serverError={serverError} >
                    <RegisterForm/>
                </FormContainer>
            </section>
        </div>        
    );
}
export default Register;