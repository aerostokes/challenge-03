// Add event listener to button to call password creation functions
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");
generateBtn.addEventListener("click", writePassword);


// Add event listener to textarea to select all text content on click
passwordText.addEventListener("click", function () {
  passwordText.select();
  passwordText.setSelectionRange(0,9999);
})

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

// Generate the password
function generatePassword() {
  // Initiate variables and define characters available for password generation
  var numLength, lowerCase, upperCase, numeric, special, inputsOkay = false, answer, fullCharacters = "", passwordArray = [];
  const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericCharacters = '0123456789';
  const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';

  // Ask user for desired length. Exit on cancel.
  numLength = getLength();
  if (numLength == null) return "";
  
  // Ask user what character types to use. Exit on cancel. Repeat question set if no character types were chosen.
  do {
    lowerCase = askUser("Would you like to include \nlowercase letters (a-z)?");
    if (lowerCase == null) return "";
    upperCase = askUser ("Would you like to include \nuppercase letters (A-Z)?");
    if (upperCase == null) return "";
    numeric = askUser ("Would you like to include \nnumbers (0-9)?");
    if (numeric == null) return "";
    special = askUser ("Would you like to include \nspecial characters (!&%'*<~ etc.)? \n");
    if (special == null) return "";
    
    if (lowerCase == "Y" || upperCase == "Y" || numeric == "Y" || special == "Y") inputsOkay = true;
    else alert("You must include at least one input type. Try Again");
  } while (inputsOkay == false);

  // For each user selected character type, add a randomly selected character to the password. This ensures that the password will contain at least one of each requested character type.
  // Insert that character at a random location in the password to reduce pattern formation.
  // For each user selected character type, add that character set to fullCharacters for use in next step.
  if (lowerCase == "Y") {
    fullCharacters = fullCharacters + lowerCharacters;
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]);
  }
  if (upperCase == "Y") {
    fullCharacters = fullCharacters + upperCharacters;
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, upperCharacters[Math.floor(Math.random() * upperCharacters.length)]);
  }
  if (numeric == "Y") {
    fullCharacters = fullCharacters.concat(numericCharacters);
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, numericCharacters[Math.floor(Math.random() * numericCharacters.length)]);
  }
  if (special == "Y") {
    fullCharacters = fullCharacters.concat(specialCharacters);
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
  }

  // Complete the remaining length of passwordArray by inserting random characters from fullCharacters at random locations.
  for (var i = passwordArray.length; i < numLength; i++) {
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, fullCharacters[Math.floor(Math.random() * fullCharacters.length)]);
  }

  return passwordArray.join("");
}

// Ask user for desired length. Exit on cancel. Repeat prompt if not a number between 8 and 128.
var getLength = function (strQuestion = "Enter a character length between 8 and 128: ", repeat = false) {
  answer =  prompt(strQuestion);
  if (answer === null) return;
  answer = Number(answer);
  if (!(answer >= 8) || !(answer <= 128)) {
    if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
    getLength(strQuestion, true);
  }
  return answer;
}

// Ask user a Y/N question (lower case answers acceptable). Exit on cancel. Repeat prompt if not a Y or N answer.
var askUser = function (strQuestion, repeat = false) {
  answer = prompt(strQuestion + "\n\nY/N:", "Y");
  if (answer == null) return;
  answer = answer.toUpperCase();
  if (answer != "Y" && answer != "N") {
    if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
    askUser(strQuestion, true);
  }
  return answer;
}