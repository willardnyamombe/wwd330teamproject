import { getLocalStorage } from "./utils.mjs";
const id = getLocalStorage("order-id");
document.getElementById(
  "confirmation-No"
).innerHTML = `Your confirmation number is: ${id}`;
