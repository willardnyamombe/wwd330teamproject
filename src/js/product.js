import { getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);

product.init();
