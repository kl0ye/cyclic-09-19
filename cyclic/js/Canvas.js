class Canvas {
    constructor(largeur, hauteur, couleur, epaisseur) {
        this.canvas = document.getElementById("sign");
        this.largeur = largeur + "px";
        this.hauteur = hauteur + "px";
        this.context = this.canvas.getContext("2d");
        this.context.strokeStyle = couleur;
        this.context.lineWidth = epaisseur;
        this.draw = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.checkSign = false;
        this.mousePosition();
    }

    start(e, isMobile) {
      const pageX = isMobile ? e.touches[0].pageX : e.pageX;
      const pageY = isMobile ? e.touches[0].pageY : e.pageY;
      this.mouseX = pageX - this.canvas.offsetLeft;
      this.mouseY = pageY - this.canvas.offsetTop;
      this.draw = true;
    }

    move(e, isMobile) {
      if (this.draw) {
        e.preventDefault();
        const pageX = isMobile ? e.touches[0].pageX : e.pageX;
        const pageY = isMobile ? e.touches[0].pageY : e.pageY;
        this.drawLine(this.mouseX, this.mouseY, pageX - this.canvas.offsetLeft, pageY - this.canvas.offsetTop);
        this.mouseX = pageX - this.canvas.offsetLeft;
        this.mouseY = pageY - this.canvas.offsetTop;
      }
    }

    end(e, isMobile) {
      if (this.draw) {
        const pageX = isMobile ? null : e.pageX;
        const pageY = isMobile ? null : e.pageY;
        this.mouseX = 0;
        this.mouseY = 0;
        this.draw = false;
      }
    }

    mousePosition() {
      this.canvas.addEventListener("mousedown", e => this.start(e, false));
      this.canvas.addEventListener("mousemove", e => this.move(e, false));
      this.canvas.addEventListener("mouseup", e => this.end(e, false));
      this.canvas.addEventListener("touchstart", e => this.start(e, true));
      this.canvas.addEventListener("touchmove", e => this.move(e, true));
      this.canvas.addEventListener("touchend", e => this.end(e, true));
    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
        this.checkSign = true;
    }

    clear(largeur,hauteur) {
      this.context.clearRect(0, 0, largeur, hauteur);
      this.checkSign = false;
    }
}
