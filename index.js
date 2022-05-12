var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  // Starts the game by pressing any button.
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  // Identifies the button clicked by the user and adds it to a list so the answer can be checked.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Eveytime the button is clicked, a sound is played and the button is animated.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  // It checks if the answer given by the user is correct and execute the next sequence
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      // If the answer is wrong, the "Wrong Beep" will be played and it is game over.
      playSound("WrongBeep");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over. Press any key to restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  // Elevates the level by 1, Randomly chooses one of the colors, add it to a list, animates the button and plays the sound.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  // Highlights the button when the user clicks on it
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  // Made to play a different sound according to the button.
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function startOver() {
  // Restarts the game
  level = 0;
  gamePattern = [];
  started = false;
}
