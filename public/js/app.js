const pilihanButtons = document.querySelectorAll("button")
const playerWin = document.getElementById("player-win")
const comWin = document.getElementById("com-win")
const drawResult = document.getElementById("draw-result")
const refresh = document.getElementById("refresh-btn")
const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const rockCom = document.getElementById("rock-com")
const paperCom = document.getElementById("paper-com")
const scissorsCom = document.getElementById("scissors-com")
const resultGame = document.getElementById("result-game")


// Bermain
function play(e) {
    const pilihanPlayer = e.target.id
    const pilihanComputer = getPilihanComputer()
    const hasil = getHasil(pilihanPlayer, pilihanComputer)
    tampilPilihanPlayer(pilihanPlayer)
    tampilPilihanComputer(pilihanComputer)
    tampilPemenang(hasil)
}

// Style pilihan player
function tampilPilihanPlayer(pilihanPlayer) {
    if (pilihanPlayer === 'paper') {
        paper.style.backgroundColor = "#C4C4C4"
        paper.style.borderRadius = "1rem"
    } else if (pilihanPlayer === 'rock') {
        rock.style.backgroundColor = "#C4C4C4"
        rock.style.borderRadius = "1rem"
    } else {
        scissors.style.backgroundColor = "#C4C4C4"
        scissors.style.borderRadius = "1rem"
    }
}

//Pilihan computer
function getPilihanComputer() {
    const randomNum = Math.random();
    if (randomNum < 0.34) {
        return 'rock';
    } else if (randomNum <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Style pilihan computer
function tampilPilihanComputer(pilihanComputer) {
    if (pilihanComputer === 'paper') {
        paperCom.style.backgroundColor = "#C4C4C4"
        paperCom.style.borderRadius = "1rem"
    } else if (pilihanComputer === 'rock') {
        rockCom.style.backgroundColor = "#C4C4C4"
        rockCom.style.borderRadius = "1rem"
    } else {
        scissorsCom.style.backgroundColor = "#C4C4C4"
        scissorsCom.style.borderRadius = "1rem"
    }
}

// Result
function getHasil(p, c) {
    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

//Tampilkan Pemenang
function tampilPemenang(hasil) {
    if (hasil === 'player') {
        resultGame.style.visibility = "visible"
        resultGame.style.backgroundColor = "#4C9654"
        resultGame.innerText = "PLAYER 1 WIN"
    } else if (hasil === 'computer') {
        resultGame.style.visibility = "visible"
        resultGame.style.backgroundColor = "#4C9654"
        resultGame.innerText = "COM WIN"
    } else {
        resultGame.style.visibility = "visible"
        resultGame.innerText = "DRAW"
        resultGame.style.backgroundColor = "#035B0C"
    }


}


//Restart Game
function refreshGame() {
    resultGame.style.visibility = "hidden"
    paperCom.style.backgroundColor = "transparent"
    rockCom.style.backgroundColor = "transparent"
    scissorsCom.style.backgroundColor = "transparent"
    paper.style.backgroundColor = "transparent"
    rock.style.backgroundColor = "transparent"
    scissors.style.backgroundColor = "transparent"
}
//Event Listener
pilihanButtons.forEach(pilihButton => pilihButton.addEventListener('click', play));
refresh.addEventListener('click', refreshGame);