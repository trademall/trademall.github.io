import { getProduct } from './getProduct.js';
import { renderProductList } from './renderProductList.js';

// const uid = localStorage.getItem('id');
const uid = 0;
let productList;
getProduct("list", uid, receiveProducts, receiveError);

function receiveProducts(products) {
    productList = products;
    renderProductList(productList);
}

function receiveError(error) {
    console.log(error);
}