window.addEventListener("load", function(){
    let game;

    const startButton = document.querySelector("#start-btn");
    const startButton2 = document.querySelector("#start-btn2")
    const board = document.querySelector("#game-board");
    const restartButton = document.querySelector("#restart-btn");
    const restartButton2 = document.querySelector("#restart-btn2");
    const bgAudio = document.querySelector("#bg-sound")
    const form = document.querySelector("#score-submit")
    const highscore = document.querySelector("#highscore")
    const gameOverBoard = document.querySelector("#game-over");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const formData = new FormData(form);
        const gameScore = game.score;
        const dataToSave = {
            ...Object.fromEntries(formData),
            score: gameScore
        };
        let storedData = JSON.parse(sessionStorage.getItem('scoreData')) || [];
        storedData.push(dataToSave);
        storedData.sort((a, b) => b.score - a.score);
        storedData = storedData.slice(0, 3);
        sessionStorage.setItem('scoreData', JSON.stringify(storedData));
        form.classList.add('hidden');
        renderHighScores();
        highscore.classList.remove('hidden');
    });
    
    function renderHighScores() {
        const storedData = JSON.parse(sessionStorage.getItem('scoreData')) || [];
        const highscoreBoard = document.querySelector("#highscore-board");
    
        highscoreBoard.innerHTML = "";
        storedData.forEach((data, index) => {
            const scoreElement = document.createElement("div");
            scoreElement.textContent = `${index + 1}. ${data.name}: ${data.score}`;
            highscoreBoard.appendChild(scoreElement);
        });
    }
    
    // form.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(form);
    //     const dataArr = [];
    //     const dataToSave = {
    //         ...Object.fromEntries(formData),
    //         score: 0
    //     }
    //     if(dataArr.length < 3) {
    //         dataArr.push(dataToSave)
    //     }
    //     sessionStorage.setItem('scoreData', JSON.stringify(dataArr))
    // })
    
    startButton.addEventListener("click", function(){
        startButton.style.display = "none";
        game = new Game(board);
        game.start();
        listenGameOver();
        bgAudio.play();
    })

    startButton2.addEventListener("click", function(){
        startButton2.style.display = "none";
        game = new Game(board, true);
        game.start();
        listenGameOver();
        bgAudio.play();
    })



    restartButton.addEventListener("click", function(){
        restartButton.style.display = "none";
        game = new Game(board);
        game.start();
        listenGameOver();
        restartButton.style.display = "flex";
        bgAudio.currentTime = 0;
        bgAudio.play();
    })

    restartButton2.addEventListener("click", function(){
        restartButton.style.display = "none";
        game = new Game(board, true);
        game.start();
        listenGameOver();
        restartButton.style.display = "flex";
        bgAudio.currentTime = 0;
        bgAudio.play();
    })

    function listenGameOver() {
        document.addEventListener('game-over', (event) => {
            console.log(event.detail);
    
            let storedData = JSON.parse(sessionStorage.getItem('scoreData')) || [];
    
            const isHighScore = storedData.length < 3 || event.detail.score > storedData[storedData.length - 1].score;
    
            if (isHighScore) {
                form.classList.remove('hidden');
            } else {
                form.classList.add('hidden');
            }
            gameOverBoard.style.display = "flex";
        });
    }
    function renderHighScores() {
        const storedData = JSON.parse(sessionStorage.getItem('scoreData')) || [];
        const highscoreBoard = document.querySelector("#highscore-board");
    
        highscoreBoard.innerHTML = "";
    
        storedData.forEach((data, index) => {
            const scoreElement = document.createElement("div");
            scoreElement.textContent = `${index + 1}. ${data.name}: ${data.score}`;
            highscoreBoard.appendChild(scoreElement);
        });
    }
})