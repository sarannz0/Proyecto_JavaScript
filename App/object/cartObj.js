import { dataFrom } from "../api.js";
import { parseEvent } from "../helper.js";
import { setMessage, updateCartUI } from "../app.js";
import { updateCartData } from "../cart.js";
const geo = await dataFrom(parseEvent);

let Localcart = localStorage.getItem("Cart");
let cart = Localcart ? JSON.parse(Localcart) : [];

let LocalObj = localStorage.getItem("actualObj");
let ActualObj = LocalObj ? JSON.parse(LocalObj) : {};

export class CartObj extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.onCart = false;
    }

    connectedCallback() {
        const obj = this.getObject(this.id, geo);
        const deleteButton = this.shadowRoot.querySelector(".cardButton");

        deleteButton.addEventListener("click", () => {
            console.log("hi");
            setMessage("Operación", "Item removido correctamente");
            cart.forEach((e, i) => {
                if (e.id == this.id) { cart.splice(i, 1)}
            })
            localStorage.setItem("Cart", JSON.stringify(cart));
            updateCartUI();
            updateCartData();
            this.remove();
        });


        const detailsButton = this.shadowRoot.querySelector(".titleCard");

        detailsButton.addEventListener("click", () => {
            console.log("Click!");
            ActualObj = obj;
            localStorage.setItem("actualObj", JSON.stringify(ActualObj));
            document.location.href = '../App/cards.html';
            
        })
    }

    renderCart(title, price, img, rate, rateCount, dec, id) {
        this.id = id;
        this.shadowRoot.innerHTML = `
            <style>
                @keyframes load {
                    0% {
                        opacity: 0;
                        transform: translateY(25%);
                        color: white;
                        box-shadow: none;
                    }

                    80% {
                        opacity: 1;
                        transform: translateY(0%);
                    }

                    100% {
                        color: #252525;
                        box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.199);
                    }
                }

                .itemCard {
                    animation: load 0.8s ease 0s 1;
                    position: relative;
                    border-radius: 10px;
                    height: 200px;
                    width: 960px;
                    font-family: var(--bodyFont);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.5s ease;
                    box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.199);
                }

                .left-content {
                    display: flex;
                    max-width: 70%;
                    justify-content: center;
                    align-items: center;
                }

                .content_container {
                    max-width: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }

                .titleCard {
                    text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.295);
                    margin-top: 10px;
                    margin-bottom: 0px;
                    font-size: 1rem;
                    min-width: 220px;
                    height: 60px;
                    overflow: hidden;
                    text-align: start;
                    font-weight: bold;
                }

                .titleCard:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }

                .imgCard {
                    width: auto;
                    max-width: 120px;
                    height: auto;
                    max-height: 180px;
                    padding: 40px;
                }

                .cardPrice {
                    font-size: 1.5rem;
                    align-self: flex-start;
                    font-weight: bold;
                    max-width: 200px;
                    text-shadow: -2px 2px 2px rgba(0, 0, 0, 0.185);
                    margin-bottom: 0;
                    margin-top: 0;
                }

                .decCard {
                    width: 370px;
                    max-width: 80%;
                    height: 55px;
                    overflow: hidden;
                    font-size: 0.9rem;
                    color: #252525;
                    margin-top: 5px;
                    margin-bottom: 0px;
                }

                .cardRate {
                    margin: 0;
                    font-size: 1rem;
                }

                .cardRateCount {
                    margin: 0;
                    font-weight: bold;
                }

                .rate-container {
                    right: 40px;
                    top: 0;
                    position: absolute;
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }

                .rate-container div {
                    display: flex;
                    gap: 5px;
                    align-items: center;
                }

                .cardButton {
                    background-color: #252525;
                    padding: 10px 0px;
                    width: 55px;
                    height: 60px;
                    text-align: center;
                    color: white;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    margin-top: 30px;
                    background-image: url("../src/delete-img.svg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 65%;
                    margin-right: 30px;
                }

                .cardButton:hover {
                    background-color: rgb(207, 67, 67);
                    cursor: pointer;
                    transform: scale(103%);
                }
                
                @media (min-width: 910px) and (max-width: 1150px) {
                    .itemCard {
                        width: 750px;
                    }
                }


                @media (max-width: 910px) and (min-width: 580px){ 
                    .itemCard {
                        width: 550px;
                    }

                    .decCard {
                        width: 200px;
                    }

                    .titleCard{
                        width: 200px;
                    }
                }


                @media (max-width: 580px) { 
                    .itemCard {
                        padding: 20px;
                        width: 300px;
                        min-height: 450px;
                        height: auto;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .left-content {
                        flex-direction: column;
                    }

                    .content-container {
                        width: 300px;
                    }

                    .rate-container {
                        top: -10px;
                        right: 10px;
                    }

                    .cardPrice {
                        width: 200px;
                    }

                    .decCard {
                        width: 200px;
                    }

                    .cardButton {
                        width: 300px;
                        height: 40px;
                        margin: 0px;
                        margin-top: 20px;
                        padding: 0px;
                        background-size: 10%;
                    }
                }
            </style>
        

            <div class="itemCard">
            
            <div class="left-content">
                <img src="${img}" alt="Imagen" class="imgCard"/>
                <div class="content-container">
                    <p class="titleCard">${title}</p>
                    <p class="cardPrice">$ ${price} (USD)</p>
                    <p class="decCard">${dec}</p>
                </div>
            </div>
            
            <div class="rate-container">
                <div>
                    <img src="../src/star.svg" alt="Icon" />
                    <p class="cardRate">${rate}</p>
                </div>

                <p class="cardRateCount">( ${rateCount})</p>
            </div>
            <div class="cardButton"></div>
            
        </div>

        `;
    }

    getObject(id, geo) {
        return geo.find(e => e.id == id);
    }

}

customElements.define("cart-card", CartObj);