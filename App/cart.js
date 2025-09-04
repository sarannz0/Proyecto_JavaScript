import { CartObj } from "./object/cartObj.js";
import { updateCartUI } from "./app.js";

let Localcart = localStorage.getItem("Cart");
let cart = Localcart ? JSON.parse(Localcart) : [];


const iProducts = document.querySelector(".info-products");
const iTotal = document.querySelector(".info-total");
const iclear = document.querySelector(".clearCart-button");
const cards = document.querySelectorAll("main");

iclear.addEventListener("click", () => {
  cart.forEach((e, i) => {
    cart.splice(i, cart.length);
  })
  localStorage.setItem("Cart", JSON.stringify(cart));
  updateCartUI();
  updateCartData();
  cards.forEach(c => c.remove());
})


export function updateCartData() {
    Localcart = localStorage.getItem("Cart");
    cart = Localcart ? JSON.parse(Localcart) : [];
    let subtotal = 0;
    cart.forEach( e => {
      subtotal += e.price;
    })

    cards.innerHTML = "";

    iTotal.textContent = `Subtotal: $${subtotal.toFixed(2)} (USD)`;
    iProducts.textContent = `Products: ${cart.length}`;
}


function renderCard(obj) {
  const mainCard = document.querySelector("main");
  if (mainCard) {
    /* mainCard.querySelectorAll("render-card").forEach(card => card.remove()); */
  
  obj.forEach((e) => {
    const element = document.createElement("cart-card");
        element.renderCart(e.title, e.price, e.image, e.rating.rate, e.rating.count, e.description, e.id);
        document.querySelector("main").appendChild(element);
  })
  }
  
}
renderCard(cart);
updateCartData();
