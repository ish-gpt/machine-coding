require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;


async function sendMessage(details) {
    const client = require('twilio')(accountSid, authToken);

    return new Promise((resolve, reject) => {
        client.messages
            .create({
                body: `Hi Your appointment is scheduled at ${details.appointmentDate} at ${details.appointmentTime}`,
                to: 'whatsapp:' + process.env.myRegisteredNumber, // Text your number
                from: 'whatsapp:'+process.env.twilioPhoneNumber, // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid);
                resolve();
            }).catch((error) => {
                reject(); //put proper error msg
            });
 
    });
}

module.exports = {
    sendMessage
}