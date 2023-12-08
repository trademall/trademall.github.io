import { getProduct } from "./getProduct.js";
import { RenderList } from "./renderList.js";
const uid = Number(localStorage.getItem("id") || "0");
// const uid = 0;

function filtProducts() {
    if (window.location.search === "") {
        getProduct("list", uid, (products) => RenderList(products.list));
    }
    else {
        const type = window.location.search.split("?")[1].split("=")[0];
        const value = window.location.search.split("?")[1].split("=")[1];
        getProduct("list", uid, (products) => RenderList(products.list.filter((product) => product[type].toLowerCase() === value.toLowerCase())));
    }
}

filtProducts();
