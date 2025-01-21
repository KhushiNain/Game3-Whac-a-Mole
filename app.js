const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const modeButton = document.querySelector('#hard-mode')

let result =0;
let currentTime = 60;
let hitPosition; 
let timerId= null
let hardmode = false 


function randomSquare() {
    squares.forEach(square => {
      square.classList.remove('mole','bonus-mole');
    });
  
    let randomSquare = squares[Math.floor(Math.random() * 9)];
    
    //  10% percentage chance for the appearance of bonus -mole
    if (Math.random() < 0.1) {
        randomSquare.classList.add('bonus-mole');
        hitPosition = randomSquare.id;
    } else {
        randomSquare.classList.add('mole');
        hitPosition = randomSquare.id;
    }
  }

//   Hard-mode
function hardModeActivate() {
    if (result % 10 === 0 && result !== 0) { 
        currentTime = Math.max(10, currentTime - 5); 
        timeLeft.textContent = currentTime;
    }
}
modeButton.addEventListener('click', () => {
    hardmode = !hardmode;
    console.log("Hard Mode Toggled:", hardmode); // Debug log
    if (hardmode) {
        modeButton.textContent = "SafeMode";
        
    } else {
        modeButton.textContent = "HardMode";
    }
    console.log("Button Text:", modeButton.textContent); // Debug log
});

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
        if (square.classList.contains('bonus-mole')) {
            result += 5;  
        } else {
            result++;
        }
        if (hardmode){
            hardModeActivate()
        }
        score.textContent = result
        hitPosition = null
    }
    })
})
  
// DIFFERENT INTERVAL OF SPEED FOR MOLE APPEARANCE 
function moveMole() {
    timerId = setInterval(randomSquare, Math.random() * (1200 - 300) + 300)
}
  
moveMole()


function countDown(){
    currentTime--
    timeLeft.textContent= currentTime

    if(currentTime==0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
   alert('GAME OVER! Your final score is ' + result)
    }
}

let countDownTimerId= setInterval(countDown,1000)