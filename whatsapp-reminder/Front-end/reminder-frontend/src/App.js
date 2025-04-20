import logo from './logo.svg';
import './App.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import post  from './apiService';


function App() {
  const time = useRef(null)
  const date = useRef(null);
  const reminderTime = useRef(null);
  const isWhatsappReminderEnabled = useRef(true);
  const [buttonLoad,setButtonLoad] = useState(false)
  
  function onDateAccept(selectedDate) {
    const choosenDate = dayjs(selectedDate).format('MM/DD/YYYY');
    date.current = choosenDate
  }

  function onTimeAccept(selctedTime) {
    const choosenTime = dayjs(selctedTime).format('hh:mm A');
    time.current = choosenTime;
  }

  function setSelectedValue(selectedReminderTime) {
    reminderTime.current = selectedReminderTime
  }

  function setWhatsappReminder(ischecked) {
    isWhatsappReminderEnabled.current = ischecked
  }

  function scheduleEvent() {
    if (!date.current || !time.current || !reminderTime.current) return
    setButtonLoad(true);
    const body = {
      appointmentDate: date.current,
      appointmentTime: time.current,
      remindeBefore: reminderTime.current,
      isWhatsappReminderEnabled : isWhatsappReminderEnabled.current
    }
    post(body).then(() => {
      setTimeout(() => {
        console.log("here")
        setButtonLoad(false);
      }, 2000);
    }).catch(() => {
      setButtonLoad(false);
    });
  }
  return (
    <div className="App">
      <div>
        <h3>Set Appointment Reminder !!</h3>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Select Appointment Date" onAccept={(d) => { onDateAccept(d) }} />
            <TimePicker label="Select Appointment Time" onAccept={(d) => {onTimeAccept(d)}} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className='parent-container'>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Set Reminder Before</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel onChange={(e)=>setSelectedValue(e.target.value)} value="30 s" control={<Radio />} label="30s before Appointment" />
            <FormControlLabel onChange={(e) => setSelectedValue(e.target.value)} value="3 mins" control={<Radio />} label="3min before Appointment" />
            <FormControlLabel onChange={(e) => setSelectedValue(e.target.value)} value="12 hrs" control={<Radio />} label="12hrs before Appointment" />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <div className='schedule-event'>
            <div>
              <Button loading={buttonLoad} onClick={scheduleEvent} variant="contained">schedule</Button>
            </div>
            <div>
              <FormControlLabel checked onChange={(e) => setWhatsappReminder(e.target.checked)} required control={<Switch />} label="Set whatsapp reminder" />
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
  );
}

export default App;
