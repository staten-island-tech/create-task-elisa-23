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
let starglitter = 0;

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

function gacha(n) {
    for (let i = 1; i <= n; i++) {
        pulls++;
        updatePity();
        const num = Math.random();
        if (num < fivePity) {
            fivePity = 0.006;
            //give five star (if duplicate give 3)
        } else {
            if ((num > fivePity) && (num < (fourPity + fivePity))) {
                fourPity = 0.06;
                //give four star (if duplicate give 3)
            } else {
                currency += 3;
                //display on screen
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