
var hotOrCold = {

	init: function () {
		guessInput = document.getElementById("guess");
		guessInput.focus();
		submitButton = document.getElementById("submitBtn");
		newGameButton = document.getElementById("newGameBtn");
		visuals = document.getElementById("visuals");
		tempLevel = document.getElementById("slide");

		this.resetter();
	},

	resetter: function ()  {
		/// Declaration of variables ///
		counter = 0;
		verifiedGuess = 0;
		oldVerifiedGuess = 0;
		randomGuess = 0;

		guessInput.value = "";
		slide.value = 0;
		visuals.innerHTML = "Whenever you're ready, BOSS!";

		// Calls random number generator and assigns to answer
		answer = this.generateRandomNumber(); 

		/// CHEAT: Show answer! ///
		console.log("Secret answer: " + answer);

		/* Set click handlers */
		submitButton.onclick = this.beginProcess; // Begins Game
		newGameButton.onclick = this.showSubmitBtn; // New Game
	},

	generateRandomNumber: function () {

		// generate random number
		var answer = Math.floor( Math.random() * 101 );
		return answer;
	},

	beginProcess: function () {
		oldVerifiedGuess = verifiedGuess;
		//verifiedGuess = guessInput.value;
		console.log("old guess: " + oldVerifiedGuess);
		

		/// Validify user input ///
		/* Callng checkValid function */
		verifiedGuess = hotOrCold.checkValidity();
		console.log("new guess: " + verifiedGuess);
		
		if (verifiedGuess) { // If guess is OK		
			
			// Increment counter
			counter ++;

			// Compare answer with guess
			hotOrCold.compare(verifiedGuess, oldVerifiedGuess); // Calling compare function
		}	
	},

	checkValidity: function () {
		// Get and assign user's guess
		var randyGuess = guessInput.value;
		console.log("Received Randy guess: " + randyGuess);
		
		/// Validate user guess ///
		/* If guess is an integer */
		if ( parseFloat(randyGuess) == parseInt(randyGuess) && !isNaN(randyGuess) ) {
			if ( randyGuess < 0 || randyGuess > 100 ) { // if guess is a negative integer
				console.log("Invalid Input! Range is: 0 - 100");
				alert("Invalid Input! Range is: 0 - 100");
			} else { // guess is OK
				console.log("Valid Randy guess: " + randyGuess);
				return randyGuess;	
			}
			
		} else { /* guess is not an integer */
			alert("Invalid Input!!!. Input a WHOLE NUMBER (e.g 1, 2, 3...)");
			guessInput.value = "";
			console.log("Invalid Randy guess: " + randyGuess);
			return 0;
		}
	},

	compare: function (verifiedGuess, oldVerifiedGuess) {
		// Call setMaxTemp and setCurrentTemp
		slide.max = this.setMaxTemp(); // sets max value for the input [type=range] element
		console.log("slide max temp: " + slide.max);
		slide.value = this.setcurrentTemp(); // sets current value for the input [type=range] element
		console.log("slide current temp: " + slide.value);

		// Check if guess is answer
		if (verifiedGuess != answer) { // wrong guess
			// compare proximity of new and previous guess with the answer
			var old = Math.abs(oldVerifiedGuess - answer);
			var current = Math.abs(verifiedGuess - answer);
			console.log("old diff: " + old);
			console.log("current diff: " + current);

			

			if (old < current) { // distance from answer is increasing
				console.log("cold");

				visuals.innerHTML = "Cold!";
				guessInput.value = ""; // clear input field
				
			} else if (current < old) { // distance from answer is decreasing
				console.log("hot");

				visuals.innerHTML = "Hot!!!";
				guessInput.value = ""; // clear input field
				
			} else { // distance is the same
				console.log("lukewarm. guess cat's outer the bag");

				visuals.innerHTML = "Lukewarm Boss. Now how smart where you?";
				guessInput.value = ""; // clear input field
				
			}
			
		} else { // correct guess
			console.log("Calling correctGuess()");
			hotOrCold.correctGuess(); // calls correct guess function
		}
	},

	setMaxTemp: function () { // calculates the max temp based on secret answer
		var maxTemp = Math.max( Math.abs(100 - answer), answer );
		return maxTemp;
	},
	
	setcurrentTemp: function () { // calculates current temp
		var maxTemp = this.setMaxTemp();
		var currentTemp = maxTemp - Math.abs(answer - verifiedGuess);
		return currentTemp;
	},


	correctGuess: function () {
		
		if(counter === 1) { // correct answer at first guess
			visuals.innerHTML = "Correct guess at first trial! Genius!!!";
			console.log("Correct guess, at first trial! Brilliant!!!");
		} else {
			visuals.innerHTML = "Correct guess. Number of trials: " + counter + " trials.";
			console.log("Correct guess. Number of trials: " + counter + " trials.");
		}

		hotOrCold.hideSubmitBtn();
	},

	hideSubmitBtn: function () { // hides submit button (called when answer is guessed correctly)
		submitButton.style.display = 'none';
	},

	showSubmitBtn: function() { // shows submit button (called when a new game begins)
		submitButton.style.display = 'inline-block';

		hotOrCold.resetter(); // resets everything
	}

};

window.onload = hotOrCold.init();

