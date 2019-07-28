///// ----> ICH FINDE DEN FEHLER NICHT.... HATT SO FUNKTIONIERT GEHABT, ÜBER NACHT GINGS PLÖTZLICH NICHT MEHR OHNE DAS ICH WAS DARAN GEÄNDERT HABE. HATTEN AUCH ANDERE DIESES PROBLEM.
let KartendeckArray; //Varibalen werden dem Interface Karten zugewiesen, mit noch leeren Arrays (Einträge dürfen nicht fest deklariert sein!)
let SpielfeldArray;
let CpuArray;
let SpielerArray;
////////////////////////////////////////// ONLOAD FUNKTION //////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {
    document.getElementById("Kartendeck").addEventListener("click", Ziehen, false); //Event-Listener auf dem Kartendeck im HTML
    Spielverlauf(); //Funktion zum direktem Aufbau des Spieles
};
///////////////////////////////////////// KARTENGENERIERUNG + HTML //////////////////////////////////////////////////////////////////////////////
function Wertzuweisung() {
    let Farbe; //durch 8 Wertigkeiten
    for (let i = 1; i <= 8; i++) { //mit je 4 verschiedenen Farben
        for (let j = 1; j <= 4; j++) {
            if (j == 1) {
                Farbe = "blue";
            }
            else if (j == 2) {
                Farbe = "black";
            }
            else if (j == 3) {
                Farbe = "bunt";
            }
            else if (j == 4) {
                Farbe = "rose";
            }
            let NewKarte = {
                Kartenfarbe: Farbe,
                KartenWert: i
            };
            KartendeckArray.push(NewKarte); //fügt Karten ins KartendeckArray hinzu
        }
    }
}
function HTMLobjekteSpieler(tempKarte, Punkt, index) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", tempKarte.Kartenfarbe); //Klasse = Kartenfarbe (gespeichert im Interface)
    document.getElementById(Punkt).appendChild(holdingDiv);
    let Zahl = document.createElement("p"); //erstellt den Spieler-Karten Inhalt (Wert) im HTML                                                 
    Zahl.innerHTML = "" + tempKarte.KartenWert;
    holdingDiv.appendChild(Zahl);
    if (Punkt == "Spielerkarten") {
        holdingDiv.addEventListener("click", function () { ablegen(tempKarte, index); }, false); //Falls Karte passt = EventListener mit der Funktion ablegen()
    }
}
function HTMLobjekteRückseite(tempKarte, Punkt, index) {
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", "Karten"); //Keine Farbklassen deklariert um nicht schummeln zu können:)
    document.getElementById(Punkt).appendChild(holdingDiv); //außerdem kein Inhalt <p> aus dem selben Grund
}
////////////////////////////////////////////////////////// SPIELABLAUF u. REGELN ////////////////////////////////////////////////////////////////
function Spielverlauf() {
    KartendeckArray = [];
    SpielfeldArray = [];
    CpuArray = [];
    SpielerArray = [];
    Wertzuweisung();
    KartendeckArray = mischen(KartendeckArray); //Das KartendeckArray wird gemischt durch Funktion mischen()
    for (let i = 0; i < 4; i++) { //jedem Spieler werden 4 Karten verteilt, direkt zu beginn
        SpielerArray.push(KartendeckArray[i]);
        CpuArray.push(KartendeckArray[i + 4]);
    }
    SpielfeldArray.push(KartendeckArray[8]);
    KartendeckArray.splice(0, 9);
    überschreiben("Spielfeld"); //die verschiedenen Arrays werden "überschrieben", so das Karten nur einmal vorkommen und in die jeweiligen Arrays switchen können
    überschreiben("Spielerkarten");
    überschreiben("Kartendeck");
    überschreiben("Cpukarten");
}
function ablegen(tempKarte, index) {
    if (tempKarte.Kartenfarbe == SpielfeldArray[SpielfeldArray.length - 1].Kartenfarbe || tempKarte.KartenWert == SpielfeldArray[SpielfeldArray.length - 1].KartenWert) { //Wenn KartenFarbe ODER KartenWert gleich der Handkarten
        SpielfeldArray.push(tempKarte); //Array-switch, also legen
        SpielerArray.splice(index, 1);
        überschreiben("Spielerkarten");
        überschreiben("Spielfeld");
        if (SpielerArray.length == 0) {
            window.alert("Congratulations, you win the Dragon-Sin Card Game. Again?"); //Benachtigung falls SpielerArray leer (gewonnen)
            Spielverlauf(); //Neustart
        }
        else {
            CpuRunde(); //Einführung des Gegners
        }
    }
}
function Ziehen() {
    if (KartenVergleichen(SpielerArray) == false) { //Nur wenn keine Karte passt, KartenVergleich = false!
        SpielerArray.push(KartendeckArray[KartendeckArray.length - 1]);
        KartendeckArray.splice(KartendeckArray.length - 1, 1);
        überschreiben("Spielerkarten");
        überschreiben("Kartendeck");
    }
    if (KartenVergleichen(SpielerArray) == false) {
        CpuRunde(); //Einführung des Gegners nach dem eigenen Zug
    }
}
function CpuRunde() {
    let i = 0;
    for (i; i < CpuArray.length; i++) {
        if (CpuArray[i].Kartenfarbe == SpielfeldArray[SpielfeldArray.length - 1].Kartenfarbe || CpuArray[i].KartenWert == SpielfeldArray[SpielfeldArray.length - 1].KartenWert) { //Wenn KartenWert ODER KartenFarbe gleich (CpuArray zu SpielfeldArray)
            SpielfeldArray.push(CpuArray[i]); //dann Array-switch, also legen
            CpuArray.splice(i, 1);
            überschreiben("Spielfeld");
            überschreiben("Cpukarten");
            break;
        }
    }
    if (CpuArray.length == 0) { //falls CpuArray leer, Benachichtigung das Cpu gewonnen hat
        window.alert("You lost! The Dragon-Sin leads the game. Again?");
        Spielverlauf(); //Neustart
    }
    else if (i >= CpuArray.length) {
        CpuArray.push(KartendeckArray[KartendeckArray.length - 1]);
        KartendeckArray.splice(KartendeckArray.length - 1, 1);
        überschreiben("Cpukarten");
        überschreiben("Kartendeck");
        if (CpuArray[CpuArray.length - 1].Kartenfarbe == SpielfeldArray[SpielfeldArray.length - 1].Kartenfarbe || CpuArray[CpuArray.length - 1].KartenWert == SpielfeldArray[SpielfeldArray.length - 1].KartenWert) {
            SpielfeldArray.push(CpuArray[CpuArray.length - 1]);
            CpuArray.splice(CpuArray.length - 1, 1);
            überschreiben("Spielfeld");
            überschreiben("Cpukarten");
        }
    }
}
function KartenVergleichen(tempArray) {
    let Vergleich = false;
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].Kartenfarbe == SpielfeldArray[SpielfeldArray.length - 1].Kartenfarbe || tempArray[i].KartenWert == SpielfeldArray[SpielfeldArray.length - 1].KartenWert) { //Wenn KartenFarbe ODER KartenWert gleich der Arrays
            Vergleich = true;
            break;
        }
    }
    return Vergleich;
}
function überschreiben(Punkt) {
    überschreibeHTML(Punkt);
    if (Punkt == "Spielerkarten") {
        for (let i = 0; i < SpielerArray.length; i++) {
            HTMLobjekteSpieler(SpielerArray[i], "Spielerkarten", i); //deklariert HTML-Typ (also offen)
        }
    }
    if (Punkt == "Cpukarten") {
        for (let i = 0; i < CpuArray.length; i++) {
            HTMLobjekteRückseite(CpuArray[i], "Cpukarten", i); //deklariert HTML-Typ(verdeckt)
        }
    }
    if (Punkt == "Spielfeld") {
        HTMLobjekteSpieler(SpielfeldArray[SpielfeldArray.length - 1], "Spielfeld", SpielfeldArray.length - 1); //(offen)
    }
    if (Punkt == "Kartendeck") {
        HTMLobjekteRückseite(KartendeckArray[KartendeckArray.length - 1], "Kartendeck", KartendeckArray.length - 1); //(verdeckt)
    }
}
function überschreibeHTML(Punkt) {
    let object = document.getElementById(Punkt);
    while (object.firstChild) {
        object.removeChild(object.firstChild);
    }
}
function mischen(tempArray) {
    let Positionen = tempArray.length; //Bezug = Interface-Karten = Array Platz wechseln
    let tempWert;
    let Zufall;
    while (Positionen != 0) {
        Zufall = Math.floor(Math.random() * Positionen); //mathematisch, durch Zufall
        Positionen -= 1;
        tempWert = tempArray[Positionen];
        tempArray[Positionen] = tempArray[Zufall];
        tempArray[Zufall] = tempWert;
    }
    return tempArray;
}
//# sourceMappingURL=Kartenspiel.js.map