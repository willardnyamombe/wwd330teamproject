import{a as c,b as s,s as a}from"./utils.18820f4f.js";import"./main.fed1da42.js";import{P as o}from"./ProductData.e00ae580.js";const i=c("product"),d=new o("tents");class e{constructor(t,r){this.productId=t,this.product={},this.dataSource=r,this.show=!1}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCartHandler.bind(this))}async addToCartHandler(t){this.play();const r=await d.findProductById(t.target.dataset.id);s(r),a()}async removeFromCartHandler(t){const r=await d.findProductById(t.target.dataset.id);removeProductFromCart(r),a()}renderProductDetails(){let t=Math.trunc(this.calc_discount()),r=`<section class="product-detail">

        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.Name}"
        />

        <p class="discount">Sale: ${t}% Off</p>
        <p class="product-card__price">Was: <strike>$${this.product.SuggestedRetailPrice}</strike> Now: $${this.product.ListPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
        <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      </div>
      </section>`;document.getElementById("product_details").innerHTML=r}calc_discount(){return 100-this.product.ListPrice/this.product.SuggestedRetailPrice*100}play(){document.querySelector(".cart").classList.add("cart-animate"),this.stop()}stop(){const t=document.querySelector(".cart");t.addEventListener("animationend",function(){t.classList.remove("cart-animate")})}}const n=new e(i,d);n.init();
