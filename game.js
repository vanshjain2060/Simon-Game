var buttonColours = ["red", "blue", "green", "yellow"]; 

var gamePattern = [];
var userClickedPattern = [];

var count = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];

    $("#level-title").html("Level " +  ++count);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);

    playSound(randomChosenColour);
}

$(".btn").on("click" , function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress" ,function(e){
    if(!started) {
        $("#level-title").text("Level " + count)
        started = true;
        nextSequence();
    }
}); 

function playSound(name) {
    var location = "./sounds/" + name + ".mp3";
    var currAudio = new Audio(location);
    currAudio.play();
}

function animatePress(currentColour) {
    var button = $("." + currentColour);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("Scccess");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart")
        
        startOver();
    }
}

function startOver() {
    count = 0;
    started = false;
    gamePattern = [];
}