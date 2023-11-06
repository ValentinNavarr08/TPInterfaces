class Timer {
    constructor(callback, duration) {
        this.callback = callback;
        this.duration = duration * 1000; // Duración en milisegundos
        this.startTime = 0;
        this.timerInterval = null;
    }

    //comienza el timer 
    start() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.update(), 100);
    }
    //para el timer 
    stop() {
        clearInterval(this.timerInterval);
    }

    //refresca el timer 
    update() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(this.duration - elapsedTime, 0);
        if (this.callback) {
            this.callback(remainingTime);
        }

        if (remainingTime <= 0) {
            this.stop();
            if (this.callback) {
                this.callback(0);
            }
        }
    }
}

