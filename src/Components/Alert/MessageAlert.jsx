import React, { useEffect, useState } from "react";
import Style from './Alert.module.scss';
import {backgroundColors, textColors} from './constants.js'

function MessageAlert({ message, type = "info", duration = 5000 }) {

    const [visible,setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if(!visible) return null;



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
        <button className={Style['close-btn']} onClick={() => { setVisible(false); }} aria-label="Close modal" >X</button>
            <div className={`row ${Style['modal-content']} ${visible ? Style.show : Style.hide}`}>    
                <p id="alert-message">{message}</p>
            </div>
        </div>

    );
}
export default MessageAlert;