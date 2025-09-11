import FormContainer from "../../Containers/FormContainer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useContext } from "react";
import {UserContext} from "../../Context/UserContext";
import MessageAlert from "../../Components/Alert/MessageAlert";

function Login(){
    const [error, setError]=useState();
    const [loading, setLoading] = useState(false) 
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage,setAlertMessage]=useState(""); 

    const location = useLocation();
    const navigate=useNavigate();
    const {setUser}= useContext(UserContext); //Destructing

    const loginSubmit=async (data)=>{
        setLoading(true);
        const {username, password}=data;
        try{
            const res= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Users`);

            console.log(`${import.meta.env.VITE_API_BASE_URL}/Users`);
            const users = res.data;
            console.log(users)
            const user= users.find((u)=>{ 
                 return u.username===username && u.password===password 
            });

            if(user){
                localStorage.setItem('userId',user.id);
                setUser(user);
                navigate('/user/profile')
            }else{
                setError("Invalid Username or password");
            }
            
        }catch(er){
            console.log(er);

            let persons= JSON.parse(localStorage.getItem('users'))||[];
            if(!Array.isArray(persons)){
                persons=[persons];
            }
            const user= persons.find((u)=>{
                return u.username===username && u.password===password }
            );
            if(user){
                localStorage.setItem('userId',user.id);
                setUser(user);
                navigate('/user/profile')
            }else{
                setError("Invalid Username or password");
            }
        }finally{
            setLoading(false);
        }
    }


  useEffect(() => {
    if (location.state?.alert) {
      setAlertMessage(location.state.alert);
      setShowAlert(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

    if(loading){
        return <Loader />
    }

    return(
        <>
            {showAlert && <MessageAlert type="success" message={alertMessage} duration={2000} /> }
            <div className={`row flex-direction-column auth-page`}>
                <section className={`flex flex-direction-column form-section`}>   
                    <h2>SignIn</h2>   
                    <FormContainer onSubmit={loginSubmit} serverError={error} initialData={null}>
                        <LoginForm />
                    </FormContainer>           
                </section> 
            </div>
        </>
    );
}
export default Login;