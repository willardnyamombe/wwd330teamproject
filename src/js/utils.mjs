// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

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
  let headerContent = await loadTemplate("/partials/header.html");
  let footerContent = await loadTemplate("/partials/footer.html");
  let headerElement = document.querySelector("#header");
  let footerElement = document.querySelector("#footer");
  renderWithTemplate(headerContent, headerElement);
  renderWithTemplate(footerContent, footerElement);
  showCartQuantity();
}

// function to Add a superscript number of items
// in the cart to the backpack icon.
export function showCartQuantity() {
  let new_cart = getLocalStorage("so-cart");
  // select the div element I (prince) added to the all the html docs.
  let cartQuantityElement = document.querySelector("#cart-items-number");
  // Set the superscript to the number of items in the cart 'IF'
  // there is an item in the cart.
  if (new_cart) {
    let quantity = 0;
    for (let i in new_cart){
      quantity += new_cart[i].Quantity;
    }
    cartQuantityElement.textContent = quantity;
    cartQuantityElement.style.display = "block";
  } else {
    cartQuantityElement.style.display = "none";
  }
}

//handling an unhappy path
export function alertMessage(message, scroll=true) {
  //create a div to hold the alert
  const alert = document.createElement('div');
  //add a class to the alert div
  alert.classList.add('alert');
  //insert the alert's message and an X to close the alert
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  //add an eventlistener to the X to remove the alert
  alert.addEventListener('click', function (e) {
    if(e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  //get the main element and store it to a variable
  const main = document.querySelector('main');
  //prepend the alert to the main container so it shows at the top
  main.prepend(alert);
  //set the scroll so that the window will automatically scroll up 
  //to the top for the user to see the alert
  if (scroll)
  window.scrollTo(0, 0);
}
