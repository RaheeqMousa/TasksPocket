import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom';
function MainLayout(){
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}
export default MainLayout;
