// Exportar Funciones
import { parseEvent } from "./helper.js";
import { dataFrom } from "./api.js";
import { Msg } from "./object/message.js";
import { Card } from "./object/card.js";

const geo = await dataFrom(parseEvent);

// TODO: Cagar Categorias

let categories = new Set();
geo.map((e) => {
  categories.add(e.category);
});

let filterSelect = document.querySelector(".formSelect");


export function loadCategorys() {
  if (filterSelect) {
    categories.forEach((e) => {
      let option = document.createElement("option");
      option.value = e;
      option.textContent = e;

      filterSelect.appendChild(option);
    });
  }
}
  




console.log(geo);

// TODO: Filter function

// Elementos



const fCategory = document.querySelector("#category");

const fPriceMax = document.querySelector("#PriceMax");
const fPriceMin = document.querySelector("#PriceMin");
const fRate = document.querySelector("#rate");
const fSearchButton = document.querySelector(".sButton");
const fForm = document.querySelector(".filter-form");
const fSearchBar = document.querySelector("#searchBar");

const checkPrice = document.querySelector("#checkPrice");
const checkRate = document.querySelector("#rateCheck");


if (checkPrice && checkRate && fPriceMax && fPriceMin && fRate && fCategory && fSearchBar && fSearchButton && fForm && fSearchBar) {
  checkPrice.addEventListener("click", () => {
  if (checkPrice.checked == false) {
    fPriceMax.style.display = "none";
    fPriceMin.style.display = "none";
    fPriceMax.value = "";
    fPriceMin.value = "";
  } else {
    fPriceMax.style.display = "block";
    fPriceMin.style.display = "block";
  }

  })

  checkRate.addEventListener("click", () => {
    if (checkRate.checked == false) {
      fRate.style.display = "none";
      fRate.value = "";

    } else {
      fRate.style.display = "block";

    }

  })

let LocalHistory = localStorage.getItem("searchList");
let history = LocalHistory ? JSON.parse(LocalHistory) : [];


function filter() {
  

  if (!fForm.checkValidity()) {
    setMessage("Error", "Hubo un error al intentar buscar los datos");
    fForm.reportValidity();
    return;
  }

  let formulario = {
    category: fCategory.value,
    priceMax: Number(fPriceMax.value),
    priceMin: Number(fPriceMin.value),
    rate: Number(fRate.value),
    bar: fSearchBar.value.split(" ")
  };
  console.log(formulario.bar)
  console.log(formulario);
  

  let objectosFiltrados = [];
  let searched = formulario.bar.join(" ");
  console.log(searched)

  geo.forEach((e) => {

    let words = 0;
    if (formulario.category != "all" && e.category != formulario.category) {
      return;
    }
    if (checkPrice.checked == true) {
      if (e.price < formulario.priceMin || e.price > formulario.priceMax) {
        return;
      }
    }

    if (checkRate.checked == true) {
      if (e.rating.rate < formulario.rate) {
        return;
      }
    }

    formulario.bar.forEach((s) => {
      if (e.title.toLowerCase().includes(s.toLowerCase())) {
          words += 1;
      }
    });

    if (words <= 0) {return}

    objectosFiltrados.push(e);
  });


  LocalHistory = localStorage.getItem("searchList");
  history = LocalHistory ? JSON.parse(LocalHistory) : [];
  let resultados = objectosFiltrados.length;
  let searchItem = {
    result: resultados,
    msg: searched,
  }
  
  if (searched.length > 0) {
    console.log(searchItem);
    history.push(searchItem);
    console.log(history);
    localStorage.setItem("searchList", JSON.stringify(history));
  }

    if (objectosFiltrados.length <= 0) {
      setMessage("Error Inesperado", "No fue posible encontrar elementos");
      renderCard(geo);
      return

    } else {
      renderCard(objectosFiltrados);
    }
  
  
}

fSearchButton.addEventListener("click", (e) => { 
  e.preventDefault();
  filter()
});

fCategory.addEventListener("change", () => {
  filter();
});

}
//TODO: Message Error


export function setMessage(title, error) {
  const mensajeError = document.createElement("error-msg");
  mensajeError.setAttribute("title", title);
  mensajeError.setAttribute("error", error);
  document.body.appendChild(mensajeError);
}


// TODO: Render Cards 



function renderCard(obj) {
  const mainCard = document.querySelector(".mainCards");
  if (mainCard) {
    mainCard.querySelectorAll("render-card").forEach(card => card.remove());
  

  obj.forEach((e) => {
    const element = document.createElement("render-card");
    element.render(e.title, e.price, e.image, e.rating.rate, e.rating.count, e.id);
    document.querySelector(".mainCards").appendChild(element);
  })
  }
  
}

export function updateCartUI() {
  let LocalCart = localStorage.getItem("Cart");
  let cart = LocalCart ? JSON.parse(LocalCart) : [];
  let cartUI = document.querySelector(".cart-count");
  cartUI.style.animation = "none";
  cartUI.offsetHeight;
  cartUI.style.animation =  "cartAnimation 0.3s ease 1";
  
  cartUI.textContent = cart.length;
}
renderCard(geo);
updateCartUI();
loadCategorys();



// Cart UI ITem







