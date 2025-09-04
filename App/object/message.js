export class Msg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.time();
    this.shadowRoot.querySelector(".deleteMessage").addEventListener("click", () => {this.deleteMessage();});
  }

  time() {
    setTimeout(() => {
      this.deleteMessage();
      this.shadowRoot.querySelector(".messageCard").style.transform =
        "translateX(120%)";
    }, 3000);
  }

  render() {
    const title = this.getAttribute("title") || "Sin titulo";
    const error = this.getAttribute("error") || "Sin error";

    this.shadowRoot.innerHTML = `
            <style>
                .messageCard {
                right: 30px;
                bottom: 30px;
                width: 300px;
                height: 120px;
                position: fixed;
                border: 3px solid var(--black-color);
                border-radius: 10px;
                font-family: var(--bodyFont);
                background-color: white;
                box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.253);
                transition: all 1s ease;
                transform: translateX(120%);
                }

                .messageCard h1 {
                color: var(--black-color);
                font-size: 1.3rem;
                margin-left: 20px;
                }

                .messageCard p {
                color: var(--black-color);
                margin-left: 20px;
                max-height: 40px;
                max-width: 250px;
                overflow: hidden;
                }

                .deleteMessage {
                font-weight: bold;
                font-size: 1.4rem;
                position: absolute;
                top: 15px;
                right: 20px;
                }

                .deleteMessage:hover {
                cursor: pointer;
                }
            </style>

            <div class="messageCard">
                <h1>${title}</h1>
                <p>${error}</p>
                <div class="deleteMessage">X</div>
            </div>
        `;

    setTimeout(() => {
      this.shadowRoot.querySelector(".messageCard").style.transform =
        "translateX(0%)";
    }, 500);
  }

  deleteMessage() {
    setTimeout(() => this.remove(), 1000);
  }
}

customElements.define("error-msg", Msg);
