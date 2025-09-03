import { useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import Style from './Carousel.module.css'

function Carousel({images}){
    const [current,setCurrent]= useState(0);

    const next=()=> current<images.length-1? setCurrent(current+1): setCurrent(0);
    const prev=()=> current>0? setCurrent(current-1): setCurrent(images.length-1);

    return (
        <div className={`flex align-center ${Style['carousel-wrapper']}`}>
            <div className={Style['carousel']}>
                <img src={images[current]} alt={`slide ${current}`} title={`slide ${current}`} height={300} width={500}/>
                <div className={`row ${Style.controls}`}>
                    <BsFillArrowLeftSquareFill color="black" size={30} onClick={prev} />         
                    <BsFillArrowRightSquareFill color="black" size={30} onClick={next} />
                </div>
            </div>     
        </div>
    );
}
export default Carousel;