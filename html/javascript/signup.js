
inputFlagRaised = false;

function inputFlag(elementId, message="Please fill out this field"){
    // custom inputer flag function
    // creates a div with a text node into given element with given message
    let cont = document.getElementById(elementId);
    let newDiv = document.createElement("div");
    let newP = document.createTextNode("*"+message);
    newDiv.append(newP);
    newDiv.className = "inputFlag"


    inputFlagRaised = true;
    cont.insertBefore(newDiv, cont.children[0]);
}

function signup(){


    inputContainers = document.getElementsByClassName("fa-cont");
    for (let i = 0; i < inputContainers.length; i++){

        inputCont = inputContainers[i]
        contChildren = inputCont.children;
        for (let j = 0; j < contChildren.length; j++){

            
            if (contChildren[j].className == "inputFlag"){
                inputCont.removeChild(contChildren[j]);

            }
        } 
    }


    let bdayInput = document.getElementById("bday");
    let birthdate = bdayInput.value;
    let nameInput = document.getElementById("name");
    let name = nameInput.value;
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value;
    let emailInput = document.getElementById("email");
    let email = emailInput.value;


     // birthday error handling
     bday = new Date(birthdate)
     ageRequirement = 13 * 365 * 24 * 60 * 60 * 1000;
 
     if (birthdate.length < 1){
        inputFlag("bday-cont")
     } else if (Date.now() - bday < ageRequirement){
        message = "You do not meet the 13 year age requirement."
        inputFlag("bday-cont", message);
     } 

     if (name.length < 1){
        inputFlag("name-cont");
     }
     
     // passwrod error handling


     if (password.length < 1){
        inputFlag("password-cont");
     } else if (password.length < 8) {
        message = "Plase make your password at least 8 characters.";
        inputFlag("password-cont", message);
    }
     
 
     // email error handling
     
     hasAt = false;
 
     for (let i = 0; i < email.length; i++){
 
         if (email[i] == "@"){
             hasAt = true;
         }
     }

     if (email.length < 1){
        inputFlag("email-cont");
     } else if (!hasAt){
        message = "Your email has no '@' symbol.";
        inputFlag("email-cont", message);
     } else if (email[0] === "@"){
        message = "The '@' symbol cannot come first.";
        inputFlag("email-cont", message);
     } else if (email[email.length - 1] === "@"){
        message = "The '@' symbol cannot come last.";
        inputFlag("email-cont", message);
     }
 

    if (!inputFlagRaised){
        alert(
            "email: " + email + "\n" + 
            "name: " + name + "\n" + 
            "password: " + password + "\n" + 
            "Birthday: " + birthdate + "\n"
        );
    }


    return;
 
 }

