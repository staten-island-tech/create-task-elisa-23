let history = {};
let shortHistory = {};
const charactersAll = {};
const weaponsAll = {};

let pity = 0;
let fourPity = 0;

const standardCharacters = [];
const standardWeapons = [];

let aquiredCharacters = [];
let aquiredWeapons = [];

let guarenteed = false;

let money = 0;

async function getData() {

}

getData();

function wish(type, currency, pull, items) {
    if (currency >= 0) {
        if (type === "limited") {
            limited(pull, items);
        } else if (type === "standard") {
            standard(pull);
        } else if (type === "weapon") {
            weapon(pull, items);
        }
        history.push(shortHistory);
    } else {
        console.log("You're broke. Come back when you have coins in your pocket.");
    }
}

wish(standard, 1000, 1, "hi");

function limited(pulls, characters) {
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1) {
        for (let i = 1; i <= pulls; i++) {
            const result = pull('limited', characters);
            shortHistory.push(result);
            console.log(result);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        console.log("There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....");
    }

    function standard(pulls) {
        currentPull.innerHTML = "";
        const standard = {
            characters: `${standardCharacters}`,
            weapons: `${standardWeapons}`,
        };
        if (pulls === 10 || pulls === 1) {
            for (let i = 1; i <= pulls; i++) {
                const result = pull('standard', standard);
                shortHistory.push(result);
                console.log(result);
                console.log(i + " out of " + pulls + "made");
            }
        } else {
            console.log("There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....");
        }
    }
}

function weapon(pulls, weapons) {
    currentPull.innerHTML = "";
    if (pulls === 10 || pulls === 1) {
        for (let i = 1; i <= pulls; i++) {
            const result = pull('weapon', weapons);
            shortHistory.push(result);
            console.log(result);
            console.log(i + " out of " + pulls + "made");
        }
    } else {
        console.log("There has been an error in the system! Please reload the page and try again. NOTE: Your data will NOT be saved....");
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
            if (type === 'weapon') {
                aquiredWeapons.push(rateUps.fiveStar);
            } else {
                aquiredCharacters.push(rateUps.fiveStar);
            }
            return rateUps.fiveStar;
        } else {
            gamble = (Math.random() * random) % 7;
            guarenteed = true;
            if (type === 'weapon') {
                aquiredWeapons.push(standardWeapons[gamble]);
                return standardWeapons[gamble];
            } else {
                aquiredCharacters.push(standardCharacters[gamble]);
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
            aquiredWeapons.push(fourWeapons[gamble]);
            return fourWeapons[gamble];
        } else {
            aquiredCharacters.push(fourCharacts[gamble]);
            return fourCharacts[gamble];
        }
    }
}