import {setLocalStorage, getLocalStorage, showCartQuantity, alertMessage} from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
      this.url = document.URL;
    }

    async init() {
      //get details for current product
      this.product = await this.dataSource.findProductById(this.productId)
    
      //render HTML with product details
      this.renderProductDetails();
    //add listener to cart button
      document.getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));

    //Code for breadcrumbs (href tags)
    const breadcrumb_element = document.getElementById("product_page_breadcrumb");
    breadcrumb_element.href = this.url;
    const product_category = this.product.Category;
    document.getElementById("list_page_breadcrumb").href = `../product-listing/index.html?category=${product_category}`;
    }

    addProductToCart(product) {
      let cart = getLocalStorage("so-cart");
      if (cart === null) {
        cart = [];
      }
      // adding functionality for quantity
      let item = this.handleQuantity(product, cart);
      // console.log("2.", typeof product, product);
      // pushing item to cart
      if(item["newItem"]){
        cart.push(product);
      } else {
        // let soCart = JSON.parse(localStorage.getItem("so-cart"));
        let Id = product.Id;
        let originalItemAdded = cart.findIndex(item => item.Id === Id);
        cart[originalItemAdded].Quantity = item["newQunatity"];
      }
      setLocalStorage("so-cart", cart);
      alertMessage("An item was successfully added to your cart.")
    }

    handleQuantity(product, cart){
      let newItem = true;
      let newQuantity = {"Quantity": 0};
      for(let i in cart) {
        // console.log("3.", cart[i]);
        if(cart[i].Id === product.Id){
          // console.log("5. ", cart[i].Quantity, typeof product.Quantity, product.Quantity);
          cart[i].Quantity = parseInt(cart[i].Quantity) + 1;
          newQuantity = cart[i].Quantity;
          // console.log("4. ", cart[i].Id, product.Id, typeof cart[i].Quantity, cart[i].Quantity, typeof product.Quantity, product.Quantity);
          newItem = false;
          break;
        }
      }
      if(newItem) {
        product.Quantity = 1;
      }
      // console.log("1.", typeof product.Quantity, product.Quantity);
      return {"newItem" : newItem, "newQunatity" : newQuantity};
    }

    async addToCartHandler(e) {
      //animate icon
      this.play();
      //get product
      const product = await this.dataSource.findProductById(e.target.dataset.id);
      //add product to cart
      this.addProductToCart(product);
      //update icon superscript
      showCartQuantity();
    }
    
    async removeFromCartHandler(e) {
      const product = await this.dataSource.findProductById(e.target.dataset.id);
      removeProductFromCart(product);
      showCartQuantity();
    }

    renderProductDetails(){
      //get discount to insert into product string literal
      let discount = Math.trunc(this.calc_discount());
      //create product string literal
      let product_string =`<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider product_img"
        src="${this.product.Images.PrimaryMedium}"
        alt="${this.product.Name}"/>
      <p class="discount">Sale: ${discount}% Off</p>
      <p class="product-card__price">Was: <strike>$${this.product.SuggestedRetailPrice}</strike> Now: $${this.product.ListPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
      <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      </div>
      </section>`
      //insert HTML
      document.getElementById("product_details").innerHTML = product_string;
    }

    //Code to calculate discounts for products
    calc_discount() {
      return 100 - this.product.ListPrice / this.product.SuggestedRetailPrice*100;
    }

    //Code for animation for cart icon
    play() {
      const cart = document.querySelector('.cart');
      cart.classList.add('cart-animate');
      this.stop();
    }
    stop() {
      const cart = document.querySelector('.cart')
      cart.addEventListener('animationend', function(){cart.classList.remove('cart-animate');});
    }
}
    




