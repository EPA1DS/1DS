const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
var timer = 0;
const characters = [
    'camera',
    'carta',
    'estante',
    'lupa',
    'maquina',
    'pena',
    'relogio',
    'telefone',
    'toca-disco',
    'veio',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    setTimeout(() => {
        if (disabledCards.length == 20) {
            grid.innerHTML = "";
            clearInterval(this.loop);
            if (User.maxMscore.length == 8) {
                User.maxMscore.sort((a, b) => b - a);
                if (pontos > User.maxMscore[0]) {
                    User.maxVscore[0] = timer;
                }
            }
            else {
                User.maxMscore.push(timer);
            };
            axios.post(API_LOCATION + "/updateScore/data", {
                docID: localStorage.getItem('AuthLogin'),
                content: {
                    maxMscore: User.maxMscore,
                    score: User.score + 2
                }
            }).then((resposta) => {
                if (resposta.status == 200) {
                    console.log("Updated successful");
                }
            }).catch((erro) => {
                if (erro.status == 404) {
                    console.log("AuthLogin not valid");
                    window.location.href = "index.html";
                }
                else if (erro.status == 500) {
                    console.log("Server error");
                    window.location.href = "index.html";
                }
            });
            loadGame()
        }
    }, 400)
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500)

    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards()
    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('assets/sprites/img/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacter = [...characters, ...characters]
    const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);

    duplicateCharacter.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        timer += 1;
    }, 1000);
}

startTimer();
loadGame()


