import axios from 'axios';
const baseURL = 'http://localhost:3040'

async function post(data) {
    return new Promise((resolve,reject) => {
        axios.post(`${baseURL}/setReminder`, JSON.stringify(data), {headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
            console.log(res);
            resolve()
        }).catch((err) => {
            console.log(err);
            reject()
        })
    })
}

export default post;