import '../CSS/style.css';

const DOMSelectors = {
    wish: document.querySelector("#wish"),
    history: document.querySelector("#history"),
    shop: document.querySelector("#shop"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items"),
    pulls: document.querySelector("#pull"),
    currency: document.querySelector("#starglitter")
};

let characters = [];
let aquired = [];

let history = [];

let fivePity = 0.006;
let fourPity = 0.06;

let pulls = 0;
let starGlitter = 0;

let five = 0;
let fiveStars = [];

let four = 0;
let fourStars = [];

async function getData() {
    try {
        const response = await fetch("https://genshin.jmp.blue/characters/");
        if (response.status != 200) {
            throw new Error(response);
        } else {
            const data = await response.json();
            for (const character of data) {
                async function getIndividualData(character) {
                    try {
                        const indiviResponse = await fetch(`https://genshin.jmp.blue/characters/${character}`);
                        if (indiviResponse.status != 200) {
                            throw new Error(response);
                        } else {
                            const indiviData = await indiviResponse.json();
                            let charactData = {
                                name: indiviData.name,
                                rarity: indiviData.rarity,
                                title: indiviData.title,
                                element: indiviData.vision,
                                imgUrl: `https://genshin.jmp.blue/characters/${character}/icon-big`
                            }
                            characters.push(charactData);
                        }
                    } catch (error) {
                        console.log(error);
                        alert("sorry could not find that character");
                    }
                }
                await getIndividualData(character);
            }
            characters.forEach(character => {
                if (character.rarity === 5) {
                    five++;
                    fiveStars.push(character);
                }
            });
            characters.forEach(character => {
                if (character.rarity === 4) {
                    four++;
                    fourStars.push(character);
                }
            });
        }
    } catch (error) {
        console.log(error);
        alert("sorry could not find that character");
    }
}

function updatePity() {
    if ((pulls >= 75) && (pulls <= 90)) {
        fivePity += .066;
    } else {
        if (pulls % 10 === 0) {
            fourPity = 0.994;
        }
    }
}

function getCharacter(characts, rarity, n) {
    const cardsContainer = document.querySelector("#cards");
    let rnd = Math.round(Math.random() * (n - 1));
    const character = characts[rnd].name;
    history.push(character);
    if (aquired.includes(character) === true) {
        if (rarity === 5) {
            console.log("duplicate... SYSTEM donates 25 Starglitter as an apology.");
            starGlitter += 25;
            //add or display on screen - card
        } else {
            console.log("duplicate... SYSTEM donates 5 Starglitter as an apology.");
            starGlitter += 5;
            //add or display on screen - card
        }
    } else {
        console.log("loading... acquired CHARACTER: " + character);
        aquired.push(character);
    }
}

function gacha(n) {
    const cardsContainer = document.querySelector("#cards");
    for (let i = 1; i <= n; i++) {
        pulls++;
        updatePity();
        DOMSelectors.pulls.innerHTML = `Pity: ${pulls}`;
        const num = Math.random();
        if (num < fivePity) {
            getCharacter(fiveStars, 5, five);
            pulls = 0;
            fivePity = 0.006;
        } else {
            if ((num > fivePity) && (num < (fourPity + fivePity))) {
                getCharacter(fourStars, 4, four);
                fourPity = 0.06;
            } else {
                console.log("3RR0R... SYSTEM M@1fu^cti0n. ▇ ▇ has donated 2 Starglitters.")
                starGlitter += 2;
                //add or display on screen - card
            }
        }
        DOMSelectors.currency.innerHTML = `Starglitter: ${starGlitter}`;
    }
}

function wish() {
    DOMSelectors.wish.addEventListener("click", async function () {
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<button class="pull" id="ten">Pull 10x</button>
            <button class="pull" id="one">Pull 1x</button>
            <div class="" id="cards"></div>`
        );
        const ten = document.querySelector("#ten");
        const one = document.querySelector("#one")
        ten.addEventListener("click", function () {
            gacha(10);
        });
        one.addEventListener("click", function () {
            gacha(1);
        });
    });
}

function records() {
    DOMSelectors.history.addEventListener("click", async function () {
        DOMSelectors.itemContainer.innerHTML = "";
    })
}

async function run() {
    await getData();
    wish();
    records();
}

run();