$(document).keypress(event => {
    // start game by pressing 'A'
    if (event.key.toUpperCase() === 'A') {
        // remove 'A' spamming
        $(document).unbind();

        startGame();
    }
});

function startGame() {
    // initialize game
    let level = 1;
    $("#level-title").text(`Level ${level}`);

    // creates color sequence to follow
    let colorSequence = [];

    // gets all buttons colors
    const colors = ["red", "blue", "green", "yellow"];

    // animate color to press
    animateButton(addRandomColor(colorSequence, colors));

    let colorNum = 0;
    $(".btn").click(event => {
        let playerColor = event.target.id;
        animateButton(playerColor);

        if (playerColor === colorSequence[colorNum]) {
            ++colorNum;
            if (colorNum === colorSequence.length) {
                // delay before changing level
                setTimeout(() => {
                    colorNum = 0;
                    ++level;
                    $("#level-title").text(`Level ${level}`);
                    // animate next color to press
                    animateButton(addRandomColor(colorSequence, colors));
                }, 1000);
            }

        } else {
            colorSequence = [];
            endGame();
        }
    });

}

// randomly choose a color and added to the sequence
function addRandomColor(colorSequence, colors) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    colorSequence.push(color);

    console.log(color);

    return color;
}

// handle game over 
function endGame() {
    // listen for key input to reset the game
    $(document).keypress(() => {
        startGame();
    });

    let overAudio = new Audio("sounds/wrong.mp3");
    overAudio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

// animate clicked button and play corresponding audio
function animateButton(id) {
    let colorAudio = new Audio(`sounds/${id}.mp3`);
    colorAudio.play();
    $(`#${id}`).addClass("pressed");
    setTimeout(() => {
        $(`#${id}`).removeClass("pressed");
    }, 100);
}