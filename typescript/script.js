console.log("Here i am.");
window.alert("Welcome to the most irrelevant page ever!"); //Alert-Fenster wird angezeigt
window.onload = function () {
    console.log("let the game begin...");
    document.getElementById("yes").addEventListener("click", changeTextuClass);
    document.getElementById("no").addEventListener("click", Konsole);
    document.getElementById("bro").addEventListener("click", Neu);
};
function changeTextuClass() {
    if (document.getElementById("yes").innerHTML == "The first page is always the worst page right?  Click me!") {
        document.getElementById("yes").innerHTML = "Maybe, because there will always be an exception... Click again;)";
        console.log("--Text erfolgreich geändert--");
    }
    else {
        document.getElementById("yes").innerHTML = "You just changed my class... how dare you!";
        console.log("--Text erfolgreich geändert--");
        console.log("--Klasse erfolgreich geändert--");
        document.getElementById("yes").className = "Stringzeile";
    }
}
function Konsole() {
    let vorname = "John";
    let nachname = "Wick";
    console.log(vorname + nachname);
    let number1 = 15;
    console.log("--Nummer1--");
    console.log(number1);
    let number2 = 7;
    console.log("--Nummer2--");
    console.log(number2);
    number2 = 22;
    console.log("--Nummer2 Neu--");
    console.log(number2);
    console.log("--Nummer1+Nummer2--");
    console.log(number1 + number2);
    console.log("--vollerName+Numer2");
    console.log(vorname + nachname + number2);
}
function Neu() {
    let newPara = document.createElement("P");
    let position = document.getElementById("body");
    position.appendChild(newPara);
    newPara.innerHTML = "The Elements!";
    console.log("Loading The Elements....");
}
//# sourceMappingURL=script.js.map