// API
const END_POINT = "https://fakestoreapi.com/products";

// Cagar Datos del API

async function loadData() {
  const result = await fetch(END_POINT, {
    method: "GET",
  });

  if (!result.ok) throw new Error(`HTTP ${result.status}`);
  return await result.json();
}

// Obtener Datos del API

export const dataFrom = async () => {
  try {
    return await loadData();
  } catch (error) {
    console.log(`Error al cargar los datos: ${error}`);
    return {};
  }
};
