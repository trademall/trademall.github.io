import { getProduct } from "./getProduct.js";
import { RenderList } from "./renderList.js";

// const uid = localStorage.getItem("id") || "0";
const uid = 0;
getProduct("list", uid, RenderList);