let request =null;

function init(){ //displays correct nav bar items based on if the user is logged in or not  
    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let username = this.responseText.replace(/['"]+/g, '').trim(); //gets the username from server
            document.getElementById("navBtns").innerHTML = ""; //clears the navbar in case it had already been set

            if(username == "" || username.length == 2){ //if not logged in then these items will be added to the nav bar
                let navItems = '<li class="nav-item"> <a class="nav-link" href="/html/login.html"> <i class="fas fa-sign-in-alt" style="color: lightpink;"> </i> Login </a> </li> <li class="nav-item"> <a class="nav-link" href="/html/signUp.html"> <i class="fas fa-user-alt" style="color: lightpink;"> </i> Sign Up</a> </li> ';

                document.getElementById("navBtns").innerHTML = navItems;
                
            }else{ //if logged in then these items will be added to the nav bar
                let navItems = '<li class="dropdown dropleft">\
                                    <a class="nav-link dropdown-toggle" style="color: lightpink;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    ' + username +'</a>\
                                    <div class="dropdown-menu">\
                                        <a class="dropdown-item" href="/me/' + encodeURI(username) + '">User Page</a>\
                                        <a id="logout" class="dropdown-item" onclick="logout()" href="#">Log Out</a>\
                                    </div>\
                                </li>'; // username.replace(/['"]+/g, '') gets rid of the double quotes around the
                                //THE HREF IN THE USER PAGE ITEM WILL LINK TO YOUR PAGE
                document.getElementById("navBtns").innerHTML = navItems;
                $("logout").click(function() {
                    logout(); 
                });
            }
            //console.log("Username: " + username); //checking if username is correctly sent from server         
        }
    }
    
    request.open("GET", `http://localhost:3000/login/check`);  //checks what the username is
    request.send();
}



function logout(){
    request = new XMLHttpRequest();

    window.location.reload(); //reloads the page and resets the navbar
    request.open("GET",`http://localhost:3000/login`);
    request.send();
}

function checkLogin() {
    request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            if (this.responseText == "true") {
                console.log("Logged in");
                return true;
            } else {
                return false;
            }
        }
    }
    
    request.open("GET", "http://localhost:3000/login/checkLogin");
    request.send();
}