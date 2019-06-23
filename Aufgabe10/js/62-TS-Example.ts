// BEISPIEL UND AUFGABE:

// Dieses Skript soll als Beispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.

// EINGEBAUTE FEHLER: Innerhalb jedes Programmteiles wurden ein paar fiese Fehler eingebaut!
// Diese werden vermutlich erst in der Browser-Konsole angezeigt. 
// Testet also alle Funktionen, jeden Button welchen ihr finden könnt!
// Hilfe: Benutzt auf Verdacht ein Konsolen-Log oder ruft die Variable in der Konsole des Browsers auf.
// Hilfe2: Betrachtet den umliegenden Code. Trackt die Werte von Variablen, falls euch etwas komisch vorkommt!

// ------- interfaces --------- //
// INSGESAMT EINGEBAUTE FEHLER beu den interfaces: Keine. (0 / null)

// Monster sind vielfältig und können sehr unterschiedlich sein. Dennoch werden sie durch allgemeine Attribute, wie Name und Lebenspunkte, vereint.
// Deshalb wird hier ein interface genutzt!
// Ein interface erlaubt das erstellen von einem ungefährem Haupt-Objekt.
// Object = Komplexer Datentyp auf Grundlage primitiver Datentypen

interface Monster {
    monsterName : string; // Name des Monsters
    monsterHealthPoints : number; // Lebenspunkte
    monsterExperience : number; // Erfahrungspunkte bei besiegen des Monsters
    monsterModifier : string []; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
    monsterLevel: number;
    picAdress: string;
    object : string;



}



// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)

let bildpfad: string;

let monsterHolder : string = "monsterHoldingCell";                                  // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.

let playerName : string = "Spielername";                                            // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP : number = 0;                                                          // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel : number = 500; 
let playerObjects: string = "Speer";                                               // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerLevel: number = 1;
let winthegame: boolean = false;

// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix : string[] = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) "]; // length = 6, da 6 Einträge. Von 0-5.
let monsterName : string[] = ["Morfois", "Kira", "Deus","Legend","Rapture","Light"]; // length = 3, da 3 Einträge. Von 0-2.
let suffix : string[] = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung"]; // length = 6, da hier 6 Einträge sind. Von 0-5.

let monsterModifers : string[] = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.
let Objects : string[] = ["Waffe","Schwert","Langhorn","Atombombe","Leaser","Fäuste"]
let Bildquellen: string[] = ["L.png","D.png","M.png","K.png","Ma.png","T.png"]
let PushArray: number[] = [];
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray : Monster[] = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray ); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.


// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)

// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel("n/a"); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML);
    document.getElementById("alleMonster").addEventListener("click", fightAllMonsters);
    document.getElementById("alleSchwachenMonster").addEventListener("click", fightAllWeakMonsters);
    document.getElementById("schwächsteMonster").addEventListener("click", fightWeakestMonster);
    updatePlayerLevel("n/a");
}





// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster()
{
    let random : number = getRNGNumber(3)+1;  //generiert bis zu 3 Monstern

    for (let i : number = 0; i < random; i++) //Schleife mit Endfunktion i++

{
    let newMonsterName : string = generateMonsterName();                // Eigens-gebaute Funktion, welche einen string zurück gibt.
    let newMonsterHP : number = generateMonsterHitPoints();             // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterXP : number = generateMonsterXP();                    // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterModifier : string[] = generateMonsterModifer();       // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
    let newMonsterLevel : number = generateMonsterLevel();

    let newObject: string = generateObject();
    let newPicadress: string = bildpfad;
    
    let newMonster : Monster = {                                        // Monster wird erstellt.
        monsterName : newMonsterName, 
        monsterHealthPoints : newMonsterHP,
        monsterExperience : newMonsterXP,
        monsterModifier : newMonsterModifier,
        monsterLevel : newMonsterLevel,
        object: newObject,
        picAdress: newPicadress,
    };

    monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 

    console.log(monsterArray[monsterArray.length -1].monsterExperience);                    // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein).

    //monsterGenerateHTML(monsterArray.length);                                              // Triggere die Generierung von HTML
}
updateHTML();
}

function monsterGenerateHTMLALL() 
{

    let random : number = monsterArray.length;
    for (let i : number = 0; i < random; i++)
    {
        console.log("" + i);
        monsterGenerateHTML(i);
    }
}

// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(count: number)
{
    let holdingDiv : HTMLElement = document.createElement("div");       // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + count);     // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster");                        // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv);     // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

    let monsterName : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterName.innerHTML = monsterArray[count].monsterName;                     // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName);                        // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterEXP: HTMLElement = document.createElement("p");
    monsterEXP.innerHTML = "Exp-Points: " + monsterArray[count].monsterExperience;
    holdingDiv.appendChild(monsterEXP);

    let monsterLeben : HTMLElement = document.createElement("p");
    monsterLeben.innerHTML = "Leben: " + monsterArray[count].monsterHealthPoints;
    holdingDiv.appendChild(monsterLeben);

    let monsterLvl: HTMLElement = document.createElement("p");
    monsterLvl.innerHTML = "Level: " + monsterArray[count].monsterLevel;
    holdingDiv.appendChild(monsterLvl);

    let monsterMod : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[count].monsterModifier[0] + ", " +  monsterArray[count].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod);                                 // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterImg : HTMLElement = document.createElement("img");       // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[count].picAdress);                 // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster");            // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);                         // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

    let monsterObject: HTMLElement = document.createElement("p");
    monsterObject.innerHTML = "gewählte Waffe: " + monsterArray[count].object;
    holdingDiv.appendChild(monsterObject);

    let monsterBtn : HTMLElement = document.createElement("BUTTON");    // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!";                        // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn);                                 // Füge den Button zu dem holding-div hinzu.

    let monsterCount : number = count;                    // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);

    monsterBtn.addEventListener(                                        // Füge dem Monster eine Funktion hinzu.
        'click', function() {                                           // Wird bei Maus-Click ausgelöst.
            fightMonster(monsterCount);                                 // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
        }, false);                                                      // Ignoriert das false.
}


// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber : number) : number
{
                                                 // Diese Zeile ist einer der drei Fehler in den Funktionen. Ich bin mal so frei und vermerke das hier. Einfach löschen und alles wird besser.
    return Math.floor(Math.random() * _maxNumber);                                                   // Gebe diese Zahl zurück, Funktion kann ähnlich einer Variable in Rechnungen genutzt werden.
}


// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() : string
{
    let generatedMonsterName : string = ""; // Erstelle einen leeren String für das Monster

    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber : number = getRNGNumber(prefix.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber];                           // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length);                       // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber];                             // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    generateNewPicadress(rngNumber);

    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length);                            // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber];                          // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    return generatedMonsterName;
}


// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP : number = 1 + getRNGNumber(1000);
    return tempMonsterHP;
}


// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 350) + 100 zurück.
    let tempMonsterXP : number = 100 + getRNGNumber(350);
    return tempMonsterXP;
}


// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() : string[]
{
    let tempMonsterMod : string[] = [];                                         // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
}

function generateMonsterLevel() : number {
    let tempMonsterLevel : number = 0 + getRNGNumber(10);
    return tempMonsterLevel;
}

function generateObject(): string {
    let tempObject: string;
    tempObject = Objects[getRNGNumber(Objects.length)];
    return tempObject;
}

function generateNewPicadress(MonsterName: number)
 {
     if (Bildquellen.length >= monsterName.length) {
         bildpfad = "imgs/" + Bildquellen[MonsterName];
     } else {
         bildpfad = "imgs/error.png";
     }
 }


 function updatePlayerEXP(tempEXP: number) {
    if (playerXP + tempEXP > 0) {
        playerXP += tempEXP;
    } else {
        playerXP = 0;
    }
}

// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index : number)
{

    if (monsterArray.length > 0) {
        if (playerLevel > monsterArray[_index].monsterLevel) {
            console.log("Neues Objekt: " + monsterArray[_index].object);

            updatePlayerEXP(monsterArray[_index].monsterExperience)

            updatePlayerObjects(monsterArray[_index].object);
            updatePlayerLevel(monsterArray[_index].object);

            monsterArray.splice(_index, 1);

            updateHTML();
        } else if (playerLevel == monsterArray[_index].monsterLevel) {
            console.log("Gleiches Level Monster gefunden!");
            if (Math.random() > 0.4) {
                console.log("du hast das Monster besiegt!")
                console.log("Neues Objekt: " + monsterArray[_index].object);

                updatePlayerEXP(monsterArray[_index].monsterExperience)

                updatePlayerObjects(monsterArray[_index].object);
                updatePlayerLevel(monsterArray[_index].object);

                monsterArray.splice(_index, 1);

                updateHTML();
            } else {
                console.log("Du hast verloren... aktivierter Zauber schützt deine Objekte");
                updatePlayerEXP((monsterArray[_index].monsterExperience) * (-1));
                updatePlayerLevel("n/a");
            }
        } else {
            console.log("WASTED!");
            updatePlayerEXP((monsterArray[_index].monsterExperience) * (-1));
            updatePlayerLevel("n/a");
        }
    }
}



// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel(neuObject: string)
{
    playerLevel = (Math.floor(playerXP / playerXPperLevel)) +1;                                                                           // Spieler-Level = XP / XPproLevel
    if (playerLevel >= 20 && winthegame == false) {
        alert("You Win! Game Over");
        winthegame = true;
    }
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + playerXPperLevel * (playerLevel + 1) + ")      Objects: " + playerObjects;       // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + playerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)    neues Objekt gefunden:" + neuObject);        // Spieler-Level in der Konsole.
}

function updatePlayerObjects(neuObject: string) 
{
    playerObjects += ", " + neuObject;
}



function updateHTML()
{
    monsterfeldlöschen();
    monsterGenerateHTMLALL();
    console.log(monsterzähler());
}

function monsterzähler(){  //zählt Anzahl der Monster

    return monsterArray.length

}

function monsterfeldlöschen(){

    let monsterHoldingCell : HTMLElement = document.getElementById("monsterHoldingCell");

    while(monsterHoldingCell.childElementCount > 0) {
        monsterHoldingCell.removeChild(monsterHoldingCell.firstChild);
    }
}

function fightAllMonsters() {

    for (let i: number = 0; i < monsterArray.length; i++) {
        fightMonster(i);
    }

}

function fightAllWeakMonsters() {

    for (let i=monsterArray.length -1; i>=0; i--) {
        console.log(i);
    if (playerLevel > monsterArray[i].monsterLevel) {
        fightMonster(i);
    } else {
        console.log("keine schwachen Monster da!")
    }
}
}

function fightWeakestMonster() {

    let _index: number= 0;
 let findweakeastmonster : number = monsterArray[0].monsterLevel;
 
for ( let i : number = monsterArray.length -1; i>= 0; i--)
{

console.log("for schleife wird ausgeführt, JUCHUU :D ");

if (monsterArray [i].monsterLevel < findweakeastmonster)
{
    _index = i;
    findweakeastmonster= monsterArray [i].monsterLevel;
    console.log("Schwächste Monster bekämpft");

}
}
if (monsterArray [_index].monsterLevel < playerLevel)
{fightMonster (_index);}
}