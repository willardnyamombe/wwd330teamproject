import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";


// const productListUl = document.querySelector(".product-list");
// // console.log(productListUl);
// const dataSource = new ProductData("tents");
// const productList = new productListing("tents", dataSource, productListUl);
// // productList.init();
loadHeaderFooter();
const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, element);

myList.init();