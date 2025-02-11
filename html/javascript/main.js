
// START: flag raising functions
let inputFlagRaised = false
function inputFlag(elementId, message="Please fill out this field", childIndex=0, fCName="inputFlag"){
    // custom inputer flag function
    // creates a div with a text node into given element with given message
    // elementId is the id of the element of which you want to put the error message in 
    // message is the message passed as a string
    // childIndex is the index of the child you want to insert the flag before.
    // fCName is the desired class name of the flagbeing raised

    if (typeof elementId !== 'string'){
        throw new TypeError("'elemntId' needs to be a string. you passed a '" + typeof elementId+"'.");
    }
    if  (typeof message !== 'string'){
        throw new TypeError("'message' needs to be a string. you passed a '" + typeof message+"'.");
    }
    if  (typeof fCName !== 'string'){
        throw new TypeError("'fCName' needs to be a string. you passed a '" + typeof fCName+"'.");
    }
    if  (typeof childIndex !== 'number'){
        throw new TypeError("'childIndex' needs to be a number. you passed a '" + typeof childIndex+"'.");
    }


    let cont = document.getElementById(elementId);
    let newDiv = document.createElement("div");
    let newP = document.createTextNode("*"+message);
    newDiv.append(newP);
    newDiv.className = fCName;

    inputFlagRaised = true;
    cont.insertBefore(newDiv, cont.children[childIndex]);
    return;
}

function deleteFlags(cClass) {

    // deletes input flags
    // cClass is the string className for the containers that hold the flags


    //resetting raised flag condition
    inputFlagRaised = false



    if (typeof cClass !== 'string'){
        throw new TypeError("'cClass' is not a string you entered a '" + typeof cClass + "'.");
    }


    inputContainers = document.getElementsByClassName(cClass);
    for (let i = 0; i < inputContainers.length; i++){

        inputCont = inputContainers[i]
        contChildren = inputCont.children;
        for (let j = 0; j < contChildren.length; j++){

            
            if (contChildren[j].className == "inputFlag"){
                inputCont.removeChild(contChildren[j]);

            }
        } 
    }

}
// END: flag raising functions

// START: creating input dictionary functions
function createInputDict(elementID, file=false){
    // creating a dictionary of the element, element value, its parents, and its parent's ID
    // file is determined if you wish the element to be based on a file or not

    let input = document.getElementById(elementID);
    let value = 0;
    let files = 0;

    // getting files instead of value
    if (file == true){
        files = input.files;

    } else {
        value = input.value;
    }

    let parent = input.parentElement;
    let parentID = parent.id;
    let parentClass = parent.className;
    
    let dict = {}
    dict["element"] = input;

    // creating dictionary based on file condition
    if (file == true){
        dict["files"] = files;
    } else {
        dict["value"] = value;
    }
    dict["parent"] = parent;
    dict["p_id"] = parentID;
    dict["p_class"] = parentClass;

    return dict;

}
// END: creating input dictionary functions


// START: signup page functions
function signup(){


    let bdayInput = document.getElementById("bday");
    let birthdate = bdayInput.value;
    let nameInput = document.getElementById("name");
    let name = nameInput.value;
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value;
    let emailInput = document.getElementById("email");
    let email = emailInput.value;

    let pClass = bdayInput.parentElement.className;
    deleteFlags(pClass);


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
 

    if (inputFlagRaised == false){
        alert(
            "email: " + email + "\n" + 
            "name: " + name + "\n" + 
            "password: " + password + "\n" + 
            "Birthday: " + birthdate + "\n"
        );
    }


    return;
 
 }
// END: signup page functions


// START: makepost page functions
function createPost() {
    // creating a post for the posts page

    titleDict = createInputDict("title-input");
    capDict = createInputDict("caption-input");
    imgDict = createInputDict("pic-input", file=true);


    // getting parent class from title dictionary
    deleteFlags(titleDict["p_class"]);



    if(titleDict["value"].length < 1){
        inputFlag(titleDict["p_id"], "Add a title");
    }

    if(capDict["value"].length < 1){
        inputFlag(capDict["p_id"], "Add a caption");
    }

    if(imgDict["files"].length === 0){
        inputFlag(imgDict["p_id"], message="Select an image");

    }

    let fdata = new FormData();
    fdata.append("title", titleDict["value"]);
    fdata.append("caption", capDict["value"]);
    fdata.append("pic", imgDict["files"][0]);
    
    if (inputFlagRaised){
        return;
    }

    fetch( "/do_update", {
        method: "POST",
        body: fdata
    }).then( (resp) => {
        resp.json().then( (J) => {
            console.log("Server said:",J);
        }).catch( (err) => {
            console.log("JSON error:",err);
        })
    }).catch( (err) => {
        console.log("Error:",err);
    });

}

function uploadPic() {
    imgDict = createInputDict("pic-input", file=true);

    if (imgDict["files"].length > 0){
        let u = URL.createObjectURL(imgDict["files"][0]);
        let imgCont = document.getElementById("post-pic");
        imgCont.onload = () => {
            URL.revokeObjectURL(u);
        }
        imgCont.src = u
    }
}

// END: makepost page functions