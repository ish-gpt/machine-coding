import React from 'react';
import './Modal.css';

export default function Modal(props) {
    // console.log(props.togglePopup)
    let togglePopup = () => {
        props.togglePopup(popupFlag => !popupFlag);
    }
    return (
        (props.popupFlag) &&
        <>
            <div className='popup'></div>
            <div className='popup-inner'>
                <p>Hello!! this popup is opened.<br/><br/> Click close button to close ;-)</p>
                <button onClick={()=>togglePopup()}>close popup</button>
            </div>
        </>

  )
}
