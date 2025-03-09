class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.taskSchlrLength = 0;
        this.taskSchlrArr = [];
    }

    getTaskToExec() {
        return this.taskSchlrArr.shift();
    }

    async addTask(task) {
        try {

            if (this.taskSchlrLength < this.concurrency) {
                this.taskSchlrLength++;
                let res = await task();
                this.taskSchlrLength -= 1;
                console.log(res, "- Done");
            } else {
                this.taskSchlrArr.push(task);
            }
        } catch (err) {
            console.log("Error - ", err);
        } finally {
            if (this.taskSchlrArr.length && this.taskSchlrLength < this.concurrency) {
                let taskToExecute = this.getTaskToExec();
                this.addTask(taskToExecute);
            }
        }
    }
}

let tScheduler = new TaskScheduler(1);



function addTaskBar() {
    let limit = document.getElementById('concurrency-limit').value;
    if (!Number(limit)) {
        alert('Add Limit First');
        return;
    }

    let tScheduler = new TaskScheduler(Number(limit));
    let element = document.getElementById('progress-bars');

    tScheduler.addTask(
        function task() {
            let bar = document.createElement('div');

            bar.style.marginTop = '12px';
            bar.style.height = '12px';
            bar.style.backgroundColor = 'blue';
            bar.style.animation = `expandWidth 5s linear forwards`;
            element.appendChild(bar);
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res('Task-1');
                }, 5000);
            })
        }
    );

    tScheduler.addTask(
        function task() {
            let bar = document.createElement('div');

            bar.style.marginTop = '12px';
            bar.style.height = '12px';
            bar.style.backgroundColor = 'blue';
            bar.style.animation = `expandWidth 4s linear forwards`;
            element.appendChild(bar);
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res('Task-2');
                }, 4000);
            })
        }
    );

    tScheduler.addTask(
        function task() {
            let bar = document.createElement('div');

            bar.style.marginTop = '12px';
            bar.style.height = '12px';
            bar.style.backgroundColor = 'blue';
            bar.style.animation = `expandWidth 15s linear forwards`;
            element.appendChild(bar);
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res('Task-3');
                }, 15000);
            })
        }
    );


    tScheduler.addTask(function task() {
        let bar = document.createElement('div');

        bar.style.marginTop = '12px';
        bar.style.height = '12px';
        bar.style.backgroundColor = 'blue';
        bar.style.animation = `expandWidth 0.5s linear forwards`;
        element.appendChild(bar);
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('Task-4');
            }, 500);
        })
    });


    tScheduler.addTask(function task() {
        let bar = document.createElement('div');

        bar.style.marginTop = '12px';
        bar.style.height = '12px';
        bar.style.backgroundColor = 'blue';
        bar.style.animation = `expandWidth 2s linear forwards`;
        element.appendChild(bar);
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('Task-5');
            }, 2000);
        })
    });


    tScheduler.addTask(function task() {
        let bar = document.createElement('div');

        bar.style.marginTop = '12px';
        bar.style.height = '12px';
        bar.style.backgroundColor = 'blue';
        bar.style.animation = `expandWidth 3s linear forwards`;
        element.appendChild(bar);
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('Task-6');
            }, 3000);
        })
    });

    

}


