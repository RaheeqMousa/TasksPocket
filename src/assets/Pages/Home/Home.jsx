import Carousel from "../../Components/Carousel/Carousel";

function Home(){
    const images=[["https://tse1.mm.bing.net/th/id/OIP.TC-k8_bTRSHHkTNWTuJaGAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        "https://hips.hearstapps.com/hmg-prod/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg"]];
        
   return <Carousel images={images} />
}
export default Home;