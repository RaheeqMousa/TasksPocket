import FormContainer from "../../Components/FormContainer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Style from '../../Styles/auth.module.css'
import users from '../../../users'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const [error, setError]=useState();
    const navigate=useNavigate();

    const loginSubmit=(data)=>{
        const {username, password}=data;
        console.log( username, password)
        const user= users.find((u)=>{
            console.log( u.username, u.password);
            return u.username==username && u.password==password
        });
        console.log(user);
        if(user){
            localStorage.setItem('userId',user.id);
            navigate('/user/profile')
        }else{
            setError("Invalid Email or password");
        }
    }
    return(
        <div className={`row flex-direction-column ${Style['auth-page']}`}>
            <section className={`flex flex-direction-column ${Style['form-section']}`}>   
                <h2>SignIn</h2>   
                <FormContainer onSubmit={loginSubmit} serverError={error}>
                    <LoginForm />
                </FormContainer>           
            </section> 
        </div>
    );
}
export default Login;