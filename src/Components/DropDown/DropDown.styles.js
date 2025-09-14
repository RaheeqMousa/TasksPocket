import styled from 'styled-components'

export const Container= styled.div`
        position:relative;
        display:inline-block
    `;

export const Btn= styled.button`
        justifyContent: center;
        gap: 5px;
        cursor: pointer;
        background:white;
    `;

export const List= styled.ul`
        position: absolute;
            top: 100%;
            right: 0;
            border: 1px solid #ddd;
            background:#fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            width:150px;
            border-radius:20px;
    `;

export const Item= styled.li`
        padding: 10px 14px;
        cursor: pointer;
        border-radius: 20px;
        background-color: ${(props) => (props.danger ? 'red': 'transparent')};
        color: ${(props) => (props.danger ? 'white': 'black')}
    `;

export const Empty= styled.li`
        padding: 10px 14px ;
        color: #777 ;
        font-style: italic ;
    `;