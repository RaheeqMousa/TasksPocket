
import FormContainer from "../../Containers/FormContainer";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const registerSubmit = async (data) => {
        const { username, email, password } = data;

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
            setServerError("");

            const fallbackId = `local-${Date.now()}`;
            const users = JSON.parse(localStorage.getItem("users") || "[]");

            if (users.some((u) => u.username === newUser.username)) {
                setServerError("Username already taken");
                return;
            }

            const newLocalUser = { ...newUser, id: fallbackId };
            users.push(newLocalUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("userId", fallbackId);

            if (users.some((u) => u.id === fallbackId)) {
                navigate("/user/profile");
            }
        }
    }

    return (
        <div className={`row flex-direction-column auth-page`}>
            <section className={`flex flex-direction-column form-section`}>
                <h2>SignUp</h2>
                <FormContainer onSubmit={registerSubmit} serverError={serverError} >
                    <RegisterForm />
                </FormContainer>
            </section>
        </div>
    );
}
export default Register;