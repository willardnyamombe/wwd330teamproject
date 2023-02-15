import{g as c,s as n,a as l}from"./main.6b8d29ec.js";class d{constructor(t,e){this.key=t,this.parentSelector=e}renderCartContents(){const t=c("so-cart"),e=t.map(a=>this.cartItemTemplate(a));document.querySelector(this.parentSelector).innerHTML=e.join(""),this.cartTotal(),document.querySelectorAll(".cart-card_delete_btn").forEach(a=>{a.addEventListener("click",()=>{this.removeProductFromCart(`${a.value}`)})}),document.querySelectorAll(".qty-in-cart").forEach(a=>{a.addEventListener("change",()=>{a.value>=1?(this.updateItemQuantity(t,a.id,a.value),this.renderCartContents(),n(),this.cartTotal()):(this.renderCartContents(),alert("Please use the delete button to delete an item."))})})}cartItemTemplate(t){const e=`../product_pages/index.html?product=${t.Id}`;return`<img class="cart_img_small_view"
      src="${t.Images.PrimaryMedium}"
      alt="${t.Name}"
    />
      <li class="cart-card divider">
      <a href="${e}" class="cart-card__image">
        <img class="cart_img"
          src="${t.Images.PrimaryMedium}"
          alt="${t.Name}"
        />
      </a>
      <a href="${e}">
        <h2 class="card__name">${t.Name}</h2>
      </a>
      <p class="cart-card__color">${t.Colors[0].ColorName}</p>
      <p class="cart-card__quantity"><label for="qty">qty: </label><input name="qty" id="${t.Id}" class="qty-in-cart" type="number" step="1" pattern="^[2-9]|[1-9][0-9]+$" value="${parseInt(t.Quantity)}"></p>
      <button class="cart-card_delete_btn" value="${t.Id}">X</button>
      <p class="cart-card__price">$${t.FinalPrice}</p>
    </li>`}cartTotal(){let t=c("so-cart");if(t){let e=0;e=e.toFixed(2),e=parseFloat(e),t.forEach(r=>{let s=r.Quantity;e+=s*r.ListPrice}),document.getElementsByClassName("cart-total")[0].innerHTML="Total: $"+e.toFixed(2),document.querySelector(".hide-total").style.display="flex",l("total",e)}else document.querySelector(".hide-total").style.display="none"}removeProductFromCart(t){function e(s,a){return s.Id===a?(r.splice(r.indexOf(s),1),!0):!1}let r=JSON.parse(localStorage.getItem("so-cart"));for(const s of r)if(e(s,t))break;l("so-cart",r),this.renderCartContents(),n()}updateItemQuantity(t,e,r){let s=e,a=t.findIndex(o=>o.Id===s);t[a].Quantity=parseInt(r),l("so-cart",t)}}const i=new d("so-cart",".product-list");i.renderCartContents();
