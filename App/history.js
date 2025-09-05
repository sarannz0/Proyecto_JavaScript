import { Search } from "./object/hsObj.js";

let LocalSearchList = localStorage.getItem("searchList");
let history = LocalSearchList ? JSON.parse(LocalSearchList) : [];
const countText = document.querySelector(".search-count");
const aloneText = document.querySelector(".text-alone")
function renderItem() {
    history.length <= 0 ? aloneText.style.display = "block" : aloneText.style.display = "none";

    history.forEach((e) => {
        const element = document.createElement("search-item");
        element.render(e.msg, e.result);
        document.querySelector(".mainContainer").appendChild(element);
    });

    countText.textContent = `Searches: ${history.length}`;
}

renderItem();
