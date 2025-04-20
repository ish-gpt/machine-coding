
const express = require('express');
const cors = require('cors');
const app = express();
const { setReminder } = require('./reminderController');
require('dotenv').config();

const port = 3040;


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 


app.use(cors(
    {
        origin: '*',  // Your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/setReminder', (req, res) => {
    setReminder(req,res);
    res.send('post listened')
})

app.listen(port, () => {
    console.log('whatsapp:' + process.env.twilioPhoneNumber);
    console.log(`Example app listening on port ${port}`)
})