export async function getProducts() {
  const response = await fetch("http://localhost:8080/products");
  if (response.ok) return response.json();
  throw response;
}
export async function getCartItems() {
  // fetch carts from api
  const response = await fetch("http://localhost:8080/cart/items");
  if (response.ok) return response.json();
  throw response;
}
