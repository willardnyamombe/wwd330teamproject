import { getLocalStorage, setLocalStorage, showCartQuantity } from "./utils.mjs"; 
// import Alert from "./alert.mjs"

export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }

    renderCartContents() {
      const cartItems = getLocalStorage("so-cart");
      const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
      

    
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      this.cartTotal();
      let deleteBtns = document.querySelectorAll(".cart-card_delete_btn");
      deleteBtns.forEach(item => {item.addEventListener('click', () => {this.removeProductFromCart(`${item.value}`)})});
      
      // adding update quantity functionality to our cart
      let quantityInputs = document.querySelectorAll(".qty-in-cart");
      quantityInputs.forEach(item => {item.addEventListener('change', () => {
        if(item.value  >= 1){
          this.updateItemQuantity(cartItems, item.id, item.value);
          this.renderCartContents();
          showCartQuantity();
          this.cartTotal();
        } else {
          this.renderCartContents();
          alert("Please use the delete button to delete an item.")
          // Alert.create("../public/json/alert-quantityInCartError.json")
        }
      })})
    }

    //function to create template
    cartItemTemplate(item) {
      const productDetailsPage = `../product_pages/index.html?product=${item.Id}`;
      const newItem = `<img class="cart_img_small_view"
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
      <li class="cart-card divider">
      <a href="${productDetailsPage}" class="cart-card__image">
        <img class="cart_img"
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="${productDetailsPage}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity"><label for="qty">qty: </label><input name="qty" id="${item.Id}" class="qty-in-cart" type="number" step="1" pattern="^[2-9]|[1-9][0-9]+$" value="${parseInt(item.Quantity)}"></p>
      <button class="cart-card_delete_btn" value="${item.Id}">X</button>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
    
      return newItem;
    }
   
    //The cartTotal function calculates the sum of the cost of items in the cart
    cartTotal() {
      //save the items array in local storage to the variable 'cart'
      let cartItems = getLocalStorage("so-cart");
    
      //if there is an item in the cart, calculate and show the total
      //else hide the div
      if (cartItems) {
        let sum = 0;
        sum = sum.toFixed(2);
        sum = parseFloat(sum);
        //loop through items in so-cart
        //pull list price from array and add to sum
        cartItems.forEach((item) => {
          let quantity = item.Quantity
          sum += quantity * item.ListPrice;
        });
        //insert sum into html
        document.getElementsByClassName("cart-total")[0].innerHTML =
          "Total: $" + sum.toFixed(2);
        //document.querySelector(".cart-total").innerHTML = "Total: $" + sum;
        //unhide element
        document.querySelector(".hide-total").style.display = "flex";
        setLocalStorage("total", sum);
        // console.log(sum);
        // console.log(typeof sum);
        
      } else {
        //hide element
        document.querySelector(".hide-total").style.display = "none";
      }
      
    }

    removeProductFromCart(productId) {
      // find the id in the local storage "so-cart" object and remove the first one with the same id as given
      // function to delete when match is found
      function rem(itemInCart, idToDelete) {
        if(itemInCart['Id'] === idToDelete) { (ar.splice(ar.indexOf(itemInCart), 1)); return true;
        } else { return false;}
      }
      // variable to hold the array of items in cart
      let ar = JSON.parse(localStorage.getItem("so-cart"));
      // loop to find match
      for (const itemInCart of ar){ if(rem(itemInCart, productId)){break;}};
      // set local storage to new array
      setLocalStorage("so-cart", ar)
      // render the cart again now that the item is removed
      this.renderCartContents();
      showCartQuantity();
    }

    updateItemQuantity(cart, id, quantity){
      let Id = id;
      let itemToUpdate = cart.findIndex(item => item.Id === Id);
      cart[itemToUpdate].Quantity = parseInt(quantity);
      setLocalStorage("so-cart", cart);
    }
}