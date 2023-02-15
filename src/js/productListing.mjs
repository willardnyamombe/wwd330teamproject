import ExternalServices from "./ExternalServices.mjs";
import productList from "./productList.mjs";
import { getParams} from "./utils.mjs";


const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const product_list = new productList(category, dataSource, element);

product_list.init();