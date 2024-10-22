var userLink = document.getElementById("userLink");
var jogosLink = document.getElementById("JogosLink");
jogosLink.remove();
userLink.remove();
var AuthLogin = localStorage.getItem('AuthLogin');
var User;
if(AuthLogin){
    axios.post(API_LOCATION+"/loginID/data", {
        docID: localStorage.getItem('AuthLogin')
    }).then((resposta) => {
        if(resposta.status == 200){
            console.log("AuthLogin successful");
            document.getElementById("loginLink").style.display = "none";
            document.querySelector('#navbarSupportedContent ul').appendChild(userLink);
            document.querySelector('#navbarSupportedContent ul').appendChild(jogosLink);
            User = resposta.data;
            qrCode();
            jogosScript();
        }
    }).catch((erro) => {
        if(erro.status == 404){
            console.log("AuthLogin not valid");
            window.location.href = "index.html";
        }
        else if (erro.status == 500) {
            console.log("Server error");
            window.location.href = "index.html";
        }
    });
}
else{
    window.location.href = "index.html";
}
