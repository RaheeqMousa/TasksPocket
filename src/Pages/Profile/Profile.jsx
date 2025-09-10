import { useContext, useState } from "react";
import {UserContext} from "../../Context/UserContext";
import Loader from "../../Components/Loader/Loader";
import Style from './Profile.module.scss'
import { Link, Outlet } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiCollapse } from 'react-icons/bi';
import { BsArrowsFullscreen } from 'react-icons/bs';

function Profile(){

    const {user, setUser, loading}= useContext(UserContext); //Destructing
    const [showSidebar,setShowSidebar]= useState(true);

    const toggle=()=>{
        setShowSidebar(!showSidebar);
    }



    const navigate=useNavigate();
    
    const handleSubmit=()=>{
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/auth/login');
    }

    if(loading || !user)
        return <Loader />
    
    return(
        <section className={`${Style['profile-layout']}`}>
            <aside className={`flex flex-direction-column ${showSidebar? Style.opened: Style.closed}`} >
                {showSidebar? <BiCollapse size={20} color="#8398A0" onClick={toggle} />:
                    <BsArrowsFullscreen size={20} color="#8398A0" onClick={toggle} />
                }
                <div className={`row ${Style.link}`}>
                    <FaInfo size={22} color="#8398A0"/>
                    <Link to="/user/profile/ProfileInfo">Profile Info</Link>
                </div>
                <div className={`row ${Style.link}`}>
                    <MdModeEditOutline size={22} color="#8398A0"/>
                    <Link to="/user/profile/UpdateUsername" >Update username</Link>
                </div>
                <button onClick={handleSubmit}>Logout</button>
            </aside>

            <Outlet/>

        </section>
    );
}
export default Profile;