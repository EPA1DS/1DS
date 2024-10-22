var tabela = document.getElementById("tabelaRank");

axios.post(API_LOCATION+"/ranking/data").then((resposta) => {
    if(resposta.status == 200){

        var top6 = resposta.data;

        top6.forEach((User, index) => {
            var li = document.createElement("li");
            var spanPo = document.createElement("span");
            spanPo.setAttribute("class", "position");
            var spanNa = document.createElement("span");
            spanNa.setAttribute("class", "name");
            var spanSc = document.createElement("span");
            spanSc.setAttribute("class", "score");
            var spanBa = document.createElement("span");
            spanBa.setAttribute("class", "badge");

            var star = document.createElement("i");
            star.setAttribute("class", "bi bi-star-fill");
            star.style.color = "cyan";
            var troph = document.createElement("i");
            troph.setAttribute("class", "bi bi-trophy-fill");
            troph.style.color = "yellow";
            var bad = document.createElement("i")
            bad.setAttribute("class", "bi bi-box-fill");
            var simbolo = bad;
            if(index == 0){
                simbolo = star;
            }
            else if(index == 1){
                simbolo = troph;
            }
            else if(index == 2){
                simbolo = troph;
            }
            spanPo.innerText= index+1
            li.appendChild(spanPo);
            spanNa.innerText= User.usuario
            li.appendChild(spanNa);
            spanSc.innerText= User.score
            li.appendChild(spanSc);
            spanBa.appendChild(simbolo);
            li.appendChild(spanBa);
            tabela.appendChild(li);
        });

        if(top6.empty){
            document.getElementById("noUsers").innerHTML="Nenhum usuário ainda cadastrado";
        }
    }
});

