import React from "react";
import Style from './Loader.module.css'

export default function Loader(){
    console.log("loading");
    return (
        <div className={`flex align-center ${Style.load}`}>
            <span className={Style.loader}></span>
        </div>
    );
}
