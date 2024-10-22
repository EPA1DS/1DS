var login = true;
var csenha = document.getElementById('csenha');
csenha.remove();
var cadastroLink = document.querySelector('#cadastrolink span');

cadastroLink.addEventListener('click', () => {
    if(login) {
        cadastroLink.innerHTML = "Entrar com uma conta";
        document.querySelector("#titulo h1").innerHTML = "CADASTRAR"; 
        document.querySelector("#submitdiv button").innerHTML = "CADASTRAR";
        document.querySelector("#csenhadiv div").prepend(csenha);
    }
    else {
        csenha.remove();
        cadastroLink.innerHTML = "Criar uma conta";
        document.querySelector("#titulo h1").innerHTML = "LOGIN";
        document.querySelector("#submitdiv button").innerHTML = "LOGIN";
    }
    login = !login;
    document.getElementById('csenhadiv').classList.toggle("d-none");
    document.getElementById('userdiv').classList.toggle("d-flex");
    document.getElementById('userdiv').classList.toggle("align-items-center");
    document.getElementById('titulo').classList.toggle("align-items-center");
});


var senhaEye = document.getElementById('senhaVisible');
var csenhaEye = document.getElementById('csenhaVisible');
var c = true;
var s = true;

csenhaEye.addEventListener('click', () => {
    if(c) document.getElementById('csenha').setAttribute('type', 'text'), csenhaEye.setAttribute('class', 'bi bi-eye-slash');
    else document.getElementById('csenha').setAttribute('type', 'password'), csenhaEye.setAttribute('class', 'bi bi-eye');
    c = !c
} );
senhaEye.addEventListener('click', () => {
    if(s) document.getElementById('senha').setAttribute('type', 'text'), senhaEye.setAttribute('class', 'bi bi-eye-slash');
    else document.getElementById('senha').setAttribute('type', 'password'), senhaEye.setAttribute('class', 'bi bi-eye');
    s = !s
} );


var form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    var errordiv = document.getElementById("messagediv");
    var error = document.getElementById("error");
    if(login){
        axios.post(API_LOCATION+"/login/data", {
            usuario: usuario,
            senha: senha
        }).then((resposta) => {
            if(resposta.status === 200){
                localStorage.setItem("AuthLogin", resposta.data.docID);
                window.location.href = "index.html";
            }
        }).catch((erro) => {
            if(erro.status === 404){
                errordiv.classList.remove("d-none");
                error.innerText = "Usuario ou senha incorretos";
            }
            else if (erro.status == 500) {
                console.log("Server error");
                console.log(erro.data);
            }
        });
    }
    else{
        var csenha = document.getElementById("csenha").value;
        if(senha != csenha){
            errordiv.classList.remove("d-none");
            error.innerText = "As senhas não coincidem";
        }
        else{
            axios.post(API_LOCATION+"/cadastro/data", {
                usuario: usuario,
                senha: senha
            }).then((resposta) => {
                if(resposta.status == 201){
                    localStorage.setItem("AuthLogin", resposta.data);
                    window.location.href = "index.html";
                }
            }).catch((erro) => {
                if(erro.status == 403){
                    errordiv.classList.remove("d-none");
                    error.innerText = "Usuario já cadastrado";
                }
                else if (erro.status == 500) {
                    console.log("Server error");
                }
            })
        }
    }
})
