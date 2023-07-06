var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function checkAnswer(last_index) {


     if(userClickedPattern[last_index] ===  gamePattern[last_index]){

     console.log("sucess");

        if(userClickedPattern.length == gamePattern.length){
       setTimeout(function(){
         nextSequence();
       }, 1000);
     }
     }
     else {

      playSound("wrong");

      $("body").addClass("game-over");

       $("#level-title").text("Game Over, Press Any Key to Restart");
       started = false;
       level = 0;
       gamePattern = [];

      setTimeout(function(){

        $("body").removeClass("game-over");
      } , 200);

     }
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

  userClickedPattern = [];

   level++;
 $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

   $("#" + currentColour).addClass("pressed");

   setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
   } , 100);

}
