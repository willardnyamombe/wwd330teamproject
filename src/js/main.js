import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { productCardTemplate } from "./productList.mjs";

loadHeaderFooter().then(() => {
  document.forms[0].addEventListener("submit", () => {
    let searchString = document.querySelector(".search-input").value;
    setLocalStorage("search-string", searchString.trim());
  });

  // check if page redirected correctly.
  if (window.location.href.includes("/product-listing/products-search.html")) {
    renderProductSearchResult();
  }
});

async function renderProductSearchResult() {
  let searchString = getLocalStorage("search-string").toLowerCase();
  const dataSource = new ExternalServices();
  const listUl = document.querySelector(".product-list");
  const titleHtml = document.querySelector(".title");

  // Get all products matching search string from database.
  let allProducts = await dataSource.findProductBySearchString(searchString);

  // render the search results.
  renderListWithTemplate(productCardTemplate, listUl, allProducts);
  titleHtml.innerHTML = `Showing ${allProducts.length} results for "${searchString}"`;
}
