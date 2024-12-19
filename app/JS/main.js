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

let fivePity = 0.006;
let fourPity = 0.06;

let pulls = 0;


function limited() {
    DOMSelectors.limited.addEventListener("click", async function () {
        DOMSelectors.itemContainer.className = "w-[100%] h-[75rem] mt-[-1.5rem] pt-6";
        DOMSelectors.itemContainer.innerHTML = "";
        DOMSelectors.itemContainer.insertAdjacentHTML("beforeend",
            `<button class="rounded-btn bg-blue-200">Pull 10x</button>
            <button class="rounded-btn bg-blue-200">Pull 1x</button>`
        );
        //enter the rest of the code
    })
}

limited();

function history() {
    DOMSelectors.history.addEventListener("click", async function () {
        DOMSelectors.itemContainer.className = "w-[100%] h-[75rem] mt-[-1.5rem] pt-6 grid grid-cols-4 gap-4";
        DOMSelectors.itemContainer.innerHTML = ``;
        aquired
            .sort()
            .forEach((character) => {
                DOMSelectors.container.insertAdjacentHTML("beforeend",
                    `<div class="card card-side justify-around shadow-xl w-[23rem] h-56 bg-white">
                        <figure class="px-10">
                            <img
                                src="https://genshin.jmp.blue/characters/${character}/icon-big"
                                alt="The icon of ${character}"
                                class="rounded-xl w-full h-full object-cover" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${character}</h2>
                        </div>
                    </div>`
                )
            });
    });
}

history();