import '../CSS/style.css';

const DOMSelectors = {
    limited: document.querySelector("#limited"),
    standard: document.querySelector("#standard"),
    history: document.querySelector("#history"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items")
};

let characters = [];
let aquired = [];

async function getData() {

}

function limited() {
    DOMSelectors.limited.addEventListener("click", async function () {
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            ``
        )
    })
}

function history() {
    DOMSelectors.history.addEventListener("click", async function () {
        DOMSelectors.itemContainer.innerHTML = "";

    })
}