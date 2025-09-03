import FormContainer from "../../Components/FormContainer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Style from '../../Styles/auth.module.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useContext } from "react";
import {UserContext} from "../../Context/UserContext";

function Login(){
    const [error, setError]=useState();
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate();
    const {setUser}= useContext(UserContext); //Destructing

    const loginSubmit=async (data)=>{
        setLoading(true);
        const {username, password}=data;
        try{
            const res= await axios.get('https://localhost:7092/api/Users');

            const users = await res.data;
            const user= users.find((u)=>{ 
                 return u.username==username && u.password==password 
            });

            if(user){
                localStorage.setItem('userId',user.id);
                setUser(user);
                navigate('/user/profile')
            }else{
                setError("Invalid Email or password");
            }

        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    if(loading){
        return <Loader />
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