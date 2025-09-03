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
        <div className={`flex align-center ${Style['carousel-wrapper']}`}>
            <div className={Style['carousel']}>
                <img src={images[current]} alt={`slide ${current}`} title={`slide ${current}`} height={300} width={500}/>
                <div className={`row ${Style.controls}`}>
                    <BsFillArrowLeftSquareFill color="white" size={30} onClick={prev} />         
                    <BsFillArrowRightSquareFill color="white" size={30} onClick={next} />
                </div>
            </div>     
        </div>
    );
}
export default Carousel;