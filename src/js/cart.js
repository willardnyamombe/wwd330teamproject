import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";



const cart = new ShoppingCart("so-cart", ".product-list");

cart.renderCartContents();
