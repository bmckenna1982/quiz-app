'use strict';

const STORE = [
    {id: cuid(), name:'Patrick Kane', description: 'This player was the 1st overall pick in the 2007 NHL draft. He\'s won 3 Stanely cups and was the Conn Smythe Trophy winner for the 2012-12 playoffs.', options: ['Patrick Kane', 'Jonathan Toes', 'Sidney Crosby', 'Evander Kane']},
    {id: cuid(), name:'Anze Kopitar', description: 'This player was the first Slovenian player to reach the NHL, He\'s won 2 Stanley cups and has won the Selke Trophy twice.', options: ['Zdeno Chara', 'Marian Hossa', 'Anze Kopitar', 'Marian Gaborik']},
    {id: cuid(), name:'Connor McDavid', description: 'This player was the 1st overall pick in the 2015 NHL draft. In 2016-17 season he won the Art Ross Trophy, Ted Lindsay Award, and Hart Trophy, then in 2017-18 won the Art Ross Trophy and Ted Lindsay Award again.', options: ['Nathan MacKinnon', 'Connor McDavid', 'Auston Matthews', 'Nail Ykupov']},
    {id: cuid(), name:'Marc Andre Fluery', description: 'This player was the 1st overall pick in the 2003 NHL draft. He\'s won 3 Stanley cups and has been a 4 time allstar selection.', options: ['Henrik Lundqvist', 'Jonathan Quick', 'Tuukka Rask', 'Marc Andre Fluery']},
    {id: cuid(), name:'Sidney Crosby', description: 'This player was the 1st overall pick in the 2005 NHL draft. He\'s won 3 Stanely cups and 2 Conn Smythe Trophies and was the youngest captain to ever win the Stanley Cup.', options: ['Alex Ovechkin', 'Sidney Crosby', 'Patrick Kane', 'Jonathan Toews']},
    {id: cuid(), name:'Alex Ovechkin', description: 'This player was the 1st overall pick in the 2004 NHL draft. He\'s won the Stanley Cup once and was the Conn Smythe Trophy winner when he did. He is an 8 time Maurice Richard Trophy winner.', options: ['Alex Ovechkin', 'Steven Stamkos', 'Sidney Crosby', 'Ilya Kovalchuk']},
    {id: cuid(), name:'Jonathan Toews', description: 'This player was the 3rd overall pick in the 2006 NHL draft. He\'s won 3 Stanley Cups amd was the Conn Smythe Trophy winner for the 2009-10 playoffs. He was also teh fastest player ever to be made captain after only 64 games.', options: ['Patrick Kane', 'Anze Kopitar', 'Jonathan Toews', 'Sidney Crosby']},
    {id: cuid(), name:'Auston Matthews', description: 'This player was the 1st overall pick in the 2016 NHL draft and won the Calder Trophy in 2016. He also holds the USA U-18 records for both goals and points in a season.', options: ['Connor McDavid', 'Nail Yakupov', 'Nathan MacKinnon', 'Auston Matthews']},
];

function onLoad() {    
    //set or reset the progress
    //show the welcome screen
    $('.js-welcomeScreen').css('display', 'block');
    //setup event listeners
    listen();
    console.log('onLoad ran');
}

function startQuiz() {
    //clear welcome screen
    $('.js-welcomeScreen').css('display', 'none');
    $('.js-questionScreen').css('display', 'flex');
    //show form 
    //set question and answers in form
    console.log('started quiz');
}

function nextQuestion() {
    //select question from store
    //display question and possible answers
}

function results() {
    //remove questions
    //show results and next button
}

function renderScreen() {
    //draw the screen
}

function listen() {
    $(".js-startButton").on('click', startQuiz );
    console.log('listen ran')
}

$(onLoad);