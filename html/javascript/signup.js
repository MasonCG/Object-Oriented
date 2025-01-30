


function signup(){
    let birthdate = document.getElementById("bday").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;


    // birthday error handling
    bday = new Date(birthdate)
    ageRequirement = 13 * 365 * 24 * 60 * 60 * 1000;

    if (Date.now() - bday < ageRequirement){
        alert("You do not pass age requirement of 13 years old")
        return;
    } 


    

    // error handling name entries
    if (name.length < 1){
        alert("Please enter something in all fields");
        return;
    }
    


    // passwrod error handling
    if (password.length < 1){
        alert("Please enter something in all fields");
        return;
    }

    
    alert("Birthday: " + birthdate + "\n" + 
        "Email: " + email + "\n" + 
        "Password: " + "*"*password.length + "\n" + 
        "Name: " + name
    )
    return;

}