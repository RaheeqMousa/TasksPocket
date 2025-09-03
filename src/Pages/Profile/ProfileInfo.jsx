import Style from './Profile.module.scss'
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function ProfileInfo(){
    const {user, loading}= useContext(UserContext); //Destructing

    if(loading || !user)
        return <Loader />
    
    return (
        <div className={`row flex-direction-column ${Style['profile-info']}`}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
        </div>
    );
}
export default ProfileInfo;