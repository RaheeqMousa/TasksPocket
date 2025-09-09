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
            role="modal"
            aria-label="Message Alert"
            aria-describedby='alert-message'
            aria-modal='true'
        >   
        <button className={Style['close-btn']} onClick={() => { isVisible(false); }} aria-label="Close modal" >X</button>
            <div className={`row ${Style['modal-content']} ${visible ? Style.show : Style.hide}`}>    
                <p id="alert-message">{message}</p>
            </div>
        </div>

    );
}
export default MessageAlert;