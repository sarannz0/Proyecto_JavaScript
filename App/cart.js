import { CartObj } from "./object/cartObj.js";
import { updateCartUI } from "./app.js";

let Localcart = localStorage.getItem("Cart");
let cart = Localcart ? JSON.parse(Localcart) : [];


const iProducts = document.querySelector(".info-products");
const iTotal = document.querySelector(".info-total");
const iclear = document.querySelector(".clearCart-button");
const cards = document.querySelectorAll("main");
const footer = document.querySelector("footer");

const descButton = document.querySelector(".aply-button");
const descInput = document.querySelector(".descInput");
const descText = document.querySelector(".desc-total")

iclear.addEventListener("click", () => {
  cart.forEach((e, i) => {
    cart.splice(i, cart.length);
  })
  localStorage.setItem("Cart", JSON.stringify(cart));
  
  updateCartUI();
  updateCartData();
  cards.forEach(c => c.remove());
  footer.parentNode.insertBefore(document.createElement("main"), footer);
})

let descTotal = 0;

export function updateCartData() {


    let subtotal = 0;
    Localcart = localStorage.getItem("Cart");
    cart = Localcart ? JSON.parse(Localcart) : [];

    let cantP = 0;

    console.log(cart);
    
    cart.forEach( (e) => {
      subtotal += e.price * e.cant;
      
      cantP += e.cant;
    });
    cards.innerHTML = "";
    descTotal = subtotal;
    iTotal.textContent = `Subtotal: $${subtotal.toFixed(2)} (USD)`;

    iProducts.textContent = `Total products: ${cantP}`;
    calcularDesc();
}


function renderCard(obj) {
  const mainCard = document.querySelector("main");
  if (mainCard) {
    /* mainCard.querySelectorAll("render-card").forEach(card => card.remove()); */
  
  obj.forEach((e) => {
    const element = document.createElement("cart-card");
        element.renderCart(e.title, e.price, e.image, e.rating.rate, e.rating.count, e.description, e.id, e.cant);
        document.querySelector("main").appendChild(element);
  })
  }
  
}

descButton.addEventListener("click", (e) => {

  calcularDesc();
  e.preventDefault();

})

const dForm = document.querySelector(".dForm")

export function calcularDesc() {
  if (!dForm.checkValidity()) {
      dForm.reportValidity();
      return;
  }

  let total = descInput.value / 100 * descTotal;
  console.log(total);
  descText.textContent = `Total con descuento: $${descTotal - total} (USD)`;
}

renderCard(cart);
updateCartData();
