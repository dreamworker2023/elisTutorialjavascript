// Aspetta che tutta la pagina (tutorial) sia caricata
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleziona il form del quiz
    const quizForm = document.getElementById("quiz-form");
    if (!quizForm) {
        return; // Non fare nulla se il form non è in questa pagina
    }

    const divRisultati = document.getElementById("quiz-risultati");
    
    // Definiamo le risposte corrette
    const correctAnswers = {
        q1: "b", // Fine del body 
        q2: "c", // #welcome 
        q3: "a", // display: none 
        q4: "b", // Sempre stringa 
        q5: "b", // parseFloat() 
        q6: "c", // classList.add() 
        q7: "b", // forEach per tutti 
        q8: "b"  // Not a Number 
    };

    // Aggiungiamo l'evento "submit" al form
    quizForm.addEventListener("submit", function(event) {
        // Impedisce alla pagina di ricaricarsi!
        event.preventDefault(); 
        
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        
        // Seleziona tutte le "domande"
        const questions = quizForm.querySelectorAll(".quiz-question");

        // Loop per ogni domanda
        questions.forEach(function(questionDiv) {
            const questionNumber = questionDiv.dataset.question; // es. "1"
            const questionName = "q" + questionNumber; // es. "q1"
            
            // Trova la risposta selezionata dall'utente
            const selectedRadio = quizForm.querySelector(`input[name="${questionName}"]:checked`);
            
            // Seleziona tutti gli <li> di questa domanda per lo stile
            const allOptions = questionDiv.querySelectorAll("li");
            
            // Resetta stili precedenti
            allOptions.forEach(function(li) {
                li.classList.remove("correct", "incorrect");
            });

            if (selectedRadio) {
                const userAnswer = selectedRadio.value;
                const correctAnswer = correctAnswers[questionName];
                
                const selectedLi = selectedRadio.closest("li");

                if (userAnswer === correctAnswer) {
                    // Risposta CORRETTA
                    score++;
                    selectedLi.classList.add("correct");
                } else {
                    // Risposta SBAGLIATA
                    selectedLi.classList.add("incorrect");
                    
                    // Mostra anche quella giusta
                    const correctRadio = questionDiv.querySelector(`input[value="${correctAnswer}"]`);
                    if (correctRadio) {
                        correctRadio.closest("li").classList.add("correct");
                    }
                }
            }
        });

        // Mostra il punteggio finale
        divRisultati.textContent = `Il tuo punteggio è: ${score} su ${totalQuestions}`;
        
        // Aggiungi una classe per colorare lo sfondo del risultato
        if (score >= totalQuestions / 2) {
            divRisultati.className = "buono";
        } else {
            divRisultati.className = "scarso";
        }
    });

});