import { getProduct } from "./getProduct.js";
import { RenderDetails } from "./renderDetails.js";

var url = window.location.href;
var id = url.split('?')[1].split('=')[1];
// console.log(id);

getProduct("info", id, RenderDetails);
