import React, { useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";

export default function DropDown({ items=[], Actions=[] }) {
    const [isOpen, setIsOpen] = useState(false);

    console.log();
    
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


    return (
        <div className="flex flex-direction-column" style={styles.container}>
            <button 
                onClick={toggleDropDown}  className='row'
                style={styles.btn}>
                <span><IoMdSettings size={24} color='black'/></span>
            </button>

            {isOpen && (
                <ul style={styles.list}>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <li 
                                key={index} 
                                style={item === "Delete Account" ? {...styles.item, color:"white", backgroundColor:"red"}: styles.item}
                                onClick={() => {
                                    if(Actions[index]) Actions[index](); // call corresponding action
                                    setIsOpen(false); // close dropdown after click
                                }}
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
