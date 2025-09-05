# 📊 Análisis del: Carrito de Compras

## 🎨 Decisiones de Diseño de Interfaz y UX

El diseño de la aplicación se centró en lograr una **experiencia de usuario clara y accesible**:  
- Los productos se presentan en **tarjetas** con información esencial (imagen, título, precio y categoría) para facilitar la comparación visual.  
- El botón **"Agregar al carrito"** está siempre visible, lo que reduce la fricción en la interacción.  
- El carrito se mantiene **accesible en todo momento**, ya sea mediante una sección lateral, modal o zona destacada, lo que permite revisar y modificar los productos sin interrumpir la navegación.  
- Se priorizó la **responsividad**, garantizando una correcta visualización tanto en móviles como en pantallas grandes.  

---

- **Consumo de API:**  
  Se obtienen los productos de `https://fakestoreapi.com/products` usando `fetch()` y se muestran en el DOM.

- **DOM Dinámico:**  
  Los productos se renderizan como tarjetas con imagen, título, categoría, precio y botón **Agregar al carrito**.

- **Carrito de Compras:**  
  - Agregar y eliminar productos.  
  - Calcular el total de la compra.  
  - Persistencia con `localStorage` (el carrito se mantiene al recargar la página).  

- **Filtros y Ordenamientos:**  
  - Filtrar productos por categoría.  
  - Ordenar productos por precio o nombre.  
  - Barra de búsqueda por nombre o descripción.  

- **Eventos:**  
  - `click` → agregar o quitar productos del carrito.  
  - `change` → aplicar filtros u ordenar.  
  - `input` → búsqueda en tiempo real


## 🗂️ Estructura de Datos

- **Representación del carrito:**  
  El carrito se implementa como un **objeto JavaScript** (o array de objetos), donde cada producto incluye:  
  ```js
  {
  id: f.id,
  title: f.title,
  price: f.price,
  description: f.description,
  category: f.category,
  image: f.image,
  rating: 
    rate: f.rating.rate,
    count: f.rating.count
  }


