
import ProductData from "./ProductData.mjs";
import { getParams} from "./utils.mjs";
import { addProductToCart, showCartQuantity } from "./product.js";

const productId = getParams("product");
const dataSource = new ProductData("tents");


export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.show = false;
    }


    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
    
        this.product = await this.dataSource.findProductById(this.productId)
        this.renderProductDetails();

        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.

        document.getElementById("addToCart")
        .addEventListener("click", this.addToCartHandler.bind(this));
    }
    
    async addToCartHandler(e) {
        this.play();
        const product = await dataSource.findProductById(e.target.dataset.id);
        addProductToCart(product);
        showCartQuantity();
    }
    
    async removeFromCartHandler(e) {
      const product = await dataSource.findProductById(e.target.dataset.id);
        removeProductFromCart(product);
        showCartQuantity();
    }


    renderProductDetails(){
        let discount = Math.trunc(this.calc_discount());

        let product_string =`<section class="product-detail">

        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.Name}"
        />

        <p class="discount">Sale: ${discount}% Off</p>
        <p class="product-card__price">Was: <strike>$${this.product.SuggestedRetailPrice}</strike> Now: $${this.product.ListPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
        <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      </div>
      </section>`

      document.getElementById("product_details").innerHTML = product_string;
      
    }

    calc_discount() {
      return 100 - this.product.ListPrice / this.product.SuggestedRetailPrice*100;

    }

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
    
const product = new ProductDetails(productId, dataSource);
product.init();



