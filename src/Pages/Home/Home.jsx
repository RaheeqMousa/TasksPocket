import Carousel from "../../Components/Carousel/Carousel";
import FeatureCard from "../../Components/FeatureCard/FeatureCard";
import { GrSecure } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import TaskImg from '../../assets/Images/TasksScribble.png'
import Style from './Home.module.scss'
import TaskManagement from '../../assets/Images/TaskManagement.png';
import SaveTime from '../../assets/Images/SaveTime.png';

function Home(){
    
    const images = [TaskManagement, SaveTime];

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
        <div className="container">
            <Carousel images={images} />
            <FeatureCard features={features} />
            <section className={`row justify-center ${Style.goal}`}>
                <img src={TaskImg} width={500} height={300} alt="Tasks board" title="Tasks board"/>
                <span>
                    Our system is designed to solve your problems of disorganization and distraction in a comfortable and safe way.                
                </span>
            </section>
        </div>
    );
   
}
export default Home;