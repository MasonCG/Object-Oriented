const fs = require("fs");


function allFieldsAlert(){
    alert("Please enter something in all fields.");
}

function signup(){
    let birthdate = document.getElementById("bday").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;


    // birthday error handling
    bday = new Date(birthdate)
    ageRequirement = 13 * 365 * 24 * 60 * 60 * 1000;

    if (birthdate.length < 1){
        allFieldsAlert();
        return;
    }

    if (Date.now() - bday < ageRequirement){
        alert("You do not pass age requirement of 13 years old.")
        return;
    } 

    // error handling name entries
    if (name.length < 1){
        allFieldsAlert();
        return;
    }
    
    // passwrod error handling
    if (password.length < 1){
        allFieldsAlert();
        return;
    } else if (password.length < 8) {
        alert("Plase make your password at least 8 characters.")
        return;
    }
    

    // email error handling
    if (email.length < 1){
        allFieldsAlert();
        return;
    } 

    hasAt = false;

    for (let i = 0; i < email.length; i++){

        if (email[i] == "@"){
            hasAt = true;
        }
    }

    if (!hasAt){
        alert("Your email has no '@' symbol.");
        return;
    }

    if (email[0] === "@"){
        alert("The '@' symbol cannot come first.");
        return;
    }

    

    if (email[email.length - 1] === "@"){
        alert("The '@' symbol cannot come last.");
        return;
    }


    alert("Birthday: " + birthdate + "\n" + 
        "Email: " + email + "\n" + 
        "Password: " + "***********" + "\n" + 
        "Name: " + name
    )

    allData = "email=" + email + "," + "name=" + name + 
                "," + "password=" + password + "," + "birthdate=" + birthdate;

    return;

}