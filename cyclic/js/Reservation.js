class Reservation {
    constructor() {
        this.form = document.getElementById("form");
        this.canvasBlock = document.getElementById("container-canvas");
        this.emplacement = document.getElementById("emplacement");
        this.velos = document.getElementById("velos");
        this.adresse = document.getElementById("adresse");
        this.nom = document.getElementById("nom");
        this.prenom = document.getElementById("prenom");
        this.canvas = document.getElementById("sign");
    }

    step1() {
        if (this.nom.value !== "" && this.prenom.value !== "") {
            this.form.style.display = "none";
            this.adresse.style.display = "none";
            this.emplacement.style.display = "none";
            this.velos.style.display = "none";
            this.canvasBlock.style.display = "flex";
            if (this.canvas.style.border === "1px solid red") {
                this.canvas.style.border = "none";
            }
        } else {
            if (this.prenom.value !== "") {
                this.prenom.style.borderColor = "grey";
                document.querySelector(".prenom").style.fontWeight = "normal";
                document.querySelector(".nom").style.fontWeight = "bold";
                return this.nom.style.borderColor = "red";
            }
            if (this.nom.value !== "") {
                this.nom.style.borderColor = "grey";
                document.querySelector(".nom").style.fontWeight = "normal";
                document.querySelector(".prenom").style.fontWeight = "bold";
                return this.prenom.style.borderColor = "red";
            }
            this.nom.style.borderColor = "red";
            this.prenom.style.borderColor = "red";
            document.querySelector(".nom").style.fontWeight = "bold";
            document.querySelector(".prenom").style.fontWeight = "bold";
        }
    }
    
    step2() {
        this.form.style.display = "block";
        this.adresse.style.display = "block";
        this.emplacement.style.display = "block";
        this.velos.style.display = "block";
        this.canvasBlock.style.display = "none";
        this.nom.value = "";
        this.prenom.value = "";
        if (this.nom.style.borderColor === "red" || this.prenom.style.borderColor === "red") {
            this.nom.style.borderColor = "grey";
            this.prenom.style.borderColor = "grey";
        }
        window.scroll(0, 1000);
    }

    save() {
        localStorage.setItem("nom", this.nom.value);
        localStorage.setItem("prenom", this.prenom.value);
        sessionStorage.setItem("nameStation", document.getElementById("name-station").textContent);
        sessionStorage.setItem("nombreStation", document.getElementById("numb").textContent);
    }

    infos() {
        document.getElementById("info-resa").textContent = `${localStorage.getItem("prenom")} ${localStorage.getItem("nom")}, vous avez effectué une réservation à la station ${sessionStorage.getItem("nameStation")}`;
        if (document.getElementById("temps-resa").style.visibility === "visible") {
            document.getElementById("temps-resa").innerHTML = `Il vous reste <span id="minutes">${sessionStorage.getItem("minutes")}</span> minutes <span id="secondes">${sessionStorage.getItem("secondes")}</span> secondes pour retirer votre vélo.`;
        } else {
            document.getElementById("temps-resa").style.visibility = "visible";
        }
    }

    cancel() {
        this.form.style.display = "block";
        this.adresse.style.display = "block";
        this.emplacement.style.display = "block";
        this.velos.style.display = "block";
        this.canvasBlock.style.display = "none";
        if (this.nom.style.borderColor = "red") {
            this.nom.style.borderColor = "grey";
            this.prenom.style.borderColor = "grey";
        }
        document.querySelector(".nom").style.fontWeight = "normal";
        document.querySelector(".prenom").style.fontWeight = "normal";
    }
}