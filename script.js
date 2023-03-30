    // Assignment Code
    var generateBtn = document.querySelector("#generate");
    var answer, numLength, lowerCase, upperCase, numeric, special,inputsOkay = false;

    function getLength (strQuestion, repeat = false) {
      answer =  prompt(strQuestion);
      if (answer === null) return;
      answer = Number(answer);
      if (!(answer >= 8) || !(answer <= 128)) {
        if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
        getLength(strQuestion, true);
      }
      return answer;
    }

    function askUser (strQuestion, repeat = false) {
      answer = prompt("\n" + strQuestion + "\nY/N:", "Y");
      if (answer == null) return;
      answer = answer.toUpperCase();
      if (answer != "Y" && answer != "N") {
        if (repeat == false) strQuestion = "Invalid input. " + strQuestion;
        askUser(strQuestion, true);
      }
      return answer;
    }


    
    function generatePassword() {
      numLength = getLength("Enter a character length between 8 and 128: ");
      console.log(numLength);
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
      console.log(lowerCase+upperCase+numeric+special)



      var strPassword = "testing";
      return strPassword;
    }

    // Write password to the #password input
    function writePassword() {
      var password = generatePassword();
      var passwordText = document.querySelector("#password");


      passwordText.value = password;



    }

    // Add event listener to generate button
    generateBtn.addEventListener("click", writePassword);