import React, { useEffect, useState } from "react";
import Style from './Alert.module.scss';

function MessageAlert({ message, type = "info", duration = 5000 }) {
    console.log(message)
    const [visible,isVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => isVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if(!visible) return;

    const backgroundColors = {
        success: "#b9f3c7ff",
        error: "#f5daddff",
        info: "white",
        warning: "#fff3cdff",
    };

    const textColors = {
        success: "#314035ff",
        error: "#4f1c22ff",
        info: "blue",
        warning: "#987200ff",
    };


    return (

        <div
            style={{
                backgroundColor: backgroundColors[type] || "white",
                color: textColors[type] || "black",
            }}
            className={`${Style.modal}`}
        >   
        <button className={Style['close-btn']} onClick={() => { isVisible(false); }}>X</button>
            <div className={`row ${Style['modal-content']} ${visible ? Style.show : Style.hide}`}>    
                <p>{message}</p>
            </div>
        </div>

    );
}
export default MessageAlert;