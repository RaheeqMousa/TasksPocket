import React, { useEffect, useState } from "react";
import Style from './Alert.module.scss';

function Confirmation({message, duration = 0, onClose }) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  const style = {
    backgroundColor: "#fff3cdff",
    color: "#987200ff"
  };

  const handleClose = (choice) => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false); 
      onClose(choice);
    }, 300);
  };



  return (
    <div
      style={style}
      className={`${Style.modal}`}
    >
        <div className={`row ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
            <button className={Style['close-btn']} onClick={()=>{ handleClose(false);}}>X</button>
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
