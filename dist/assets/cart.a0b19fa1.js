import{g as c}from"./utils.18820f4f.js";function i(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Images.PrimaryMedium}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}class l{constructor(t,e){this.key=t,this.parentSelector=e}async init(){const t=c(this.key);this.calculateListTotal(t),this.renderCartContents(t)}calculateListTotal(t){const e=t.map(r=>r.FinalPrice);this.total=e.reduce((r,o)=>r+o)}renderCartContents(){const e=c(this.key).map(r=>i(r));document.querySelector(this.parentSelector).innerHTML=e.join(""),document.querySelector(".list-total").innerText+=` $${this.total}`}}const s=new l("so-cart",".product-list");s.init();s.total>0&&document.querySelector(".list-footer").classList.remove("hide");
