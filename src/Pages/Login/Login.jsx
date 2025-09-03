import FormContainer from "../../Components/FormContainer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Style from '../../Styles/auth.module.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login(){
    const [error, setError]=useState();
    const navigate=useNavigate();

    const loginSubmit=async (data)=>{
        const {username, password}=data;
        try{
            const res= await axios.get('https://localhost:7092/api/Users');
            if(!res.ok) console.log("Failed to fecth user");

            const users = await res.data;
            const user= users.find((u)=>{ 
                 return u.username==username && u.password==password 
            });

            if(user){
                localStorage.setItem('userId',user.id);
                navigate('/user/profile')
            }else{
                setError("Invalid Email or password");
            }
        }catch(e){
            console.log(e);
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