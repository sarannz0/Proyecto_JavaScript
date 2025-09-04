// Boton de abrir y cerrar Nav 
const navButton = document.querySelector(".nav-button");
const nav = document.querySelector(".nav-container");
let open = false;

navButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    open = open == true ? false : true;    
    if (open) {
        navButton.src = "../src/up_arrow.svg";
    } else {navButton.src = "../src/down_arrow.svg"}
});


const formButton = document.querySelector(".open-filter-button");
const titleButton = document.querySelector(".open-filter-button-title");
const imageButton = document.querySelector(".open-filter-buton-image");
const form = document.querySelector(".filter-form");
let formOpen = true;

if (formButton && titleButton && imageButton && form) {

formButton.addEventListener("click", () => {
    formOpen = formOpen == true ? false : true;
    
    if (formOpen) {
        formButton.style.top = "110px";
        form.classList.remove("closed");
        form.style.animation = "none";
        form.offsetHeight;
        form.style.animation = "formAnimation 0.8s ease 0s 1";        
        imageButton.src = "../src/filter_close.svg";
        titleButton.textContent = "Close filter";
    } else {
        formButton.style.top = "30px";
        form.classList.add("closed");
        imageButton.src = "../src/filter_open.svg";
        titleButton.textContent = "Open filter";
    }  
})
}

const carritoUI = document.querySelector(".cart-container");
carritoUI.addEventListener("click", () => document.location.href = "../App/cart.html");

