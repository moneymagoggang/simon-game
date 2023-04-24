const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []
let userClickedPattern = []
let currentLevel = 0;

function nextSequence() {

   
   userClickedPattern = [];
 
   currentLevel++;
   $("#level-title").text("Level " + currentLevel);
 
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
 
 function animatePress(currentColor) {
   $("#" + currentColor).addClass("pressed");
   setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
   }, 100);
 }





let gameStarted = false;

$(document).keypress(function() {
   if (!gameStarted) { 
     gameStarted = true; 
  
     nextSequence(); 
   }
 });


 function checkAnswer(currentLevel) {

  
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     console.log("success");

   
     if (userClickedPattern.length === gamePattern.length){

  
       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   } else {
      $('h1').text('Game Over, Press Any Key to Restart')
      $('body').addClass('game-over')
      setTimeout(function () {
         $('body').removeClass("game-over");
       }, 100);
      playSound('wrong')
     console.log("wrong");
     startOver()

   }

}

function startOver() {
   gameStarted = false;
   currentLevel = 0;
   gamePattern = []
}


$('#red').click(function () {
   let audio = new Audio('/sounds/red.mp3');
   audio.play();
   $('#red').addClass('pressed')
   setTimeout(function() {
      $('#red').removeClass('pressed');
    }, 100);
  
})

$(".btn").click(function() {

   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
 
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
 });

