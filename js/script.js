// score
let score = 0;
const scoreWindow = document.getElementsByClassName('score__result')[0];
scoreWindow.innerHTML = score;
// rules
const rules = document.getElementsByClassName('rules__window')[0];
rules.style.display = 'none';
const rulesButton = document.getElementsByClassName('rules__button')[0]
const rulesCloseButton = document.getElementsByClassName('rules__close__button')[0]
const darkBackground = document.getElementsByClassName('background')[0]
rulesButton.addEventListener('click', click, false);
function click() {
    rules.style.display = 'unset';
    setTimeout (function () {
        rulesButton.removeEventListener('click', click, false);
        darkBackground.addEventListener('click', unclick, false);
        rulesCloseButton.addEventListener('click', unclick, false);
    }, 100);
}
function unclick() {
    rules.style.display = 'none';
    setTimeout (function () {
        rulesButton.addEventListener('click', click, false);
        darkBackground.removeEventListener('click', unclick, false);
        rulesCloseButton.removeEventListener('click', unclick, false);
    }, 100);
}
// game
const circleButton = document.getElementsByClassName('circle__button');
const triangle = document.getElementsByClassName('triangle')[0];
const result = document.getElementsByClassName('result')[0];
const resultButton = document.getElementsByClassName('result__button')[0]; 
const resultVerdict = document.getElementsByClassName('result__verdict')[0]; 
const resultCircle = document.getElementsByClassName('result__circle')[0]; 
result.style.display = 'none';
const items = ['paper', 'scissors', 'rock'];
const colors = ['blue', 'yellow', 'red'];
let color = '';
let choice = '';
let random = '';
let win = '';
function resultAdd (color) {
    resultCircle.classList.add('circle__button--' + color);
    resultCircle.getElementsByClassName('circle')[0].classList.add('circle--' + color);
}
function resultRemove (color) {
    resultCircle.classList.remove('circle__button--' + color);
    resultCircle.getElementsByClassName('circle')[0].classList.remove('circle--' + color);
}
function game(event) {
    let item = 0;
    for (let i = 0; i < circleButton.length-1; i++) {
        if (event.path[2].classList[1].includes(colors[i])) {
            choice = items[i];
            item = i;
        }
    }
    random = items[Math.floor(Math.random() * items.length)];
    if ((choice == 'rock' && random == 'scissors') || (choice == 'paper' && random == 'rock') || (choice == 'scissors' && random == 'paper')) {
        win = 'win';
        score += 1;
        scoreWindow.innerHTML = score;
    } else if (choice == random) {
        win = 'draw';
    } else {
        win = 'lose';
    }
    for (let i = 0; i < circleButton.length-1; i++) {
        circleButton[i].style.display = 'none';
    }
    triangle.style.display = 'none';
    result.style.display = 'unset';
    circleButton[item].style = 'position: absolute; left:-100px; display: unset; transform: scale(2) rotate(360deg); transition: all 0.3s linear;';
    resultVerdict.innerHTML = 'you ' + win;
    resultCircle.getElementsByTagName('img')[0].src = 'images/icon-' + random + '.svg';
    color = colors[items.indexOf(random)];
    resultAdd(color);
    eventsRemove();
    resultButton.addEventListener('click', function () {
        choice = '';
        random = '';
        win = '';
        result.style.display = 'none';
        triangle.style.display = 'unset';
        resultRemove(color);
        eventsAdd();
        for (let i = 0; i < circleButton.length-1; i++) {
            circleButton[i].style.display = 'unset';
        }
        circleButton[item].style = 'position: relative;';
    }, false);
}
function eventsAdd() {
    for (let i = 0; i < circleButton.length-1; i++) {
        circleButton[i].addEventListener('click', game, false);
    }
}
function eventsRemove() {
    for (let i = 0; i < circleButton.length-1; i++) {
        circleButton[i].removeEventListener('click', game, false);
    }
}
eventsAdd();
