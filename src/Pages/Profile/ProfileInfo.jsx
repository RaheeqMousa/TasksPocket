import Style from './Profile.module.scss'
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import DropDown from '../../Components/DropDown/DropDown';
import React,{useState} from 'react';
import Confirmation from '../../Components/Alert/Confirmation';
import axios from 'axios';
import MessageAlert from '../../Components/Alert/MessageAlert';

function ProfileInfo(){
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const {user, loading}= useContext(UserContext); //Destructing
    const navigate =useNavigate();

    if(loading || !user)
        return <Loader />
    

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirmClose = async (choice) => {
        setShowConfirm(false);
        if (choice === true) {
            const res=await axios.delete(`https://localhost:7092/api/Users/delete/${localStorage.getItem('userId')}`);
            if(res.status===200){
                setShowAlert(true);
            }
            localStorage.removeItem("userId");
            navigate("/auth/login", { state: { alert: "Your account has been deleted successfully" } });
        }
    };
    
    return (
        <div className={`row flex-direction-column ${Style['profile-info']}`}>
            <div className={`row ${Style['settings']}`}>
                <div className={`row ${Style['select-wrapper']}`}>
                    <DropDown items={["Delete Account"]} Actions={[handleDelete]} />
                </div>
            </div>
            
            <div className={`row flex-direction-column`}>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
            </div>

            {showConfirm &&
                <Confirmation message='Are you really sure you want to delete your account?' onClose={handleConfirmClose} />
            }
            {showAlert &&
                <MessageAlert message='Your account has been deleted successfully' onClose={handleConfirmClose} type='success' />
            }
        </div>
    );
}
export default ProfileInfo;