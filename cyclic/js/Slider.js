class Slider {
    constructor (slides, hauteur, largeur, timer) {
        this.slides = slides;
        this.indice = 0;
        this.hauteur = hauteur + "%";
        this.largeur = largeur + "%";
        this.timer = timer;
        this.slideInterval; 
        this.init();
        this.play();  
        this.flecheEvent();
    }

    init () {
        document.getElementById("image-slide").src = this.slides[this.indice].image;
        document.getElementById("texte-slide").textContent = this.slides[this.indice].texte;
        document.getElementById("texte-slide").classList.add(this.slides[this.indice].class);
    }

    play () {
        document.getElementById("pause").style.display = "block";
        document.getElementById("play").style.display = "none";
	    this.slideInterval = setInterval( () => {
            this.next();
        }, this.timer);
    }

    pause () {
        document.getElementById("pause").style.display = "none";
        document.getElementById("play").style.display = "block";
        clearInterval(this.slideInterval);
    }
    
    next () {
        this.indice++;
	    if (this.indice > this.slides.length-1) {
		this.indice = 0;
	    };
	    this.init();
    }
    
    before () {
        this.indice--;
	   if (this.indice < 0) {
		this.indice = this.slides.length-1;
	    };
	    this.init();
    }
    flecheEvent () {
        document.addEventListener("keydown", e => {
            let touche = e.keyCode;
            if (touche === 39 || touche === 37) {
                this.pause();
                if (touche === 39) {
                    this.next();
                    this.pause();
                } else if (touche === 37) {
                    this.before();
                    this.pause();
                }
            }
        });
    
        aNext.addEventListener("click", () => {
            this.next();
            this.pause();
        });
    
        aBefore.addEventListener("click", () => {
            this.before();
            this.pause();
        });
    
        pauseElt.addEventListener("click" , () => this.pause());
    
        playElt.addEventListener("click" , () => this.play());
    }

}

// Création élément slide en html
const containerSlide = document.createElement("div");
containerSlide.classList.add("container-slider");
containerSlide.id = "container-slider";

// Creation élément images 
const imageSlide = document.createElement("img");
imageSlide.classList.add("image-slide");
imageSlide.id = "image-slide";
imageSlide.alt = "Location de vélos";

// Création élément container flèche + texte
const divFleche = document.createElement("div");
divFleche.classList.add("fleche");
divFleche.id = "container-fleche";

// Création élément texte
const texteSlide = document.createElement("p");
texteSlide.classList.add("texte-slide");
texteSlide.id = "texte-slide";

// Création élément next/before
const aNext = document.createElement("a");
aNext.href = "#";
aNext.id = "next";
const nextSlide = document.createElement("i");
nextSlide.classList.add("fas", "fa-angle-right");

const aBefore = document.createElement("a");
aBefore.href = "#";
aBefore.id = "before";
const beforeSlide = document.createElement("i");
beforeSlide.classList.add("fas", "fa-angle-left");

// Création élément play/pause
const divPlay = document.createElement("div");
divPlay.classList.add("play-pause");
const playElt = document.createElement("i");
playElt.classList.add("fas", "fa-play");
playElt.id = "play";
const pauseElt = document.createElement("i");
pauseElt.classList.add("fas", "fa-pause");
pauseElt.id = "pause";

//Insertion des éléments créés dans la page
document.getElementById("container").appendChild(containerSlide);
containerSlide.append(imageSlide, divFleche, divPlay);
divFleche.append(aBefore, texteSlide, aNext);
aBefore.appendChild(beforeSlide);
aNext.appendChild(nextSlide);
divPlay.append(playElt, pauseElt);
