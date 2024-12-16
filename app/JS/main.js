import '../CSS/style.css';

const DOMSelectors = {
    limited: document.querySelector("#limited"),
    standard: document.querySelector("#standard"),
    history: document.querySelector("#history"),
    container: document.querySelector("#container"),
    itemContainer: document.querySelector("#items")
};

let characters = [];
let history = [];

async function getData() {

}

function limited() {
    DOMSelectors.limited("click", async function () {
        DOMSelectors.itemContainer.className = "";
    })
}