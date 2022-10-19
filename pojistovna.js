class Pojistovna{
    constructor(){
        const zaznamyZeStorage = localStorage.getItem("zaznamy");
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];

        this.jmeno = document.getElementById("jmeno");
        this.prijmeni = document.getElementById("prijmeni");
        this.vek = document.getElementById("vek");
        this.telefon = document.getElementById("telefon");
        this.ulozButton = document.getElementById("ulozit")
        this.vypisElement = document.getElementById("tabulka");

        this._nastavUdalosti();
    }
    _nastavUdalosti(){
        this.vypisZaznamy();
        this.ulozButton.onclick = () => {
            if (this.jmeno.value !== "" && this.prijmeni.value !== "" && this.vek.value !== "" && this.telefon.value !== "") {
                const pojistenec = new Pojistenec(this.jmeno.value, this.prijmeni.value, this.vek.value, this.telefon.value);
                this.zaznamy.push(pojistenec);
				this.ulozZaznamy();
                this.vypisZaznamy();
            }
        };
    }
    ulozZaznamy() {
		localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy));
	}
    vypisZaznamy() {
		this.vypisElement.innerHTML = "";
        for (const zaznam of this.zaznamy) {
            const ukol = document.createElement("div");
            ukol.className = "ukol";
			ukol.insertAdjacentHTML("beforeend", `<p>${zaznam.jmeno}, ${zaznam.prijmeni}, ${zaznam.vek}, ${zaznam.telefon}</p>`);
			this._pridejTlacitko("Smazat", () => {
				if (confirm("Opravdu si přejete odstranit úkol?")) {
					this.zaznamy = this.zaznamy.filter(z => z !== zaznam); // Ponechá vše co není rovné proměnné zaznam
					this.ulozZaznamy();
					this.vypisZaznamy();
				}
			}, ukol);
						
			ukol.insertAdjacentHTML("beforeend", "</div>");
			this.vypisElement.appendChild(ukol);
		}
    }
        _pridejTlacitko(titulek, callback, element) {
            const button = document.createElement("button");
            button.onclick = callback;
            button.innerText = titulek;
            element.appendChild(button);
        }

}
const pojistovna = new Pojistovna();