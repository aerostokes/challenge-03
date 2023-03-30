// Assignment Code
var generateBtn = document.querySelector("#generate");



function generatePassword() {
  // Initiate variables and define characters available for password generation
  var numLength, lowerCase, upperCase, numeric, special, inputsOkay = false, answer, fullCharacters = "", passwordArray = [];
  const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericCharacters = '0123456789';
  const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';

  // Collect input requirements from the user
  numLength = getLength("Enter a character length between 8 and 128: ");
  if (numLength == null) return "Try Again";
  do {
    lowerCase = askUser("Would you like to include lowercase letters?");
    if (lowerCase == null) return "Try Again";
    upperCase = askUser ("Would you like to include uppercase letters?");
    if (upperCase == null) return "Try Again";
    numeric = askUser ("Would you like to include numbers?");
    if (numeric == null) return "Try Again";
    special = askUser ("Would you like to include special characters?");
    if (special == null) return "Try Again";
    
    if (lowerCase == "Y" || upperCase == "Y" || numeric == "Y" || special == "Y") inputsOkay = true;
    else alert("You must include at least one input type. Try Again");
  } while (inputsOkay == false);

  // For each of the requirements given by the user, update the passwordArray to add one random character at a random location and update the fullCharacters list.
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

  // Complete the remaining length of passwordArray by adding random characters from fullCharacters at random locations
  for (var i = passwordArray.length; i < numLength; i++) {
    passwordArray.splice(Math.floor(Math.random() * passwordArray.length), 0, fullCharacters[Math.floor(Math.random() * fullCharacters.length)]);
  }

  return passwordArray.join("");
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//Additional functions called from above
var getLength = function (strQuestion, repeat = false) {
  answer =  prompt(strQuestion);
  if (answer === null) return;
  answer = Number(answer);
  if (!(answer >= 8) || !(answer <= 128)) {
    if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
    getLength(strQuestion, true);
  }
  return answer;
}

var askUser = function (strQuestion, repeat = false) {
  answer = prompt("\n" + strQuestion + "\nY/N:", "Y");
  if (answer == null) return;
  answer = answer.toUpperCase();
  if (answer != "Y" && answer != "N") {
    if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
    askUser(strQuestion, true);
  }
  return answer;
}