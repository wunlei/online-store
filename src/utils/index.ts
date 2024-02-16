export function getCategoryFromUrl() {
  const currentUrl = window.location.href;
  const searchParams = new URL(currentUrl).searchParams;
  return searchParams.get("category");
}

export function getCartFromLS() {
  const cartString = localStorage.getItem("cart");
  return cartString ? JSON.parse(cartString) : null;
}
