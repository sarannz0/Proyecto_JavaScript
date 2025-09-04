import { dataFrom } from "../api.js";
import { parseEvent } from "../helper.js";
import { setMessage, updateCartUI } from "../app.js";


const geo = await dataFrom(parseEvent);
let LocalCart = localStorage.getItem("Cart");
let LocalObj = localStorage.getItem("actualObj");

let ActualObj = LocalObj ? JSON.parse(LocalObj) : {};
let cart = LocalCart ? JSON.parse(LocalCart) : []; 



console.log(cart)

export class Card extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.onCart = false
    }

    connectedCallback() {
        //Elements 
        const obj = this.getObject(this.id, geo);
        const button = this.shadowRoot.querySelector(".cardButton");
        this.onCart = cart.some(e => e.id === obj.id);
        if (!this.onCart) {button.textContent = "Add to cart";} 
        else {button.textContent = "Remove from cart";}


        // Añadir al carrito
        button.addEventListener("click", () => {
            LocalCart = localStorage.getItem("Cart");
            cart = LocalCart ? JSON.parse(LocalCart) : []; 

            if(cart === null) {
                cart = [];
            }

            this.onCart = cart.some(e => e.id === obj.id);

            if (!this.onCart) {
                cart.push(obj);
                button.textContent = "Remove from cart";
                console.log(cart);
                localStorage.setItem("Cart", JSON.stringify(cart));
                setMessage("Operación", `Item añadido al carrito.`);
                updateCartUI();
                /* this.onCart = true; */
            } else {
                cart.forEach((e, i) => {
                    if (e.id == this.id) { cart.splice(i, 1)}
                })
                localStorage.setItem("Cart", JSON.stringify(cart));
                button.textContent = "Add to cart";
                console.log(cart);
                setMessage("Operación", `Item removido del carrito.`);
                updateCartUI();
                /* this.onCart = false; */
            }
            
            this.onCart = cart.some(e => e.id === obj.id);
            

        });

        const detailsButton = this.shadowRoot.querySelector(".titleCard");
        const detailsButton1 = this.shadowRoot.querySelector(".imgCard");
        const detailsButton2 = this.shadowRoot.querySelector(".cardPrice");

        detailsButton.addEventListener("click", () => loadCardPage())
        detailsButton1.addEventListener("click", () => loadCardPage())
        detailsButton2.addEventListener("click", () => loadCardPage())


        function loadCardPage() {
            console.log("Click!");
            ActualObj = obj;
            localStorage.setItem("actualObj", JSON.stringify(ActualObj));
            document.location.href = '../App/cards.html';
        }

        

        
    }

    render(title, price, img, rate, rateCount, id) {
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
            border-radius: 10px;
            width: 260px;
            height: 430px;
            font-family: var(--bodyFont);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.5s ease;
            box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.199);
            }

            .itemCard:hover {
            box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.199);
            }

            .titleCard {
            text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.295);
            margin: 10px;
            margin-bottom: 20px;
            font-size: 1rem;
            width: 220px;
            height: 60px;
            overflow: hidden;
            text-align: center;
            }

            .titleCard:hover {
                cursor: pointer;
                text-decoration: underline;
            }

            .imgCard {
            width: 150px;
            height: 160px;
            }

            .cardPrice {
            font-size: 1.5rem;
            align-self: flex-start;
            margin-left: 30px;
            font-weight: bold;
            text-shadow: -2px 2px 2px rgba(0, 0, 0, 0.185);
            margin-bottom: 0;
            margin-top: 30px;
            }

            .cardDescription {
            width: 200px;
            height: 60px;
            font-size: 0.9rem;
            color: #252525;
            margin-bottom: 30px;
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
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 90px;
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
            width: 200px;
            text-align: center;
            color: white;
            border-radius: 10px;
            transition: all 0.3s ease;
            }

            .cardButton:hover {
            cursor: pointer;
            transform: scale(103%);
            }
        </style>

        <div class="itemCard">
            <img
            src="${img}"
            alt="Imagen"
            class="imgCard"
            />
            <p class="cardPrice">$ ${price} (USD)</p>
            <p class="titleCard">
            ${title}
            </p>

            <div class="cardButton">Add to cart</div>
                <div class="rate-container">
                <div>
                    <img src="../src/star.svg" alt="Icon" />
                    <p class="cardRate">${rate}</p>
                </div>

                <p class="cardRateCount">( ${rateCount})</p>
            </div>
        </div>
      `;
    }

    getObject(id, geo) {
        return geo.find(e => e.id == id);
    }
}
customElements.define("render-card", Card);