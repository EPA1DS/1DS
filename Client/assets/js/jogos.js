function jogosScript() {
    if(User.jogos && User.jogos.length > 0){
        var JogosD = document.getElementById("JogosDesbloqueados");
        for(var i = 0; i < User.jogos.length; i++) {
            var div = document.createElement("div");
            var h2 = document.createElement("h2");
            var img = document.createElement("img");
            div.setAttribute("class", "col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center flex-column mb-5 flex-column");
            img.setAttribute("class", "game");
            if(User.jogos[i] == "SalesGomes"){
                h2.innerHTML = "Sales Gomes Jogo";
                div.setAttribute("id", "SalesGomes");
                img.setAttribute("src", "assets/image/MODAL-HISTORIA-3.png");
            }
            else if(User.jogos[i] == "Memoria"){
                h2.innerHTML = "Jogo da Memória";
                div.setAttribute("id", "Memoria");
                img.setAttribute("src", "assets/image/memory-game.png");
    
            }
            else if(User.jogos[i] == "Flappy"){
                h2.innerHTML = "Flappy Bird";
                div.setAttribute("id", "FlappyBird");
                img.setAttribute("src", "assets/image/FlappyBird.png");
            }
            div.appendChild(h2);
            div.appendChild(img);
            JogosD.appendChild(div);
        }   
        var corpo = document.getElementById("corpo");
        var salesgomes = document.getElementById("SalesGomes");
        var memoria = document.getElementById("Memoria");
        var flappy = document.getElementById("FlappyBird");
        if(salesgomes){
            salesgomes.addEventListener("click", () => {
                corpo.style.cssText = "width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Press Start 2P'"
                corpo.innerHTML = '<h2>Pontos: <span id="score">0</span></h2><div id="salesgomesGame"><canvas id="canvas"></canvas><h3 id="resultado"></h3></div><button id="startGame">Iniciar Jogo</button>';
                var script = document.createElement("script");
                script.setAttribute("src", "assets/js/salesgomes.js")
                corpo.appendChild(script);
            })
        }
        if(memoria){
            memoria.addEventListener("click", () => {
                corpo.style.cssText = "padding-top: 10vh; height: 100%; display: flex; flex-direction: column; width: 100%; background-image: url('assets/sprite/img/fundo.avif'); background-size: cover; align-items: center; justify-content: center; padding: 20px 20px 50px;";
                corpo.innerHTML = '<div class="grid"></div>'
                var script = document.createElement("script");
                script.setAttribute("src", "assets/js/memory.js");
                corpo.appendChild(script);
            })
        }
        if(flappy){
            flappy.addEventListener("click", () => {
                corpo.style.cssText = "width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Press Start 2P'";
                corpo.innerHTML = '<canvas id="canvas" width="276" height="414"></canvas>';
                var script = document.createElement("script");
                script.setAttribute("src", "assets/js/flappy.js")
                corpo.appendChild(script);
            });
        }
    
    }
    else{
        document.getElementById("noGames").innerHTML = "Nenhum jogo desbloqueado";
    }
}
