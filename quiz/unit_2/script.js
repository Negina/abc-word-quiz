let words = [
    {
        title: "doll",
        src: "../../audio/doll.mp3",
        options: [
            {name: "doll", src: "../../img/doll.png", correct: true},
            {name: "dress", src: "../../img/dress.png", correct: false},
            {name: "car", src: "../../img/car.png", correct: false},
            {name: "egg", src: "../../img/egg.png", correct: false}
        ]
    },

    {
        title: "dress",
        src: "../../audio/dress.mp3",
        options: [
            {name: "elephant", src: "../../img/elephant.png", correct: false},
            {name: "dress", src: "../../img/dress.png", correct: true},
            {name: "doll", src: "../../img/doll.png", correct: false},
            {name: "frog", src: "../../img/frog.png", correct: false}
        ]
    },
    {
        title: "elephant",
        src: "../../audio/elephant.mp3",
        options: [
            {name: "elephant", src: "../../img/elephant.png", correct: true},
            {name: "five", src: "../../img/five.png", correct: false},
            {name: "frog", src: "../../img/frog.png", correct: false},
            {name: "egg", src: "../../img/egg.png", correct: false}
        ]
    },

    {
        title: "egg",
        src: "../../audio/egg.mp3",
        options: [
            {name: "bag", src: "../../img/bag.png", correct: false},
            {name: "egg", src: "../../img/egg.png", correct: true},
            {name: "ant", src: "../../img/ant.png", correct: false},
            {name: "elephant", src: "../../img/elephant.png", correct: false}
        ]
    },
    {
        title: "frog",
        src: "../../audio/frog.mp3",
        options: [
            {name: "doll", src: "../../img/doll.png", correct: false},
            {name: "frog", src: "../../img/frog.png", correct: true},
            {name: "dress", src: "../../img/dress.png", correct: false},
            {name: "ball", src: "../../img/ball.png", correct: false}
        ]
    },

    {
        title: "five",
        src: "../../audio/five.mp3",
        options: [
            {name: "elephant", src: "../../img/elephant.png", correct: false},
            {name: "frog", src: "../../img/frog.png", correct: false},
            {name: "dress", src: "../../img/dress.png", correct: false},
            {name: "five", src: "../../img/five.png", correct: true}
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

let shuffledWords = shuffle(words);
    currentIndex = 0;

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function start(){
        player.src = shuffledWords[0].src;
        player.play();
    }

function showOptions(){
    shuffle(shuffledWords[currentIndex].options).forEach((option) => {
        const image = new Image(100, 100);
        image.classList.add("img");
        image.src = option.src;
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

    var header = document.getElementById("grid");
    var images = header.getElementsByClassName("img");
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("highlight");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" highlight", "");
        }
        this.className += " highlight";
      });
    }

    if (button.dataset.correct){
        rightAnswers ++;
        currentIndex ++;
        next.classList.remove("hide");
        disableButtons(grid.children);
        button.classList.toggle("highlight");
    } else{
        wrongAnswers ++;
        currentIndex ++;
        next.classList.remove("hide");
        disableButtons(grid.children);
        button.classList.toggle("highlight");
    }
}
function nextWord(){
    if(shuffledWords.length > currentIndex){
        eraseData();
        player.src = shuffledWords[currentIndex].src;
        showOptions();
    } else {
        finish();
    }
}

function finish(){
    rightCount.innerText = rightAnswers + " out of " + words.length;
//    player.src = "../../audio/andantino.mp3";
    playerContainer.classList.add("hide");
    eraseData();
    finalPage.classList.remove("hide");
}
window.onload = start;
showOptions();
next.addEventListener("click", nextWord);
