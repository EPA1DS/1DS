
function qrCode(){
    const token = new URLSearchParams(window.location.search).get("token");
    const urlSemParametros = window.location.origin + window.location.pathname;
    window.history.replaceState(null, '', urlSemParametros);
    if(token == "Vzecvw8FJ1WXEeDUmksFYmzVfOOgKkEJ9Gl0FKYt6T7SS6uspxrH67WpBJp87dAk"){
        if(!User.jogos.includes("SalesGomes")) User.jogos.push("SalesGomes");
        axios.post(API_LOCATION+"/update/data", {
            docID: localStorage.getItem("AuthLogin"),
            content: {
                jogos: User.jogos
            }
        });
    }
    else if(token == "e9cvTCtd0UR6cqDAxwqEAylcAv9vjFPl0T4dczPi9BW5IWAcGsO8cCPZIYukA1Sd"){
        if(!User.jogos.includes("Memoria")) User.jogos.push("Memoria");
        axios.post(API_LOCATION+"/update/data", {
            docID: localStorage.getItem("AuthLogin"),
            content: {
                jogos: User.jogos
            }
        })
    }
    else if(token == "YXieBuHVl8HRKHqyhqrPySbqAaVXafq2YmWIHM5PeBlM8j2jsUkSySe679ejvhRE"){
        if(!User.jogos.includes("Flappy")) User.jogos.push("Flappy");
        axios.post(API_LOCATION+"/update/data", {
            docID: localStorage.getItem("AuthLogin"),
            content: {
                jogos: User.jogos
            }
        })
    }
}


