class Timer{
    constructor(minutes, secondes) {
        this.minutes = minutes;
        this.secondes = secondes;
        this.status = false;
        this.decompteOn;
        this.decompte();
    }

    init() {
        this.decompteOn = setInterval( () => {
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("secondes", this.secondes);
            this.decompte();
        }, 1000);
        this.status = true;
    }
    
    decompte() {
        if (this.minutes === 0 && this.secondes === 0) {
            this.stop();
            sessionStorage.clear();
        } else {
	    if (this.secondes <= 1 && this.minutes !== 0){
                this.secondes = 60;
                this.secondes--;
                this.minutes--;
                
            } else { 
                this.secondes--;    
            }
        }
    }

    stop() {
        clearInterval(this.decompteOn);
        this.status = false;
    }
  }

 
