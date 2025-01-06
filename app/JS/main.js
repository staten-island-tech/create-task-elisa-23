import '../CSS/style.css';

const DOMSelectors = {
    wish: document.querySelector("#wish"),
    history: document.querySelector("#history"),
    shop: document.querySelector("#shop"),
    data: document.querySelector("#data"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items"),
    pulls: document.querySelector("#pull"),
    currency: document.querySelector("#starglitter"),
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

let star = {
    name: "Starglitter (x2)",
    rarity: 5,
    title: "Masterless Starglitter",
    element: "N/A",
    imgUrl: "/starglitter-icon.png",
    pity: 0,
};

async function getData() {
    try {
        const response = await fetch("https://genshin.jmp.blue/characters/");
        if (response.status != 200) {
            throw new Error(response);
        } else {
            const data = await response.json();
            for (const character of data) {
                if (character.includes("traveler") === false || character === "aloy") {
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
                                    imgUrl: `https://genshin.jmp.blue/characters/${character}/icon`,
                                    pity: 0
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
    const alerts = document.querySelector("#alerts");
    let rnd = Math.round(Math.random() * (n - 1));
    const characterName = characts[rnd].name;
    const character = { ...characts[rnd], pity: pulls };
    history.push({ ...character });
    if (aquired.includes(characts[rnd]) === true) {
        if (rarity === 5) {
            console.log("duplicate... SYSTEM donates 25 Starglitter as an apology.(five star)");
            starGlitter += 25;
            alerts.insertAdjacentHTML("beforeend",
                `<p class="alert">[duplicate... SYSTEM donates 25 Starglitter as an apology.(five star)]</p>`
            );
            cardsContainer.insertAdjacentHTML("beforeend",
                `<div class="card bg-slate-100 shadow-xl h-{1.25rem} w-{17%} m-3">
                    <figure class="pt-10">
                        <img src="/starglitter-icon.png" alt="Masterless Starglitter from Genshin"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Starglitter (x25)</h2>
                        <p>★ ★ ★ ★ ★</p>
                    </div>
                </div>`);
        } else {
            console.log("duplicate... SYSTEM donates 5 Starglitter as an apology.(four star)");
            starGlitter += 5;
            alerts.insertAdjacentHTML("beforeend",
                `<p class="alert">[duplicate... SYSTEM donates 5 Starglitter as an apology.(four star)]</p>`
            );
            cardsContainer.insertAdjacentHTML("beforeend",
                `<div class="card bg-slate-100 shadow-xl h-{1.25rem} w-{17%} m-3">
                    <figure class="pt-10">
                        <img src="/starglitter-icon.png" alt="Masterless Starglitter from Genshin"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Starglitter (x5)</h2>
                        <p>★ ★ ★ ★ ★</p>
                    </div>
                </div>`);
        }
    } else {
        console.log("loading... acquired CHARACTER: " + characterName);
        aquired.push(character);
        alerts.insertAdjacentHTML("beforeend",
            `<p class="alert">[loading... acquired CHARACTER: ${characterName}]</p>`
        );
        let stars = "";
        let bg = ""
        if (rarity === 5) {
            stars = "★ ★ ★ ★ ★";
            bg = "bg-yellow-50";
        } else {
            stars = "★ ★ ★ ★ ☆";
            bg = "bg-violet-200";
        }
        console.log(stars);
        cardsContainer.insertAdjacentHTML("beforeend",
            `<div class="card ${bg} shadow-xl h-{1.25rem} w-{17%} m-3">
                <figure class="pt-10">
                    <img src="${character.imgUrl}" alt="${characterName} from Genshin"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${characterName}</h2>
                    <p>${stars}</p>
                </div>
            </div>`);
    }
}

function gacha(n) {
    const cardsContainer = document.querySelector("#cards");
    cardsContainer.innerHTML = "";
    const alerts = document.querySelector("#alerts");
    alerts.innerHTML = "";
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
                const starglitterCurrent = { ...star, pity: pulls };
                history.push({ ...starglitterCurrent });
                console.log("3RR0R... SYSTEM M@1fu^cti0n. ▇ ▇ has donated 2 Starglitters.");
                alerts.insertAdjacentHTML("beforeend",
                    `<p class="alert">[3RR0R... SYSTEM M@1fu^cti0n. ▇ ▇ has donated 2 Starglitters.]</p>`
                );
                starGlitter += 2;
                cardsContainer.insertAdjacentHTML("beforeend",
                    `<div class="card bg-slate-100 shadow-xl h-{1.25rem} w-{17%} m-3">
                        <figure class="pt-10">
                            <img src="/starglitter-icon.png" alt="Masterless Starglitter from Genshin"
                                class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">Starglitter (x2)</h2>
                            <p>★ ★ ★ ★ ★</p>
                        </div>
                    </div>`);
            }
        }
        DOMSelectors.currency.innerHTML = `Starglitter: ${starGlitter}`;
    }
}

function wish() {
    DOMSelectors.wish.addEventListener("click", function () {
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<button class="button-mine" id="ten">Pull 10x</button>
            <button class="button-mine" id="one">Pull 1x</button>
            <div class="pt-10" id="alerts"></div>
            <div class="grid grid-cols-5 grid-rows-2 m-4 pt-5 w-{100%} h-{20rem}" id="cards"></div>`
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
    DOMSelectors.history.addEventListener("click", function () {
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<div class="overflow-x-auto w-{100%} bg-slate-100">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Rarity</th>
                            <th>Element</th>
                        </tr>
                    </thead>
                    <tbody id="table">
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Rarity</th>
                            <th>Element</th>
                        </tr>
                    </tfoot>
                </table>
            </div>`
        );
        const table = document.querySelector("#table");
        for (const character of history) {
            let stars = "";
            let rarityText = "";
            let bg = "";
            if (character.rarity === 5) {
                if (character.name !== "Starglitter (x2)") {
                    bg = "bg-yellow-50";
                }
                stars = "★ ★ ★ ★ ★";
                rarityText = "FIVE";
            } else {
                stars = "★ ★ ★ ★ ☆";
                rarityText = "FOUR";
                bg = "bg-violet-200";
            }
            table.insertAdjacentHTML("beforeend",
                `<tr>
                <th>${character.pity}</th>
                    <td>
                    <div class="flex items-center gap-3 ${bg}">
                        <div class="avatar">
                            <div class="mask mask-squircle h-12 w-12">
                                <img src="${character.imgUrl}" alt="Images of ${character.name}" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">${character.name}</div>
                            <div class="text-sm opacity-50">${character.title}</div>
                        </div>
                    </div>
                    </td>
                    <td>
                        ${rarityText}
                        <br />
                        <span class="badge badge-ghost badge-sm">${stars}</span>
                    </td>
                <th>
                    <button class="btn btn-ghost btn-xs">${character.element}</button>
                </th>
              </tr>`
            );
        }
    });
}

function shop() {
    DOMSelectors.shop.addEventListener("click", function () {
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<button class="button-mine" id="reroll">Reroll</button>
            <div class="grid grid-cols-3 grid-rows-2 m-4 pt-5 w-{100%} h-{20rem}" id="inventory"></div>`
        );
        const inventory = document.querySelector("#inventory");
        function storeInventory() {
            let store = [];
            let notAquired = [];
            let fourStock = 0;
            let fiveStock = 0;
            for (const character of characters) {
                if (aquired.includes(character) === false) {
                    notAquired.push(character);
                }
            }
            while (store.length !== 6) {
                let rnd = Math.round(Math.random() * (n - 1));
                let character = characters[rnd];
                if (store.includes(character) === false) {
                    let rarity = character.rarity;
                    let inv = {};
                    if (rarity === 5) {
                        if (fiveStock !== 2) {
                            fiveStock++;
                            if (notAquired.includes(character) === false) {
                                inv = { ...character, stock: 0 };
                            } else {
                                inv = { ...character, stock: 1 };
                            }
                            store.push(inv);
                        }
                    } else {
                        if (fourStock !== 4) {
                            fourStock++;
                            if (notAquired.includes(character) === false) {
                                inv = { ...character, stock: 0 };
                            } else {
                                inv = { ...character, stock: 1 };
                            }
                            store.push(inv);
                        }
                    }
                }
            }
            for (const item of store) {
                inventory.insertAdjacentHTML("beforeend",
                    ``  // add card div details + button (add functionality later)
                );
            }
        }
    });
}

function data() {
    DOMSelectors.data.addEventListener("click", function () {
        DOMSelectors.itemContainer.innerHTML = "";
    });
}

async function run() {
    alert("SYSTEM lo@d1n9...pl3ase wa1t. SYSTEM sha11 s3nd an alert when c0mpleted.");
    await getData();
    alert("LOADING... complete. Enjoy!!");
    wish();
    records();
    shop();
    data();
}

run();