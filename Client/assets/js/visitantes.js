var corpo = document.getElementById('corpo');
var first = false;

axios.post(API_LOCATION+"/visitantes/data").then((resposta) => {
    const images = resposta.data;
    images.forEach(image => {
        if(first){
        var quadro = document.createElement('div');
        quadro.setAttribute('class', 'quadro col-lg-3 col-md-6 col-12 mb-5');
        var bordaEscura = document.createElement('div');
        bordaEscura.setAttribute('class', 'bordaEscura');
        var bordaClara = document.createElement('div');
        bordaClara.setAttribute('class', 'bordaClara');
        var conteudo = document.createElement('div');
        conteudo.setAttribute('class', 'Conteudo');
        var img = document.createElement('img');
        img.setAttribute("src", image.url);
        img.setAttribute("class", "foto-antiga");
        conteudo.appendChild(img);
        bordaClara.appendChild(conteudo);
        bordaEscura.appendChild(bordaClara);
        quadro.appendChild(bordaEscura);
        corpo.appendChild(quadro);
        }
        else{ first = true }
    });
    console.log("executou");
}).catch((err) =>{
    window.location.href = "index.html";
})
