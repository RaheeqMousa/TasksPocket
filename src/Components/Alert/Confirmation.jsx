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
      aria-label="Confirmation Modal" aria-describedby='confirmation-alert-message' role="dialog" aria-modal="true"
    >
      <button className={Style['close-btn']} onClick={()=>{ handleClose(false);}} aria-label="Close modal">X</button>

        <div className={`row ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}  >            
            <p id="confirmation-alert-message">{message}</p>
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
