
import Style from './Navbar.module.scss'
import {Link} from 'react-router-dom'
import {FaUser} from "react-icons/fa";

function Navbar(){
    return (
    <header className={`row ${Style.navbar}`}>
        <div className="row">
            <img src="../../public/pocket.png" alt="pocket image" title="pocket image" width={30} height={30}/>
            <h1>TaskPocket</h1>
        </div>
        <ul className={`row ${Style.links}`} aria-label="Main navigation links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user/tasks">Tasks</Link></li>
        </ul>
        <ul className={`row ${Style.auth}`} aria-label="Authentication nagivation links">
            <li><Link to='/user/profile' aria-label="Profile link" ><FaUser size={20} color="black" /></Link></li>
            <li><Link to="/auth/login">Login</Link></li>
            <li><Link to="/auth/register">Register</Link></li>
        </ul>
    </header>
    );
}
export default Navbar;