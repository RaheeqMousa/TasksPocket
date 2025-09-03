import React from "react";
import Style from './Loader.module.css'

export default function Loader(){
    console.log("loading");
    return (
        <div className={`row ${Style.load}`}>
            <span className={Style.loader}></span>
        </div>
    );
}
