import React, { useState } from "react";
import Style from './Alert.module.scss';

function Confirmation({message,onClose }) {
  const [closing, setClosing] = useState(false);


  const style = {
    backgroundColor: "#fff3cdff",
    color: "#987200ff"
  };

  const handleClose = (choice) => {
    setClosing(true);
    setTimeout(() => {
      onClose(choice);
    }, 300);
  };



  return (
    <div
      style={style}
      className={`${Style.modal}`}
    >
      <button className={Style['close-btn']} onClick={()=>{ handleClose(false);}}>X</button>
        <div className={`row ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>            
            <p>{message}</p>
            <div className={`row ${Style.actions}`}>
                <button className={Style['cancel']} onClick={() => { handleClose(false);}}>
                Cancel
                </button>
                <button className={Style['confirm']} onClick={() => { handleClose(true); }}>
                Confirm
                </button>
            </div>
        </div>
    </div>
  );
}

export default Confirmation;
