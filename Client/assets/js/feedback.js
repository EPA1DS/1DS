var formulario = document.querySelector('.form-sub form');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    var feed = document.querySelector('.form-sub form input').value;
    document.querySelector('.form-sub form input').value = "";
    if(feed.length >= 3){
        axios.post(API_LOCATION+"/feedback/data", {
            feed: feed,
        });
    }
})
