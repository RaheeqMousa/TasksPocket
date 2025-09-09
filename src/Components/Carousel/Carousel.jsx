import { useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import Style from './Carousel.module.css'

function Carousel({images}){
    const [current,setCurrent]= useState(0);
    

    console.log(images);
    const next=()=>{ current===images.length-1? setCurrent(0): setCurrent(current+1); console.log(current)}
    const prev=()=>{ current===0? setCurrent(images.length-1): setCurrent(current-1); console.log(current)}
    if (!images || images.length === 0) {
        return <p>No images available</p>;
    }

    return (
        <section className={`flex align-center ${Style['carousel']}`}
            role="region" aria-roledescription="carousel" aria-label="Website Features"
             >
            <div className={Style['slide']} role="group" aria-roledescription={`slide ${current+1}`} aria-label={`Slide ${current+1} of ${images.length}`}>
                <img src={images[current]} alt={`slide ${current}`} title={`slide ${current}`} 
                    height={300} width={500}
                    />
                <div className={`row ${Style.controls}`}>
                    <button onClick={prev} aria-label="Previous slide"><BsFillArrowLeftSquareFill color="white" size={30}  /></button>     
                    <button onClick={next} aria-label="Next slide"><BsFillArrowRightSquareFill color="white" size={30}  /></button>
                </div>
            </div>     
        </section>
    );
}
export default Carousel;