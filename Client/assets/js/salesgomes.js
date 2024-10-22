var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pontos = 0;
var jogo = false;
var fps = 0;
var relogio, player, RAnimacao, PAnimacao, game;
const WidthBody = document.querySelector("body").clientWidth;

const quadrados = 10;
var canvasWBase = Math.trunc(WidthBody/50)*50;
if(canvasWBase > 550) canvasWBase = 550;
const canvasHBase = canvasWBase;
const TamanhoQuadrado = canvasWBase/quadrados;

canvas.width = canvasWBase;
canvas.height = canvasHBase;

var AllPlayerSprite = [];
AllPlayerSprite[0] = new Image();
AllPlayerSprite[0].src="assets/sprites/Player/costa1.png";
AllPlayerSprite[1] = new Image();
AllPlayerSprite[1].src="assets/sprites/Player/costa2.png";
AllPlayerSprite[2] = new Image();
AllPlayerSprite[2].src="assets/sprites/Player/r1.png";
AllPlayerSprite[3] = new Image();
AllPlayerSprite[3].src="assets/sprites/Player/r2.png";
AllPlayerSprite[4] = new Image();
AllPlayerSprite[4].src="assets/sprites/Player/r3.png";
AllPlayerSprite[5] = new Image();
AllPlayerSprite[5].src="assets/sprites/Player/l1.png";
AllPlayerSprite[6] = new Image();
AllPlayerSprite[6].src="assets/sprites/Player/l2.png";
AllPlayerSprite[7] = new Image();
AllPlayerSprite[7].src="assets/sprites/Player/l3.png";
AllPlayerSprite[8] = new Image();
AllPlayerSprite[8].src="assets/sprites/Player/frente1.png";
AllPlayerSprite[9] = new Image();
AllPlayerSprite[9].src="assets/sprites/Player/frente2.png";

var AllRelogioSprite = [];
AllRelogioSprite[0] = new Image();
AllRelogioSprite[0].src = "assets/sprites/sprites-relogio/1.png";
AllRelogioSprite[1] = new Image();
AllRelogioSprite[1].src = "assets/sprites/sprites-relogio/2.png";
AllRelogioSprite[2] = new Image();
AllRelogioSprite[2].src = "assets/sprites/sprites-relogio/3.png";
AllRelogioSprite[3] = new Image();
AllRelogioSprite[3].src = "assets/sprites/sprites-relogio/4.png";
AllRelogioSprite[4] = new Image();
AllRelogioSprite[4].src = "assets/sprites/sprites-relogio/5.png";
AllRelogioSprite[5] = new Image();
AllRelogioSprite[5].src = "assets/sprites/sprites-relogio/6.png";
AllRelogioSprite[6] = new Image();
AllRelogioSprite[6].src = "assets/sprites/sprites-relogio/7.png";
AllRelogioSprite[7] = new Image();
AllRelogioSprite[7].src = "assets/sprites/sprites-relogio/8.png";




    
document.addEventListener('keydown', (event) => {
    MudarDirecao(event.keyCode);
});

document.getElementById('startGame').addEventListener('click', () => {
    if(!jogo){
        jogo = true;
        document.querySelector('body, html').style.touchAction = 'none';
        document.querySelector('body, html').style.overscrollBehavior = 'none';
        StartGame();
    }

})

// Deslize de Dedo - Mobile
let startX;
let startY;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if(jogo){
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
    
        let diffX = endX - startX;
        let diffY = endY - startY;
        
    
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) MudarDirecao(39); // direita
            else MudarDirecao(37); // esquerda
        }
        else {
            if (diffY > 0) MudarDirecao(40); // baixo
            else MudarDirecao(38); // cima
        }
    }
});


function CriarFundo(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWBase, canvasHBase);
}

function updatePlacar(){
    document.getElementById("score").innerHTML = pontos;
}

function gerarRelogio(){
    relogio = {
        x: Math.floor(Math.random() * quadrados-1) + 1,
        y: Math.floor(Math.random() * quadrados-1) + 1,
        frame: 1
    }
    // não spawnar mesmo local que o player
    while((player.x*TamanhoQuadrado)+(TamanhoQuadrado/2) > (relogio.x*TamanhoQuadrado)-(TamanhoQuadrado/2) && (player.x*TamanhoQuadrado)-(TamanhoQuadrado/2) < (relogio.x*TamanhoQuadrado)+(TamanhoQuadrado/2) && (player.y*TamanhoQuadrado)+(TamanhoQuadrado/2) > (relogio.y*TamanhoQuadrado)-(TamanhoQuadrado/2) && (player.y*TamanhoQuadrado)-(TamanhoQuadrado/2) < (relogio.y*TamanhoQuadrado)+(TamanhoQuadrado/2)){
        relogio = {
            x: Math.floor(Math.random() * quadrados-1) + 1,
            y: Math.floor(Math.random() * quadrados-1) + 1,
            frame: 1
        }
    }
}

function updatePlayer(){
    var base_image;
    if(player.velX == -0.125){
        base_image = AllPlayerSprite[4+player.frameX];
        if(fps%5 == 0){
            player.frameX++;
            if(player.frameX == 4){
                player.frameX = 1;
            }    
        } 
    }
    else if(player.velX == 0.125){
        base_image = AllPlayerSprite[1+player.frameX];
        if(fps%5 == 0){
            player.frameX++;
            if(player.frameX == 4){
                player.frameX = 1;
            }
        }
    }
    else if(player.velY == -0.125){
        base_image = AllPlayerSprite[-1+player.frameY];
        if(fps%10 == 0){
            player.frameY++;
            if(player.frameY == 3){
                player.frameY = 1;
            }
        }
    }
    else if(player.velY == 0.125){
        base_image = AllPlayerSprite[7+player.frameY];
        if(fps%10 == 0){
            player.frameY++;
            if(player.frameY == 3){
                player.frameY = 1;
            }
        }
    }
    ctx.drawImage(base_image, player.x * TamanhoQuadrado, player.y * TamanhoQuadrado, TamanhoQuadrado, TamanhoQuadrado);

}

function updateRelogio(){
    ctx.drawImage(AllRelogioSprite[relogio.frame-1], relogio.x * TamanhoQuadrado, relogio.y * TamanhoQuadrado, TamanhoQuadrado, TamanhoQuadrado);
    if(fps%10 == 0){
        relogio.frame++
        if(relogio.frame+1 == 9){
            relogio.frame = 1;
        }
    }
}

function StartGame(){
    pontos = 0;
    fps = 0;
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('score').innerHTML = pontos;
    player = {
        x: 5,
        y: 5,
        velX: 0.125,
        velY: 0,
        frameX: 1,
        frameY: 1,
    };
    CriarFundo();
    gerarRelogio();
    updateRelogio();
    updatePlayer();
    game = setInterval(UpdateFrame, (1000/40));

}

function endGame(){
    clearInterval(game);
    jogo = false;
    if(pontos < 20){
        document.getElementById('resultado').style.color = 'red';
        document.getElementById('resultado').innerHTML = "Game Over";
    }
    else{
        document.getElementById('resultado').style.color = 'lime';
        document.getElementById('resultado').innerHTML = "Game Win";
    }
    document.querySelector('body, html').style.touchAction = 'auto';
    document.querySelector('body, html').style.overscrollBehavior = 'auto';
    if(User.maxVscore.length == 8){
        User.maxVscore.sort((a, b) => a - b);
        if(pontos > User.maxVscore[0]){
            User.maxVscore[0] = pontos;
        }
    }
    else{
        User.maxVscore.push(pontos);
    };
    var ac = Math.floor(pontos / 10);
    axios.post(API_LOCATION+"/updateScore/data", {
        docID: localStorage.getItem('AuthLogin'),
        content: {
            maxVscore: User.maxVscore,
            score: User.score+ac
        }
    }).then((resposta) => {
        if(resposta.status == 200){
            console.log("Updated successful");
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

function MudarDirecao(keyCode){
    if(keyCode == 37){ //esquerda
        player.velX = -0.125;
        player.velY = 0;
    }
    else if(keyCode == 38){ // cima
        player.velX = 0;
        player.velY = -0.125;
    }
    else if(keyCode == 39){ // direita
        player.velX = 0.125;
        player.velY = 0;
    }
    else if(keyCode == 40){ // baixo
        player.velX = 0;
        player.velY = 0.125;
    }
}



function UpdateFrame(){
    if (player.x > quadrados-0.875 || player.x < -0.125 || player.y >= quadrados-1 || player.y <= 0) endGame();
    
    else{
        player.x += player.velX;
        player.y += player.velY;
        CriarFundo();

        if((player.x*TamanhoQuadrado)+(TamanhoQuadrado/2) > (relogio.x*TamanhoQuadrado)-(TamanhoQuadrado/2) && (player.x*TamanhoQuadrado)-(TamanhoQuadrado/2) < (relogio.x*TamanhoQuadrado)+(TamanhoQuadrado/2) && (player.y*TamanhoQuadrado)+(TamanhoQuadrado/2) > (relogio.y*TamanhoQuadrado)-(TamanhoQuadrado/2) && (player.y*TamanhoQuadrado)-(TamanhoQuadrado/2) < (relogio.y*TamanhoQuadrado)+(TamanhoQuadrado/2)){
            pontos++;
            clearInterval(game);
            game = setInterval(UpdateFrame, (1000/40) - pontos*0.5);
            gerarRelogio();
            updatePlacar();
            CriarFundo(); 
        }
        updateRelogio();
        updatePlayer();
        fps++;
    }
}
