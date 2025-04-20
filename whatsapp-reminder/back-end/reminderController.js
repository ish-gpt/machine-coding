const dayjs = require('dayjs')
const MqService = require('./messagingQueue')
const mqService = new MqService();
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);


function setReminder(req, res) {
    let appointmentExactDateTime = dayjs(`${req.body.appointmentDate}` + ' ' + `${req.body.appointmentTime}`);
    let currentDate = dayjs();
    let reminderTime = getTimeChoosenToRemindBefore(req.body.remindeBefore);
    let timeAtWhichNotificationGoInMillsec = appointmentExactDateTime.subtract(Number(reminderTime.timeVal), reminderTime.timeUnit);
    let dateTimeAtWhichNotificationGo = dayjs(timeAtWhichNotificationGoInMillsec);
    let delay = dateTimeAtWhichNotificationGo.diff(currentDate);
    mqService.addMessageToQueue(req.body, delay);
    // console.log("------", delay);

}

function getTimeChoosenToRemindBefore(remindeBefore) {
    let splittedTime = remindeBefore.split(' ');
    switch (splittedTime[1]) {
        case 's':
            return { timeVal: Number(splittedTime[0]), timeUnit: 'second' };
        case 'mins':
            return { timeVal: Number(splittedTime[0]), timeUnit: 'minute' };
        default:
            return { timeVal: Number(splittedTime[0]), timeUnit: 'hour' };
    }
}

module.exports = {
    setReminder, getTimeChoosenToRemindBefore
}