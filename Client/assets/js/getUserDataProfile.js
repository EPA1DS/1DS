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
            document.getElementById('NomeUsuario').innerText = User.usuario;
            document.getElementById('scoreUser').innerText = User.score;
            document.getElementById('RankUser').innerText = User.score;
            AdicionarTabela();
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

function AdicionarTabela() {
    var tabelaSales = document.getElementById("tabelaSales");
    var tabelaMemo = document.getElementById("tabelaMemo");
    var tabelaFlappy = document.getElementById("tabelaFlappy");
    
    User.maxVscore.sort((a, b) => b - a);

    User.maxVscore.forEach(score => {
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var h3 = document.createElement("h3");
        div.setAttribute("class", "col-md linha");
        div2.setAttribute("class", "name");
        h3.innerText = score;
        div2.appendChild(h3);
        div.appendChild(div2);

        tabelaSales.appendChild(div);
        
    });

    User.maxMscore.sort((a, b) => b - a);

    User.maxMscore.forEach(score => {
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var h3 = document.createElement("h3");
        div.setAttribute("class", "col-md linha");
        div2.setAttribute("class", "name");
        h3.innerText = score;
        div2.appendChild(h3);
        div.appendChild(div2);

        tabelaMemo.appendChild(div);
        
    });

    User.maxFscore.sort((a, b) => b - a);

    User.maxFscore.forEach(score => {
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var h3 = document.createElement("h3");
        div.setAttribute("class", "col-md linha");
        div2.setAttribute("class", "name");
        h3.innerHTML = score;
        div2.appendChild(h3);
        div.appendChild(div2);

        tabelaFlappy.appendChild(div);
        
    });



}
