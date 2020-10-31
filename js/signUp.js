let req = null;
let userName = document.getElementById("username");
let password = document.getElementById("password");

function createUser(){
    req = new XMLHttpRequest();
    
    req.open("POST", `http://localhost:3000/addUser?user=${userName.value}&pass=${password.value}`);
    req.send();
}