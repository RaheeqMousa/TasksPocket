import React, { useCallback, useState } from 'react'
import { IoMdSettings } from "react-icons/io";

export default function DropDown(props) {

    const { items=[], Actions=[] } = props;
    const [isOpen, setIsOpen] = useState(false);

    
    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const styles = {
        container:{
            position: "relative",
            display: "inline-block", 
        },
        btn: {
            justifyContent: "center",
            gap: "5px",
            cursor: "pointer",
            background:"white"
        },
        list: {
            position: "absolute",
            top: "100%",
            right: "0",
            border: "1px solid #ddd",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            width:"150px",
            borderRadius:"20px"
        },
        item: {
            padding: "10px 14px",
            cursor: "pointer",
            borderRadius:"20px"
        },
        empty: {
            padding: "10px 14px",
            color: "#777",
            fontStyle: "italic"
        }
    };


    

    const handleItemClick=useCallback((index)=>{
        if(Actions[index]) Actions[index](); // call corresponding action
        setIsOpen(false); // close dropdown after click
    },[Actions]);


    return (
        <div className="flex flex-direction-column" style={styles.container} >
            <button 
                onClick={toggleDropDown}  className='row'
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls='dropdown-menu'
                style={styles.btn}
                aria-label='DropDown-btn'>
                <IoMdSettings size={24} color='black'/>
            </button>

            {isOpen && (
                <ul style={styles.list} role='menu' id='dropdown-menu'>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <li 
                                role='menuitem'
                                tabIndex={0}
                                key={`${item}-${index}`} 
                                style={item === "Delete Account" ? {...styles.item, color:"white", backgroundColor:"red"}: styles.item}
                                onClick={handleItemClick}
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <li>No items available</li>
                    )}
                </ul>
            )}
        </div>
    );
}
