
class MarkerMap {

    constructor(station) {
        this.position = station.position,
	    this.status = station.status,
	    this.name = station.name,
        this.nombre = station.number,
        this.adresse = station.address,
        this.places = station.available_bike_stands,
        this.velos = station.available_bikes
        this.marker;
        this.markerClass = document.getElementsByClassName("leaflet-marker-icon");
        this.adresse = (this.adresse.charAt(0).toUpperCase() + this.adresse.substring(1).toLowerCase());
        this.screen;
        this.create();
        this.click();
        this.close();
        this.checkIcon();
    }

    create() {
        if (this.status === "OPEN") {
            this.marker = L.marker(this.position, {icon: whiteIcon, alt: "marker station ouverte", id: this.name}).addTo(map);
            this.marker._icon.id = this.nombre;
                
        } else {
            this.marker = L.marker(this.position, {icon: greyIcon, alt: "marker station fermée", id: this.name}).addTo(map);
            this.marker.bindPopup("Station Fermée");
            this.marker._icon.id = this.nombre;
        } 
        if (this.velos === 0) {
            this.marker.setIcon(greyIcon);
            this.marker.bindPopup("0 vélo disponible");
            }
        if (localStorage.getItem("nom") !== null) {
            this.resaIcon();
        }
    }

    formOn() {
        this.screen = window.innerWidth;
        if (this.screen < 991) {
            document.getElementById("maps").style.width = "95%";
        } else {
            document.getElementById("maps").style.width = "67.5%";
            document.getElementById("container-map-form").style.display = "flex";
        }
        document.getElementById("formulaire").style.display = "flex";
    }

    formOff() {
        document.getElementById("formulaire").style.display = "none";
        document.getElementById("maps").style.width = "95%";
    }

    click() {
    	this.marker.addEventListener("click", e => {
            if (this.velos === 0 || this.status !== "OPEN") {
        	    this.formOff();
            } else {
                this.formOn();
                this.removeActiveIcon();
                this.activeIcon();
                document.getElementById("name-station").textContent = this.name;
                document.getElementById("adresse").innerHTML = `<b>Adresse</b> : ${this.adresse}`;
                document.getElementById("emplacement").innerHTML = `<b>Nombre d'emplacement disponibles</b> : ${this.places}`;
                document.getElementById("velos").innerHTML = `<b>Nombre de vélos disponibles</b> : ${this.velos}`;
                document.getElementById("p-sign").innerHTML = `Pour valider votre réservation ${this.adresse.toLowerCase()} <br /><span class="required">Veuillez signer ci-dessous.</span>`;
                document.getElementById("numb").textContent = this.nombre;
                this.screen = window.innerWidth;
                if (this.screen < 991) {
                    window.location.href = "#ancre-form";
                }
            }
    	});
    }

    close() {
        map.addEventListener("click", () => {
            this.formOff();
            this.removeActiveIcon();
        });
    }

    activeIcon() {
        if (this.marker._icon.getAttribute("src") === "./map-marker/map-marker-logo-white.png") {
            this.marker.setIcon(redIcon);
        } else {
            this.marker.setIcon(whiteIcon);
            this.formOff();
        }
        if (this.marker._icon.getAttribute("id") === sessionStorage.getItem("nombreStation")) {
            this.marker.bindPopup("Vous avez déjà une réservation en cours à la station "+ sessionStorage.getItem("nameStation"));
            this.marker.setIcon(greenIcon);
        }
    }

    resaIcon() {
        let resaStation = sessionStorage.getItem("nombreStation");
        if (this.marker._icon.getAttribute("id") === resaStation) {
            Array.from(this.markerClass, e => {
                if (e.attributes.src.nodeValue === "./map-marker/map-marker-logo-green.png"){
                    e.attributes.src.nodeValue = "./map-marker/map-marker-logo-white.png"
                }
            });
            this.marker.setIcon(greenIcon);
        }
    }

    removeActiveIcon() {
        Array.from(this.markerClass, e => {
            if (e.attributes.src.nodeValue === "./map-marker/map-marker-logo-red.png"){
                e.attributes.src.nodeValue = "./map-marker/map-marker-logo-white.png"
            }
        });
    }
    
    removeResaIcon() {
        Array.from(this.markerClass, e => {
            if (e.attributes.src.nodeValue === "./map-marker/map-marker-logo-green.png"){
                e.attributes.src.nodeValue = "./map-marker/map-marker-logo-white.png"
            }
        });
        this.marker.bindPopup("Réservation annulé");
    }

    checkIcon() {
        document.getElementById("submit").addEventListener("click", () => {
            if (canvasCyclic.checkSign) {
                this.resaIcon();
                this.formOff();
            }
        });
    }
}
