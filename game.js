// learning Javascript

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;
var result = true;

function nextSequence(){
started = false;
userClickedPattern=[];
level++;
$("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random()*4);


var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour);
}

$(".btn").click(handler);
function handler(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(){
  if(started === true){
  nextSequence();
}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("right");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }

  else {
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = true;
}
