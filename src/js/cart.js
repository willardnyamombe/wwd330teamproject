import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}

// const cart = new ShoppingCart("so-cart", ".product-list");



// cart.renderCartContents();
