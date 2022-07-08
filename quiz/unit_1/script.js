let songs = [
    {
        title: "ant",
        src: "../../audio/ant.mp3",
        options: [
            {name: "ant", src: "../../img/ant.png", correct: true},
            {name: "apple", src: "../../img/apple.png", correct: false},
            {name: "car", src: "../../img/car.png", correct: false},
            {name: "bag", src: "../../img/bag.png", correct: false}
        ]
    },

    {
        title: "apple",
        src: "../../audio/apple.mp3",
        options: [
            {name: "ball", src: "../../img/ball.png", correct: false},
            {name: "apple", src: "../../img/apple.png", correct: true},
            {name: "car", src: "../../img/car.png", correct: false},
            {name: "cat", src: "../../img/cat.png", correct: false}
        ]
    },
    {
        title: "bag",
        src: "../../audio/bag.mp3",
        options: [
            {name: "bag", src: "../../img/bag.png", correct: true},
            {name: "ball", src: "../../img/ball.png", correct: false},
            {name: "ant", src: "../../img/car.png", correct: false},
            {name: "cat", src: "../../img/cat.png", correct: false}
        ]
    },

    {
        title: "ball",
        src: "../../audio/ball.mp3",
        options: [
            {name: "ant", src: "../../img/ant.png", correct: false},
            {name: "ball", src: "../../img/ball.png", correct: true},
            {name: "car", src: "../../img/car.png", correct: false},
            {name: "cat", src: "../../img/cat.png", correct: false}
        ]
    },
    {
        title: "car",
        src: "../../audio/car.mp3",
        options: [
            {name: "car", src: "../../img/car.png", correct: true},
            {name: "apple", src: "../../img/apple.png", correct: false},
            {name: "bag", src: "../../img/bag.png", correct: false},
            {name: "cat", src: "../../img/cat.png", correct: false}
        ]
    },

    {
        title: "cat",
        src: "../../audio/cat.mp3",
        options: [
            {name: "ant", src: "../../img/ant.png", correct: false},
            {name: "bag", src: "../../img/bag.png", correct: false},
            {name: "car", src: "../../img/car.png", correct: false},
            {name: "cat", src: "../../img/cat.png", correct: true}
        ]
    }
];
let playerContainer = document.querySelector(".playerContainer"),
    player = document.querySelector(".player"),
    grid = document.querySelector(".grid"),
    next = document.querySelector(".next"),
    finalPage = document.querySelector(".finish");
    rightCount = document.querySelector("#rightCount");

    let rightAnswers = 0;
    let wrongAnswers = 0;

let shuffledSongs = shuffle(songs);
    currentIndex = 0;

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function start(){
        player.src = shuffledSongs[0].src;
        player.play();
    }

function showOptions(){
    shuffle(shuffledSongs[currentIndex].options).forEach((option) => {
        const image = new Image(100, 100);
        image.classList.add("img");
        image.src = option.src;
//        const button = document.createElement("button");
//        button.style.backgroundImage = "url(option.src)";
//        button.innerHTML = '<img width="100" height="100" src=' + option.src + '>' + option.name;
        if(option.correct){
            image.dataset.correct = true;

        }
        image.addEventListener("click", selectAnswer);

        grid.appendChild(image);
    });
}

function eraseData(){
    grid.innerHTML = "";
    next.classList.add("hide");
}
function disableButtons(buttons){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}
function selectAnswer(e){
    let button = e.target;
    if(button.dataset.correct){
        rightAnswers ++;
        currentIndex ++;
        next.classList.remove("hide");
        disableButtons(grid.children);
        button.classList.add("correct");
    } else{
        wrongAnswers ++;
        currentIndex ++;
        next.classList.remove("hide");
        disableButtons(grid.children);
        button.classList.add("incorrect");
    }
}
function nextSong(){
    if(shuffledSongs.length > currentIndex){
        eraseData();
        player.src = shuffledSongs[currentIndex].src;
        showOptions();
    } else {
        finish();
    }
}

function finish(){
    rightCount.innerText = rightAnswers + " out of " + songs.length;
//    player.src = "../../audio/andantino.mp3";
    playerContainer.classList.add("hide");
    eraseData();
    finalPage.classList.remove("hide");
}
window.onload = start;
showOptions();
next.addEventListener("click", nextSong);
