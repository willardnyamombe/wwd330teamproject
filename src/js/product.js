import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// add to cart button event handler
/*

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  showCartQuantity();

*/
export function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (cart === null) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

export function removeProductFromCart() {
  // paste code here
}

// function to Add a superscript number of items
// in the cart to the backpack icon.
export function showCartQuantity() {
  let cart = getLocalStorage("so-cart");
  // console.log(cart);
  // select the div element I (prince) added to the all the html docs.
  let cartQuantityElement = document.querySelector("#cart-items-number");
  // console.log(cartQuantityElement);
  // Set the superscript to the number of items in the cart 'IF'
  // there is an item in the cart.
  if (cart) {
    cartQuantityElement.textContent = cart.length;
    cartQuantityElement.style.display = "block";
  } else {
    cartQuantityElement.style.display = "none";
  }
}
