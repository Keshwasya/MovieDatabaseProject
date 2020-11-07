let req = null;
let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit");
submit.onclick = login;

function login(){
    req = new XMLHttpRequest();

    //console.log(username.value);
    //console.log(password.value);
    req.open("POST", `http://localhost:3000/login?user=${username.value}&pass=${password.value}`);
    req.send();
}