import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const listing = new ProductListing("tents", dataSource, listElement);

listing.init();

