'use strict';

const STORE = [
    {name:'Patrick Kane', description: 'was the 1st overall pick in the 2007 NHL draft. He\'s won 3 Stanely cups and was the Conn Smythe Trophy winner for the 2012-13 playoffs.', options: ['Patrick Kane', 'Jonathan Toews', 'Sidney Crosby', 'Evander Kane']},
    {name:'Anze Kopitar', description: 'was the first Slovenian player to reach the NHL, He\'s won 2 Stanley cups and has won the Selke Trophy twice.', options: ['Zdeno Chara', 'Marian Hossa', 'Anze Kopitar', 'Marian Gaborik']},
    {name:'Connor McDavid', description: 'was the 1st overall pick in the 2015 NHL draft. In 2016-17 season he won the Art Ross Trophy, Ted Lindsay Award, and Hart Trophy, then in 2017-18 won the Art Ross Trophy and Ted Lindsay Award again.', options: ['Nathan MacKinnon', 'Connor McDavid', 'Auston Matthews', 'Nail Ykupov']},
    {name:'Marc Andre Fluery', description: 'was the 1st overall pick in the 2003 NHL draft. He\'s won 3 Stanley cups and has been a 4 time allstar selection.', options: ['Henrik Lundqvist', 'Jonathan Quick', 'Tuukka Rask', 'Marc Andre Fluery']},
    {name:'Sidney Crosby', description: 'was the 1st overall pick in the 2005 NHL draft. He\'s won 3 Stanely cups and 2 Conn Smythe Trophies and was the youngest captain to ever win the Stanley Cup.', options: ['Alex Ovechkin', 'Sidney Crosby', 'Patrick Kane', 'Jonathan Toews']},
    {name:'Alex Ovechkin', description: 'was the 1st overall pick in the 2004 NHL draft. He\'s won the Stanley Cup once and was the Conn Smythe Trophy winner when he did. He is an 8 time Maurice Richard Trophy winner.', options: ['Alex Ovechkin', 'Steven Stamkos', 'Sidney Crosby', 'Ilya Kovalchuk']},
    {name:'Jonathan Toews', description: 'was the 3rd overall pick in the 2006 NHL draft. He\'s won 3 Stanley Cups and was the Conn Smythe Trophy winner for the 2009-10 playoffs. He was also teh fastest player ever to be made captain after only 64 games.', options: ['Patrick Kane', 'Anze Kopitar', 'Jonathan Toews', 'Sidney Crosby']},
    {name:'Auston Matthews', description: 'was the 1st overall pick in the 2016 NHL draft and won the Calder Trophy in 2016. He also holds the USA U-18 records for both goals and points in a season.', options: ['Connor McDavid', 'Nail Yakupov', 'Nathan MacKinnon', 'Auston Matthews']},
];

let currentQuestionIndex = 0;
let currentScore = 0;
const SELECTOR = '.quizz';

function onLoad() {    
    //set or reset the progress
    //show the welcome screen    
    renderWelcomePage();
    //setup event listeners
    listen();    
}

function listen() {
    $(SELECTOR).on('click', '.js-startButton', startQuiz );
    $(SELECTOR).on('submit', '.js-question-form', validateAnswer );
    $(SELECTOR).on('click', '.js-nextButton', nextQuestion );
    $(SELECTOR).on('click', '.js-retakeButton', retakeQuiz );    
}

function startQuiz() {    
    //build question form and display
    renderQuestionPage(currentQuestionIndex);     
}

function nextQuestion() {    
    //test to see if there are any more questions    
    if (currentQuestionIndex !== STORE.length) {    
        renderQuestionPage(currentQuestionIndex); //if so render the questions page
    } else {
        renderCompletePage(); //if all questions were answered render Complete page
    }
    
        
}

function renderWelcomePage() {
    //create the section for welcomeScreen    
    let sectionHTML = `
        <section class="js-welcomeScreen welcomeScreen">            
            <h2>Prove your self by trying to identify these NHL stars by their accomplishments.</h2>
            <button class="js-startButton startButton">Start Quiz</button>
        </section>
    `
    renderPage(sectionHTML);
}

function renderQuestionPage(questionIndex) {
    //create progess and score section in header
    renderProgress();
    //create the section for welcomeScreen    
    const currentOptions = STORE[questionIndex].options
    let answer = STORE[questionIndex].name    
   let sectionHTML = `
     <section class="js-questionScreen questionScreen">                    
                    <form action='#' method="POST" class="question-form js-question-form">
                        <fieldset>
                            <legend>
                                <h2>This player ${STORE[questionIndex].description}</h2>
                            </legend>
                            ${currentOptions.map((answer, index) => {
                                return `
                                <label class="answerOption" for="answer-${index}">
                                    <input class="radio-input" type="radio" id="answer-${index}" value="${answer}" name="answer" required>
                                    <span>${answer}</span>
                                </label> 
                                `
                            }).join('')}                    
                        </fieldset>
                        <button type="submit" class="js-submitButton submitButton">Submit</button>
                    </form>                            
                </section>
    `
    renderPage(sectionHTML);
}

function renderProgress() {    
    //update the score description using the current score    
    let progressHTML = `                  
            <ul>
                <li>Questions: ${currentQuestionIndex + 1} / ${STORE.length}</li>
                <li>Score: ${currentScore} out of ${STORE.length}</li>
            </ul>        
    `
    $('.progress').html(progressHTML);
}

function validateAnswer(event) {
    //stop the default submit action
    event.preventDefault();    
    //check the text of the selected radio against the STORE for the correct answer    
    //pass result of test to renderResults    
    renderResults($('input:checked').val() === STORE[currentQuestionIndex].name);
    //increase current question
    currentQuestionIndex++;
}


function renderResults(result) {
    //create the section for resultsScreen
    //render results screen
    let player = STORE[currentQuestionIndex].name
    let description = STORE[currentQuestionIndex].description
    //let {name:player, description} = STORE[currentQuestionIndex]
    let resultDeclaration = '';
    if (result) {
        resultDeclaration = "Correct!"
        currentScore++
        renderProgress(currentQuestionIndex);
    } else {
        resultDeclaration = "Incorrect"
    }
    let resultsHTML = `
        <section class="js-resultScreen resultScreen"> 
            <div class="resultContainer">
                <h2>${resultDeclaration}</h2>
                <p><span class="playerName">${player} </span>${description}</p>                
            </div>
            <button type="button" class="nextButton js-nextButton">Next</button>
        </section>
    `
    renderPage(resultsHTML);
}

function renderCompletePage() {   
   let resultDescription = "";
    if ( currentScore < 4) {
        resultDescription = 'Maybe soccer is more your sport?'
   } else if ( currentScore < 6) {
        resultDescription = 'You are a casual hockey fan!'
   } else {
        resultDescription = 'You are a real hockey fan!'
   }
    let completeHTML = `
        <section class="js-completeScreen completeScreen"> 
            <div class="completeContainer">
                <h2>Congratulations!</h2>
                <p>You scored ${currentScore} out of ${STORE.length}! 
                <br>${resultDescription}</p>
                <p>Want to try again?</p>                
            </div>
            <button type="button" class="retakeButton js-retakeButton">Retake Quiz</button>
        </section>
    `
    renderPage(completeHTML)
}

function renderPage(sectionHTML) {
    $(SELECTOR).html(sectionHTML);
}

function retakeQuiz() {
    currentScore = 0;
    currentQuestionIndex = 0;
    startQuiz();
}

$(onLoad);