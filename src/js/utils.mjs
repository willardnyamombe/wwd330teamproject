import { showCartQuantity } from "./product";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const ListArrayHtml = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  } else { // in the teachers it shows this piece of code to always run, in other words, there is no else or brackets *just noting in case it is relevant later or we get some kind of error if the above if statement with clear comes back true*
    parentElement.insertAdjacentHTML(position, ListArrayHtml.join(""));
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  let response = await fetch(path);
  if(response.ok) {
    let text = await response.text()
    return text;
  } else {
    throw new Error("Failed to load path.")
  }
}


export async function loadHeaderFooter() {
  let headerContent = await loadTemplate('/partials/header.html');
  let footerContent = await loadTemplate('/partials/footer.html');
  let headerElement = document.querySelector('#header');
  let footerElement = document.querySelector('#footer');
  renderWithTemplate(headerContent, headerElement);
  renderWithTemplate(footerContent, footerElement);
  showCartQuantity();
}
