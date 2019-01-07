
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var started = false; 


$(window).keypress(function(){
    if (!started){
    $("h1").text("Level 0");
    nextSequence();
    started = true;
    }
})

$(document).click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log("success");
            
            console.log(userClickedPattern)
            if (userClickedPattern.length === gamePattern.length){
                window.setTimeout(function(){
                    nextSequence();
                }, 1000);
            userClickedPattern = [];
            }
            
        } else {
            console.log("wrong");
            $("body").addClass("game-over");
            playSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            window.setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200)
            startOver();
        }
        
    }

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    window.setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function nextSequence(){
    userClickedPattern = [];
    //choose a random number
    var randomNumber = Math.floor((Math.random()*3)+1);
    //select color from buttonColours using random number
    randomChosenColour = buttonColours[randomNumber]
    //push the color to the gamePattern array
    gamePattern.push(randomChosenColour);
    //make the random color fadein and out
    $("#" + randomChosenColour).fadeOut().fadeIn();
    //play the sound of the random color
    playSound(randomChosenColour);
    //increase the level after a color was created
    level++;
    //display the new level
    $("h1").text("Level " + level);
    console.log(gamePattern)
}

function playSound(name){
    var red = new Audio("sounds/red.mp3");
    var blue = new Audio("sounds/blue.mp3");
    var green = new Audio("sounds/green.mp3");
    var yellow = new Audio("sounds/yellow.mp3");
    var wrong = new Audio("sounds/wrong.mp3");
    
switch(name) {

    case "red":  
                red.play();
                break;
    case "blue":
                blue.play();
                break;
    case "green":
                green.play();
                break;
    case "yellow":
                yellow.play();
                break;
    default:
                wrong.play();
    };
}