
import FormContainer from "../../Components/FormContainer";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import Style from '../../Styles/auth.module.css'
import users from '../../../users'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const [serverError,setServerError]=useState("");
    const navigate=useNavigate();

    const registerSubmit=(data)=>{
        const {username,email,password}=data;
        

        const user=users.find(u=>{
            return u.username===username
        });

        console.log(user);
        if(user){
            setServerError("That username exists, use another.");
            return;
        }

        const newUser={
            id:users.length+1,
            username:username,
            email:email,
            password:password,
            tasks:[]
        }

        localStorage.setItem('userId',newUser.id);
        navigate('/user/profile');
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