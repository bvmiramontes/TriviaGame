$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='image/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='image/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 8) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who sang the Ghostbusters theme song?", "How many Rubik's Cubes have been sold since 1980?", "If you grew up in the 1980s, you probably had a VHS VCR. What does VHS stand for?", "When jelly shoes, or jellies, came out in the early 1980s, how much could you buy a pair for?", "What was E.T.'s favorite candy?", "This character was presented as the world's first computer-generated TV host. Who is he?", "What planet does Yoda live on?", "Who sang the scorching love theme from Top Gun called Take My Breath Away?", "What was Madonna's first number-one song on the Billboard Hot 100?"];
var answerArray = [["Prince", "Ray Parker Jr.", "Michael Jackson", "El DeBarge"], ["122 million","200 million","35 million","350 million"], ["Video Home System", "Versatile Home System", "Virtual Head System", "Video Head System"], ["Less than 20 bucks","Less than a dollar","Less than 10 bucks","Less than five bucks"], ["Skittle", "Mars", "Reeses Pieces", "M&M's"], ["Mad Max","Maximilian Prime","Max Headroom","Maximus Awesome"], ["Alderaan", "Hoth", "Tatooine", "Dagobah"], ["Missing Persons","Madonna","Berlin","Bonnie Tyler"], ["Borderline","True Blue","Papa Don't Preach","Like a Virgin"]];
var imageArray = ["<img class='center-block img-right' src='image/ghostbusters.png'>", "<img class='center-block img-right' src='image/rubicscube.png'>", "<img class='center-block img-right' src='image/vcrboy.png'>", "<img class='center-block img-right' src='image/jellyshoes.png'>", "<img class='center-block img-right' src='image/etcandy.png'>", "<img class='center-block img-right' src='image/maxheadroom.png'>", "<img class='center-block img-right' src='image/yoda.png'>", "<img class='center-block img-right' src='image/topgun.png'>", "<img class='center-block img-right' src='image/madonna.png'>"];
var correctAnswers = ["B. Ray Parker Jr.", "D. 350 million", "C. Virtual Head System", "B. Less than a dollar", "C. Reeses Pieces", "C. Max Headroom", "D. Dagobah", "C. Berlin", "D. Like a Virgin"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
