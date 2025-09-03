
import FormContainer from "../../Components/FormContainer";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import Style from '../../Styles/auth.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch("https://localhost:7092/api/Users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setServerError(errorData.message || "Failed to create user");
                return;
            }

            const createdUser = await response.json();

            localStorage.setItem('userId', createdUser.id);

            navigate('/user/profile');
        } catch (error) {
            console.error("Error creating user:", error);
            setServerError("Server error, please try again later.");
        }
    }

    return(
        <div className={`row flex-direction-column ${Style['auth-page']}`}>
            <section className={`flex flex-direction-column ${Style['form-section']}`}>
                <h2>SignUp</h2>
                <FormContainer onSubmit={registerSubmit} serverError={serverError}>
                    <RegisterForm/>
                </FormContainer>
            </section>
        </div>        
    );
}
export default Register;