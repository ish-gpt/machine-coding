const { delay, Queue, Worker } = require('bullmq');
const sendMessage = require('./sendMessage');

class MqService {
    worker;
    queue;
    constructor() {
        this.counter = 1;
        this.queue = new Queue('WhatappRemQueue')
        this.worker = new Worker('WhatappRemQueue', async (job) => {
            await sendMessage.sendMessage(job.data);
        }, {
            connection: {
                host: 'localhost',
                port: 6379,
            }
        })
    }


    addMessageToQueue(msg, delay) {
        console.log("------", msg,delay);
        this.queue.add(`reminder-${this.counter}`, msg, { delay: delay });
        this.counter++;
    }

}

module.exports = MqService;