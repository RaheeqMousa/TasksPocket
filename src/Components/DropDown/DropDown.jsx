import React, { useCallback, useState } from 'react'
import { IoMdSettings } from "react-icons/io";
import { Container, Btn, List, Item, Empty } from './DropDown.styles';
import PropTypes from 'prop-types';

export default function DropDown(props) {

    const { items=[], Actions=[] } = props;
    const [isOpen, setIsOpen] = useState(false);

    
    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick=useCallback((index)=>
    (event)=>{
        event.preventDefault();
        if(Actions[index]) Actions[index](); // call corresponding action
        setIsOpen(false); // close dropdown after click
    },[Actions]);


    return (
        <Container className="flex flex-direction-column" >
            <Btn 
                onClick={toggleDropDown}  className='row'
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls='dropdown-menu'
                aria-label='DropDown-btn'>
                <IoMdSettings size={24} color='black'/>
            </Btn>

            {isOpen && (
                <List role='menu' id='dropdown-menu'>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <Item 
                                role='menuitem'
                                tabIndex={0}
                                key={`${item}-${index}`} 
                                danger={item === "Delete Account"? true: undefined}
                                onClick={handleItemClick(index)}
                            >
                                {item}
                            </Item>
                        ))
                    ) : (
                        <Empty>No items available</Empty>
                    )}
                </List>
            )}
        </Container>
    );
}

DropDown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ),
  Actions: PropTypes.arrayOf(PropTypes.func),
};