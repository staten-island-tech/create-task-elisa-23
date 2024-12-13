import '../CSS/style.css';

const DOMSelectors = {
    limited: document.querySelector("#limited"),
    standard: document.querySelector("#standard"),
    weapon: document.querySelector("#weapon"),
    history: document.querySelector("#history"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items")
};

let history = {};
let shortHistory = {};
const charactersAll = {};
const weaponsAll = {};

let pity = 0;
let fourPity = 0;

const standardCharacters = [];
const standardWeapons = [];

let aquiredCharacters = [];
let acquiredWeapons = [];

let guarenteed = false;

async function getData() {

}

getData();

function limited(pulls, characters) {
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1) {
        for (let i = 1; i <= pulls; i++) {
            pull('limited', characters, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....";
    }
}

function standard(pulls) {
    currentPull.innerHTML = "";
    const standard = {
        characters: `${standardCharacters}`,
        weapons: `${standardWeapons}`,
    };
    if (pulls === 10 || pulls === 1) {
        for (let i = 1; i <= pulls; i++) {
            pull('standard', standard, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....";
    }
}

function weapon(pulls, weapons) {
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1) {
        for (let i = 1; i <= pulls; i++) {
            pull('weapon', weapons, i);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        return "There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....";
    }
}

function pitySystem(type) {
    let fourStar = 60;
    const fourSoftPity = (fourPity - 5) * 186.8;
    fourStar = fourStar + fourSoftPity;
    let fiveStar = 6;
    if (type === 'standard' || type === 'limited') {
        const softPity = (pity - 75) * 66;
        fiveStar = fiveStar + softPity;
    } else if (type === 'weapon') {
        const softPity = (pity - 65) * 39.7;
        fiveStar = fiveStar + softPity;
    } else {
        return "Something wrong has occurred when you were pulling... Apologies."
    }
    return { five: fiveStar, four: fourStar };
}

function pull(type, items) {
    const random = Math.floor(Math.random() * 1000);
    fourPity++;
    pity++;
    const currentPity = pitySystem(type);
    const rateUps = items;
    if (fourPity >= 10) {
        if (random <= currentPity.five) {
            return five(random, rateUps, type);
        } else {
            return four(random, rateUps, type);
        }
    } else if (pity === 90) {
        return five(random, rateUps, type);
    } else {
        if (random <= currentPity.five) {
            return five(random, rateUps, type);
        } else if (random <= currentPity.four) {
            return four(random, rateUps, type);
        } else {
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            const threeWeapons = shuffle(weaponsAll.threeStar);
            return threeWeapons[gamble];
        }
    }

}

function five(random, rateUps, type) {
    pity = 0;
    if (guarenteed === true) {
        return rateUps.fiveStar;
    } else {
        let gamble = (Math.random() * random) % 2;
        if (gamble === 0) {
            guarenteed = false;
            return rateUps.fiveStar;
        } else {
            gamble = (Math.random() * random) % 7;
            guarenteed = true;
            if (type === 'weapon') {
                return standardWeapons[gamble];
            } else {
                return standardCharacters[gamble];
            }
        }
    }
}

function four(random, rateUps, type) {
    fourPity = 0;
    if (random < 500) {
        const gamble = (((3 * Math.random()) % 4) * 89) % 3;
        return rateUps.fourStar[gamble];
    } else {
        const gamble = (((3 * Math.random()) % 4) * 89) % 3;
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        const fourCharacts = shuffle(charactersAll.fourStar);
        const fourWeapons = shuffle(weaponsAll.fourStar);
        if (type === "weapon") {
            return fourWeapons[gamble];
        } else {
            return fourCharacts[gamble];
        }
    }
}