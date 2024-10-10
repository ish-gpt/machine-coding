import './App.css';
import { useState } from 'react';
import Modal from './Modal';

function App() {
  const [popupFlag, setPopupFlag] = useState(false);
  let togglePopup = () => {
    setPopupFlag(popupFlag => !popupFlag);
  }
  return (
    <div className="App">
      <h1>React Popups</h1>
      <button onClick={()=>{togglePopup()}}>Open Popup</button>
      <Modal popupFlag={popupFlag} togglePopup={setPopupFlag} >
        {/* <h3>Popup is opened</h3> */}
      </Modal>
    </div>
  );
}

export default App;
