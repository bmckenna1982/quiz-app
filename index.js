'use strict';

const STORE = [
    {id: cuid(), name:'Patrick Kane', description: 'was the 1st overall pick in the 2007 NHL draft. He\'s won 3 Stanely cups and was the Conn Smythe Trophy winner for the 2012-12 playoffs.', options: ['Patrick Kane', 'Jonathan Toews', 'Sidney Crosby', 'Evander Kane']},
    {id: cuid(), name:'Anze Kopitar', description: 'was the first Slovenian player to reach the NHL, He\'s won 2 Stanley cups and has won the Selke Trophy twice.', options: ['Zdeno Chara', 'Marian Hossa', 'Anze Kopitar', 'Marian Gaborik']},
    {id: cuid(), name:'Connor McDavid', description: 'was the 1st overall pick in the 2015 NHL draft. In 2016-17 season he won the Art Ross Trophy, Ted Lindsay Award, and Hart Trophy, then in 2017-18 won the Art Ross Trophy and Ted Lindsay Award again.', options: ['Nathan MacKinnon', 'Connor McDavid', 'Auston Matthews', 'Nail Ykupov']},
    {id: cuid(), name:'Marc Andre Fluery', description: 'was the 1st overall pick in the 2003 NHL draft. He\'s won 3 Stanley cups and has been a 4 time allstar selection.', options: ['Henrik Lundqvist', 'Jonathan Quick', 'Tuukka Rask', 'Marc Andre Fluery']},
    {id: cuid(), name:'Sidney Crosby', description: 'was the 1st overall pick in the 2005 NHL draft. He\'s won 3 Stanely cups and 2 Conn Smythe Trophies and was the youngest captain to ever win the Stanley Cup.', options: ['Alex Ovechkin', 'Sidney Crosby', 'Patrick Kane', 'Jonathan Toews']},
    {id: cuid(), name:'Alex Ovechkin', description: 'was the 1st overall pick in the 2004 NHL draft. He\'s won the Stanley Cup once and was the Conn Smythe Trophy winner when he did. He is an 8 time Maurice Richard Trophy winner.', options: ['Alex Ovechkin', 'Steven Stamkos', 'Sidney Crosby', 'Ilya Kovalchuk']},
    {id: cuid(), name:'Jonathan Toews', description: 'was the 3rd overall pick in the 2006 NHL draft. He\'s won 3 Stanley Cups and was the Conn Smythe Trophy winner for the 2009-10 playoffs. He was also teh fastest player ever to be made captain after only 64 games.', options: ['Patrick Kane', 'Anze Kopitar', 'Jonathan Toews', 'Sidney Crosby']},
    {id: cuid(), name:'Auston Matthews', description: 'was the 1st overall pick in the 2016 NHL draft and won the Calder Trophy in 2016. He also holds the USA U-18 records for both goals and points in a season.', options: ['Connor McDavid', 'Nail Yakupov', 'Nathan MacKinnon', 'Auston Matthews']},
];

let questionNumber = 0;
let score = 0;

function onLoad() {    
    //set or reset the progress
    //show the welcome screen
    // $('.js-welcomeScreen').css('display', 'block');
    renderWelcomePage();
    //setup event listeners
    listen();
    console.log('onLoad ran');
}

function startQuiz() {    
    //clear welcome screen
    // $('.js-welcomeScreen').css('display', 'none');//input HTML manually in code
    //set question number
    // questionNumber = 0;    ***shouldn't be necesary, resetting value in retake function
    //set question and answers in form
    renderQuestionPage(questionNumber);
    // nextQuestion(questionNumber);   
    console.log('started quiz');
}

function nextQuestion() {    
    //test to see if there are any more questions    
    if (questionNumber !== STORE.length) {
    //if so render the questions page
        renderQuestionPage(questionNumber);
    } else {
        renderCompletePage();
    }
    //if all questions were answered render Complete page
        
}


function populateAnswers(number) {
    //loop through the options of object in the store
    //build form creating labels each loop
    for (let i = 0; i < 4; i ++) {
        let inputName = "answer" + i; 
        //pass each option to the label text for the answer button              
        $('label[for='+inputName+']').find("span").text(STORE[number].options[i]);        
    }
    console.log('populateAnswers ran')
}

function renderWelcomePage() {
    //create the section for welcomeScreen
    //display the section in .quiz
    let sectionHTML = `
        <section class="js-welcomeScreen welcomeScreen">            
            <h2>Prove your self by trying to identify these NHL stars by their accomplishments.</h2>
            <button class="js-startButton startButton">Start Quiz</button>
        </section>
    `
    $('.quizz').html(sectionHTML);

    console.log('renderWelcome ran')
}

function renderQuestionPage(number) {
    //create progess and score section in header
    renderProgress(number);
    //create the section for welcomeScreen
    //display the section in .quiz
    const currentOptions = STORE[number].options
    let answer = STORE[number].name
    let sectionHTML = `
        <section class="js-questionScreen questionScreen">
            <div class="question0 box">
                <h2>This player ${STORE[number].description}</h2>
            </div>
            <form action='#' method="POST" class="question-form js-question-form">
                <fieldset>
                    ${currentOptions.map((answer, index) => {
                        return `
                        <div class="answer-${index} answerOption">                            
                            <input class="radio-input" type="radio" id="answer-${index}" value="${answer}" name="answer" required>
                            <label for="answer-${index}">${answer}</label>
                        </div>
                        `
                    }).join('')}                    
                </fieldset>
                <button type="submit" class="js-submitButton submitButton">Submit</button>
            </form>                            
        </section>
    `
    $('.quizz').html(sectionHTML);    

    console.log('renderWelcome ran')
}

function renderProgress(number) {
    //add div for progress to header
    let totalQ = STORE.length
    let progressHTML = `                  
            <ul>
                <li>Questions: ${number +1} / ${totalQ}</li>
                <li>Score: ${score} </li>
            </ul>        
    `
    $('.progress').html(progressHTML);
}

function validateAnswer() {
    //stop the default submit action
    event.preventDefault();
    //get which radio was selected and store to variable
    let selection = $('input:checked');
    let answer = selection.val();    
    //check that text against the STORE for the correct answer
    let result = answer === STORE[questionNumber].name;
    //pass validate value to showResults
    console.log(result);
    renderResults(result);
    questionNumber++;
    console.log('validateAnswer ran');
}

function renderResults(result) {
    //create the section for resultsScreen
    //render results screen
    let player = '';
    player = STORE[questionNumber].name
    let description = STORE[questionNumber].description
    let resultDeclaration = '';
    if (result == true) {
        resultDeclaration = "Correct!"
        score += 10
        renderProgress(questionNumber);
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

    $('.quizz').html(resultsHTML);
}

function renderCompletePage() {
    let possibleScore = STORE.length * 10;
   let scoreDescription = "";
    if ( score < 40) {
        scoreDescription = 'Maybe soccer is more your sport?'
   } else if ( score < 60) {
        scoreDescription = 'You are a casual hockey fan!'
   } else {
        scoreDescription = 'You are a real hockey fan!'
   }
    let completeHTML = `
        <section class="js-completeScreen completeScreen"> 
            <div class="completeContainer">
                <h2>Congratulations!</h2>
                <p>You scored ${score} out of ${possibleScore}! 
                <br>${scoreDescription}</p>
                <p>Want to try again?</p>                
            </div>
            <button type="button" class="retakeButton js-retakeButton">Retake Quiz</button>
        </section>
    `
    $('.quizz').html(completeHTML);
}

function retakeQuiz() {
    score = 0;
    questionNumber = 0;
    startQuiz();

}

function listen() {
    $(".quizz").on('click', '.js-startButton', startQuiz );
    $(".quizz").on('submit', '.js-question-form', validateAnswer );
    $(".quizz").on('click', '.js-nextButton', nextQuestion );
    $(".quizz").on('click', '.js-retakeButton', retakeQuiz );
    console.log('listen ran')
}

$(onLoad);