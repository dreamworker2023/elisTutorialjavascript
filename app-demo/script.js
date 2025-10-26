// --- 1. SELEZIONE DEGLI ELEMENTI DEL DOM ---
// Selezioniamo tutte le sezioni principali
const sezioneWelcome = document.getElementById("welcome");
const sezioneArea = document.getElementById("area");
const sezionePerimetro = document.getElementById("perimetro");

// Selezioniamo i pulsanti di navigazione
const btnVaiArea = document.getElementById("btnVaiArea");
const btnVaiPerimetro = document.getElementById("btnVaiPerimetro");

// Usiamo querySelectorAll per selezionare TUTTI i pulsanti "Torna Indietro"
// tramite la loro classe condivisa ".btn-torna-welcome"
// invece che creare tre pulsanti conm id diversi
const btnsTornaWelcome = document.querySelectorAll(".btn-torna-welcome");

// Selezioniamo gli elementi per il calcolo dell'AREA
const inputBase = document.getElementById("base");
const inputAltezza = document.getElementById("altezza");
const btnCalcolaArea = document.getElementById("calcola_area");
const divRisultatoArea = document.getElementById("risultato_area");

// Selezioniamo gli elementi per il calcolo del PERIMETRO
const inputLatoA = document.getElementById("latoA");
const inputLatoB = document.getElementById("latoB");
const inputLatoC = document.getElementById("latoC");
const btnCalcolaPerimetro = document.getElementById("calcola_perimetro");
const divRisultatoPerimetro = document.getElementById("risultato_perimetro");


// --- 2. FUNZIONI LOGICHE ---

/**
 * Funzione per gestire la navigazione tra le schermate.
 * Nasconde tutte le sezioni e mostra solo quella con l'ID fornito.
 */
function mostraSezione(idSezioneToShow) {
    // Nascondiamo tutte le sezioni
    sezioneWelcome.style.display = "none";
    sezioneArea.style.display = "none";
    sezionePerimetro.style.display = "none";
    
    // Puliamo i campi e i risultati quando torniamo al menu principale
    if (idSezioneToShow === "welcome") {
        pulisciCampiArea();
        pulisciCampiPerimetro();
    }

    // Mostriamo solo la sezione richiesta
    if (idSezioneToShow === "welcome") {
        sezioneWelcome.style.display = "block";
    } else if (idSezioneToShow === "area") {
        sezioneArea.style.display = "block";
    } else if (idSezioneToShow === "perimetro") {
        sezionePerimetro.style.display = "block";
    }
}

/**
 * Funzione per calcolare l'area del triangolo.
 */
function calcolaAreaTriangolo() {
    // Resettiamo il risultato precedente
    divRisultatoArea.textContent = "";
    divRisultatoArea.className = "risultato"; // Rimuove classi errore/successo

    // Otteniamo i valori dagli input e li convertiamo in numeri
    const base = parseFloat(inputBase.value);
    const altezza = parseFloat(inputAltezza.value);

    // Validazione: controlliamo se i valori non sono numeri validi o sono negativi/zero
    if (isNaN(base) || isNaN(altezza) || base <= 0 || altezza <= 0) {
        divRisultatoArea.textContent = "Errore: Inserisci valori numerici positivi per base e altezza.";
        divRisultatoArea.classList.add("risultato-errore");
        return; // Interrompiamo la funzione
    }

    // Calcolo dell'area
    const area = (base * altezza) / 2;

    // Mostriamo il risultato
    // .toFixed(2) arrotonda il risultato a due cifre decimali
    divRisultatoArea.textContent = `L'area del triangolo è: ${area.toFixed(2)}`;
    divRisultatoArea.classList.add("risultato-successo");
}

/**
 * Funzione per calcolare il perimetro del triangolo.
 */
function calcolaPerimetroTriangolo() {
    // Resettiamo il risultato precedente
    divRisultatoPerimetro.textContent = "";
    divRisultatoPerimetro.className = "risultato";

    // Otteniamo i valori e li convertiamo in numeri
    const latoA = parseFloat(inputLatoA.value);
    const latoB = parseFloat(inputLatoB.value);
    const latoC = parseFloat(inputLatoC.value);

    // Validazione 1: controlliamo se sono numeri validi e positivi
    if (isNaN(latoA) || isNaN(latoB) || isNaN(latoC) || latoA <= 0 || latoB <= 0 || latoC <= 0) {
        divRisultatoPerimetro.textContent = "Errore: Inserisci valori numerici positivi per tutti e tre i lati.";
        divRisultatoPerimetro.classList.add("risultato-errore");
        return; 
    }

    // Validazione 2: Disuguaglianza triangolare
    // La somma di due lati deve essere sempre maggiore del terzo lato.
    if ((latoA + latoB <= latoC) || (latoA + latoC <= latoB) || (latoB + latoC <= latoA)) {
        divRisultatoPerimetro.textContent = "Errore: Le misure inserite non possono formare un triangolo valido.";
        divRisultatoPerimetro.classList.add("risultato-errore");
        return;
    }

    // Calcolo del perimetro
    const perimetro = latoA + latoB + latoC;

    // Mostriamo il risultato
    divRisultatoPerimetro.textContent = `Il perimetro del triangolo è: ${perimetro.toFixed(2)}`;
    divRisultatoPerimetro.classList.add("risultato-successo");
}

/**
 * Pulisce i campi e il risultato della sezione Area.
 */
function pulisciCampiArea() {
    inputBase.value = "";
    inputAltezza.value = "";
    divRisultatoArea.textContent = "";
    divRisultatoArea.className = "risultato";
}

/**
 * Pulisce i campi e il risultato della sezione Perimetro.
 */
function pulisciCampiPerimetro() {
    inputLatoA.value = "";
    inputLatoB.value = "";
    inputLatoC.value = "";
    divRisultatoPerimetro.textContent = "";
    divRisultatoPerimetro.className = "risultato";
}


// --- 3. COLLEGAMENTO DEGLI EVENTI (EVENT LISTENERS) ---

// Click sui pulsanti della schermata "welcome"
btnVaiArea.addEventListener("click", function() {
    mostraSezione("area");
});

btnVaiPerimetro.addEventListener("click", function() {
    mostraSezione("perimetro");
});

// Click sui pulsanti "Torna Indietro"
// Applichiamo lo stesso evento a tutti i pulsanti trovati
btnsTornaWelcome.forEach(function(bottone) {
    bottone.addEventListener("click", function() {
        mostraSezione("welcome");
    });
});

// Click sui pulsanti "Calcola"
btnCalcolaArea.addEventListener("click", calcolaAreaTriangolo);
btnCalcolaPerimetro.addEventListener("click", calcolaPerimetroTriangolo);
