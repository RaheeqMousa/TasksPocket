import PocketImg from "./pocket.png"
import Style from './Navbar.module.scss'
import {Link} from 'react-router-dom'
function Navbar(){
    return (
    <header className={`row ${Style.navbar}`}>
        <section className="row">
            <img src={PocketImg} alt="pocket image" title="pocket image" width={30} height={30}/>
            <h1>TaskPocket</h1>
        </section>
        <section className={`row ${Style.links}`}>
            <Link to="/">Home</Link>
            <Link to="/Tasks">Tasks</Link>
        </section>
        <section className={`row ${Style.auth}`}>
            <Link to="/">Login</Link>
            <Link to="/Tasks">Register</Link>
        </section>
    </header>
    );
}
export default Navbar;