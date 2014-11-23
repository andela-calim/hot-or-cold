
window.onload = function () {
	reset();
}

var reset = function ()  {
	counter = 0;
	verifiedGuess = 0;
	oldVerifiedGuess = 0;
	randomGuess = 0;
	guessInput.value = "";
	hotOrCold.innerHTML = "Whenever you're ready, BOSS!";

	answer = generateRandomNumber();
	console.log("answer: " + answer);
// 	beginProcess(verifiedGuess);
}
var guessInput = document.getElementById("guess");
var submitButton = document.getElementById("submitBtn");
var newGameButton = document.getElementById("newGameBtn");
var hotOrCold = document.getElementById("hot-cold")
var tempLevel = document.getElementById("slide");

var generateRandomNumber = function () {

	// set random number to a global variable
	var answer = Math.floor( Math.random() * 101 );
	return answer;
}

var beginProcess = function () {


	oldVerifiedGuess = verifiedGuess;

	verifiedGuess = guessInput.value;
	// Receive input from user
	// alert(answer);
	// randomGuess = prompt("Guess the number!", "Enter number");
	console.log("answer is: " + answer);

	// Validify user input, calling checkValid function
	verifiedGuess = checkValid();
	
	if (verifiedGuess) {

		
		console.log("old verifiedG:" + oldVerifiedGuess);
		console.log("verifiedG:" + verifiedGuess);

		counter ++;

		// Compare answer with guess
		compare (verifiedGuess, oldVerifiedGuess);
	}	
}

var  checkValid = function () {
	var randyGuess = guessInput.value;
	if ( parseFloat(randyGuess) == parseInt(randyGuess) && !isNaN(randomGuess) ) { 
		return randyGuess;
	} else { 
		alert("Input a number (e.g 1, 2, 3...)");
		guessInput.value = "";
		return 0;
	}
}

var compare = function (verifiedGuess, oldVerifiedGuess) {

	// Check if guess is answer
	if (verifiedGuess != answer) { // wrong guess

		// compare proximity of new and previous guess with the answer
		var old = Math.abs(oldVerifiedGuess - answer);
		var current = Math.abs(verifiedGuess - answer);
		console.log("old diff: " + old);
		console.log("current diff: " + current);

			slide.max = setMaxTemp();
			console.log("slide max temp: " + slide.max);
			slide.value = setcurrentTemp();
			console.log("slide current temp: " + slide.value);

		if (old < current) { // distance from answer is increasing
			console.log("cold");

			hotOrCold.innerHTML = "Cold!";
			guessInput.value = "";
			
			// oldVerifiedGuess = verifiedGuess;
			// beginProcess(verifiedGuess);
		} else if (current < old) { // distance from answer is decreasing
			console.log("hot");

			hotOrCold.innerHTML = "Hot!!!";
			guessInput.value = "";
			
			// oldVerifiedGuess = verifiedGuess;
			// beginProcess(verifiedGuess);
		} else {

			hotOrCold.innerHTML = "Lukewarm Boss. Now how smart where you?";
			console.log("lukewarm. guess cat's outer the bag");
			guessInput.value = "";
			
			// beginProcess(verifiedGuess);
		}
		
	} else { // correct guess

		console.log("Calling correctGuess()");
		correctGuess();
	}
}

var correctGuess = function () {

	// Correct answer at first guess
	if(counter === 1) {
		hotOrCold.innerHTML = "Correct guess at first trial! Genius!!!";
		console.log("Correct guess, at first trial! Brilliant!!!");
	} else {
		hotOrCold.innerHTML = "Correct guess. Number of trials: " + counter + "trials.";
		console.log("Correct guess. Number of trials: " + counter + "trials.");
	}

	hideSubmitBtn();
}

var hideSubmitBtn = function () {
	submitButton.style.display = 'none';
}

var showSubmitBtn = function() {
	submitButton.style.display = 'inline-block';

	reset();
}

var setMaxTemp = function () {
	var maxTemp = Math.max( Math.abs(100 - answer), answer );
	return maxTemp;
}
var setcurrentTemp = function () {
	var maxTemp = setMaxTemp();
	var currentTemp = maxTemp - Math.abs(answer - verifiedGuess);
	return currentTemp;
}

/*********************************************/
/*Set click handlers
/*********************************************/
submitButton.onclick = beginProcess;
newGameButton.onclick = showSubmitBtn;