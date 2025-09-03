import Carousel from "../../Components/Carousel/Carousel";
import FeatureCard from "../../Components/FeatureCard/FeatureCard";
import { GrSecure } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import TaskImg from '../../assets/Images/TasksBoard.webp'
import Style from './Home.module.scss'
function Home(){
    
    const images=["https://tse1.mm.bing.net/th/id/OIP.TC-k8_bTRSHHkTNWTuJaGAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://hips.hearstapps.com/hmg-prod/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.IIhY17jhCesbLBh1DlyA-QHaG4?rs=1&pid=ImgDetMain&o=7&rm=3"];

    let features= [
        {
            icon:<MdManageAccounts size={50} color="white"/>,
            desc:"Easy Management System",
        },
        {
            icon: <GrSecure size={50} color="white"/>,
            desc:"Secure system",
        },
    ];
        
   return( 
        <>
            <Carousel images={images} />
            <FeatureCard features={features} />
            <div className={`row ${Style.goal}`}>
                <img src={TaskImg} width={500} height={300} alt="Tasks board" title="Tasks board"/>
                <span>
                    Our system is designed to solve your problems of disorganization and distraction in a comfortable and safe way.                
                </span>
            </div>
        </>
    );
   
}
export default Home;