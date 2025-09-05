import { setMessage, updateCartUI } from "../app.js";

export class Search extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {

    }

    render(search, result) {
        this.shadowRoot.innerHTML = `
            <style>
                .search-item {
                    transition: all 0.3s all;
                    font-family: var(--bodyFont);
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    box-shadow: 0px 3px 3px 2px rgba(0, 0, 0, 0.199);
                }

                .search-text {
                width: 400px;
                font-weight: normal;
                height: auto;
                }
                .left-search-container {
                    margin-left: 20px;
                    display: flex;
                    gap: 20px;
                }

                .search-results {
                margin-right: 30px;
                font-weight: bold;
                
                }

                @media (max-width: 910px) and (min-width: 0px){
                    .search-item {
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        
                    }

                    .search-text {
                        width: 200px;
                    }

                    .search-results {
                        margin: 0px;
                        margin-bottom: 10px;
                        margin-left: 65px;
                    }
                }
            </style>

            <div class="search-item">
                    <div class="left-search-container">
                    <img src="../src/search.svg" alt="">
                    <h3 class="search-text">${search}</h3>
                    </div>
                    <p class="search-results"> Resultados: ${result}</p>
                </div>
            </div>

        `;

    }
}

customElements.define("search-item", Search);