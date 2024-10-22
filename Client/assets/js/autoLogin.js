var userLink = document.getElementById("userLink");
var jogosLink = document.getElementById("JogosLink");
userLink.remove();
jogosLink.remove();
var AuthLogin = localStorage.getItem('AuthLogin');
if(AuthLogin){
    document.getElementById("loginLink").style.display = "none";
    document.querySelector('#navbarSupportedContent ul').appendChild(userLink);
    document.querySelector('#navbarSupportedContent ul').appendChild(jogosLink);
}
