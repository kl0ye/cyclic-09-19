let slides = [
	{
	    image: "images-cyclic/1p.jpg",
		texte: "Séléctionnez la station la plus proche de vous",
		class: "select"
	},
	{
	    image: "images-cyclic/2p.jpg",
		texte: "Consultez le nombre de vélos disponibles en temps réel",
		class: "consult"
	},
	{
	    image: "images-cyclic/33p.jpg",
		texte: "Réservez un vélo facilement et gratuitement en ligne",
		class: "reserve"
	},
	{
	    image: "images-cyclic/4.jpg",
		texte: "Rendez vous à la station dans les 20 minutes qui suivent votre réservation",
		class: "goStation"
	},
	{
	    image: "images-cyclic/55p.jpg",
		texte: "Retirez votre velo et cyclez",
		class: "takeBike"
	}
];

// Création du diapo à partir du tableau slides
const sliderCyclic = new Slider(slides, 350, 100, 5000)

imageSlide.style.width = sliderCyclic.largeur;
imageSlide.style.height = sliderCyclic.hauteur;
//------------------------------------------------------------------------------------------------------//
// Creation timer cyclic element
let timerCyclic = new Timer(20, 00);
if (sessionStorage.minutes >= 00 && sessionStorage.secondes >= 00) {
	timerCyclic = new Timer(sessionStorage.minutes, sessionStorage.secondes);
}

//------------------------------------------------------------------------------------------------------//
// Creation canvas cyclic element
const canvasCyclic = new Canvas(250, 150, "black", 1);

canvasCyclic.canvas.style.width = canvasCyclic.largeur;
canvasCyclic.canvas.style.height = canvasCyclic.hauteur;

document.getElementById("clear").addEventListener("click", function () {
	event.preventDefault();
	canvasCyclic.clear(250, 150);
});

//------------------------------------------------------------------------------------------------------//
// Creation map
// Icon Marquer Leaflet

const LeafIcon = L.Icon.extend({
    options: {
		iconSize: [50, 45],
		iconAnchor: [20, 40], 
		popupAnchor: [5, -42]
    }
});

// Générer une map avec Leaflet

const LeafletMap = {
	rouen: [49.437489866065405, 1.096252291204278],
	init() {
	    const southWest = L.latLng(49.393107, 0.969266);
    	const northEast = L.latLng(49.487021, 1.215781);
    	const mybounds = L.latLngBounds(southWest, northEast);

	    map = L.map("maps").setView(this.rouen, 14);
		
	    let Hydda_Full = L.tileLayer("https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png", {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        	bounds: mybounds,
            minZoom: 13,
            maxZoom: 18
	    }).addTo(map);
            //OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	    map.setMaxBounds(mybounds)
	}
}

//------------------------------------------------------------------------------------------------------//

// JCDecaux
let markerCyclic;

const JCDecaux = {
    affichage() {
	const url = "https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey=e4e44b28468f4be4967bbe6be024cd528d6a83a9";
	ajaxGet(url, reponse => {
	    let apiJCD = JSON.parse(reponse);
	    apiJCD.map(station => {
			markerCyclic = new MarkerMap(station);
	    });	
	});
    }
}

// Afficher map et les marqueurs 
LeafletMap.init();
JCDecaux.affichage();

// Générer des nouveaux icons
const redIcon = new LeafIcon({iconUrl: "./map-marker/map-marker-logo-red.png"});
const greyIcon = new LeafIcon({iconUrl: "./map-marker/map-marker-logo-grey.png"});
const whiteIcon = new LeafIcon({iconUrl: "./map-marker/map-marker-logo-white.png"});
const greenIcon = new LeafIcon({iconUrl: "./map-marker/map-marker-logo-green.png"});

// Creation reservation 
let resaCyclic = new Reservation;
document.getElementById("send").addEventListener("click", () => {
    if (canvasCyclic.checkSign) {
		canvasCyclic.clear(250, 150);
    }
    resaCyclic.step1()
});
document.getElementById("cancel").addEventListener("click", () => {
    resaCyclic.cancel()
    if (canvasCyclic.checkSign) {
		canvasCyclic.clear(250, 150);
	}
	document.querySelector(".required").style.fontWeight = "normal";
});
function afficherResaInfo() {
    document.getElementById("infos-block").style.backgroundColor = "#e7f4ff";
    timerCyclic.init();
    let affichageTime = setInterval(function () {
	document.getElementById("minutes").textContent = sessionStorage.getItem("minutes");
	document.getElementById("secondes").textContent = sessionStorage.getItem("secondes");	
	if (timerCyclic.minutes === 0 && timerCyclic.secondes === 0) {
		clearInterval(affichageTime);
		document.getElementById("infos-block").style.backgroundColor = "#fdcccc";
	    document.getElementById("info-resa").textContent = "Aucune réservation en cours";
		document.getElementById("temps-resa").textContent = "Le temps est écoulé.. Veuillez effectuer une nouvelle reservation.";
		markerCyclic.removeResaIcon();
	}
    },1000);
};
document.getElementById("submit").addEventListener("click", () => {
    if (canvasCyclic.checkSign) {
		resaCyclic.save();
		resaCyclic.step2();
		if (timerCyclic.status) {
			timerCyclic.stop();
			timerCyclic.minutes = 20;
			timerCyclic.secondes = 00;
			afficherResaInfo();
			resaCyclic.infos();
		} else {
			if (timerCyclic.minutes === 0 && timerCyclic.secondes === 0) {
				timerCyclic.minutes = 20;
				timerCyclic.secondes = 00;
			}
			afficherResaInfo();
			resaCyclic.infos();
		}
    } else { 
		resaCyclic.canvas.style.border = "1px solid red";
		document.querySelector(".required").style.fontWeight = "bold";
    }
});
if (localStorage.nom && localStorage.prenom && sessionStorage.nameStation && sessionStorage.minutes !== 0 && sessionStorage.secondes !== 0) {
    afficherResaInfo();
    resaCyclic.infos();
} else {
    sessionStorage.clear();
}


// display h3 de la nav bar lors du scroll en version mobile

function displayH3() {
	if (window.innerWidth < 455) {
		document.querySelector(".navbar-text").style.display = "none";
		if (window.scrollY < 20) {
			document.querySelector(".navbar-text").style.display = "initial";
		}
	}

}
window.onscroll = function() {displayH3()};