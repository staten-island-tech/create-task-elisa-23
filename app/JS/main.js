import '../CSS/style.css';

const DOMSelectors = {
    wish: document.querySelector("#wish"),
    history: document.querySelector("#history"),
    shop: document.querySelector("#shop"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items")
};

let characters = [];
let aquired = [];

let fivePity = 0.006;
let fourPity = 0.06;

let pulls = 0;
let starGlitter = 0;

async function getData() {

}

//add to getData once you finish it -- put the variables outside of the function (organize later...)
let five = 0;
let fiveStars = [];
characters.forEach(character => {
    if (character.rarity === 5) {
        five++;
        fiveStars.push(character);
    }
});

let four = 0;
let fourStars = [];
characters.forEach(character => {
    if (character.rarity === 4) {
        four++;
        fourStars.push(character);
    }
});

function updatePity() {
    if ((pulls >= 75) && (pulls <= 90)) {
        fivePity += .066;
    } else {
        if (pulls % 10 === 0) {
            fourPity = 0.994;
        } else if (pulls % 10 >= 5) {
            fourPity += 0.188;
        }
    }
}

function getCharacter(characts, rarity, n) {
    let rnd = Math.round(Math.random() * (n - 1));
    const character = characts[rnd];
    if (aquired.includes(character) === true) {
        if (rarity === 5) {
            console.log("duplicate... SYSTEM donates 25 Starglitter as an apology.");
            starGlitter += 25;
            //add or display on screen - modal
        } else {
            console.log("duplicate... SYSTEM donates 5 Starglitter as an apology.");
            starGlitter += 5;
            //add or display on screen - modal
        }
    } else {
        console.log("loading... acquired CHARACTER: " + character);
        aquired.push(character);
        //add or display on screen - use diff
    }
}

function gacha(n) {
    for (let i = 1; i <= n; i++) {
        pulls++;
        updatePity();
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
                //add or display on screen - modal
            }
        }
    }
}

function wish() {
    DOMSelectors.wish.addEventListener("click", async function () {
        DOMSelectors.itemContainer.className = "w-[100%] h-[75rem] mt-[-1.5rem] pt-6";
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<button class="rounded-btn bg-blue-200" id="ten">Pull 10x</button>
            <button class="rounded-btn bg-blue-200" id="one">Pull 1x</button>`
        );
        const ten = DOMSelectors.querySelector("#ten");
        const one = DOMSelectors.querySelector("#one")
        ten.addEventListener("click", function () {
            DOMSelectors.itemContainer.innerHTML = "";
            gacha(10);
        });
        one.addEventListener("click", function () {
            DOMSelectors.itemContainer.innerHTML = "";
            gacha(1);
        });
    });
}

wish();

function history() {

}

history();