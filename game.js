// Creating arrays


console.log("If u r reading this it means u r on the right track dude keep working 🤗😉😘");


buttonColors=['red','green','blue','yellow'];
gamepattern=[];
userClickedPattern=[];

var level=0;
var start=false;

$("body").keypress(function keyboard(event) {

      if(!start){
        $(".rule").fadeOut();

        setTimeout(function () {
          newSequence();
          console.log(event.key);
          start=true;
        }, 1200);

      }

});

function newSequence() {

  $("h1").text("Level   "+level++);

  var randomNum =  ( ( Math.floor(Math.random()*4) )  );
  gamepattern.push(buttonColors[randomNum]);
  $("#"+buttonColors[randomNum]).fadeOut(100).fadeIn(100);

  playSound(buttonColors[randomNum]);        // call to a function
  animatePress(buttonColors[randomNum]);     // call to a function

}


function playSound(name){
  var audio = new Audio("sounds\\"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {

    $("."+currentColor).addClass("pressed");

    setTimeout(function () {
      $("."+currentColor).removeClass('pressed');
    }, 100);
}


$(".btn").click(function(event){

  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAns(userClickedPattern.length-1);

});



function checkAns(i)
{

  var result="success";
  console.log(gamepattern);
  console.log(userClickedPattern);

      if(gamepattern[i] === userClickedPattern[i]){

            if(gamepattern.length === userClickedPattern.length){

                setTimeout(function () {
                userClickedPattern=[];
                console.log(userClickedPattern);
                newSequence();
              }, 1000);

            }
        }
        else{
          console.log("failed");
          restart();
        }
}


function restart() {


  playSound("wrong");
  $("body").addClass("game-over");
  userClickedPattern=[];


  setTimeout(function () {
        $("body").removeClass("game-over");  }, 200);

  setTimeout(function(){$("h1").text("Game Over \n the correct pattern is : "+gamepattern); }  ,600);

  setTimeout(function () {

    level=0;
    gamepattern=[];
    start=false;
    $(".rule").fadeIn();
    $("h1").text("Press A Key to Start");
  }, 3000);

}
