import { RenderCatalog } from "./renderCatalog.js";

function getCatalog(uid, successCallback = console.log, errorCallback = console.log) {
    $.ajax({
        url: 'http://47.89.209.202:8080/v1/catalog/' + uid,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        success: function (res) {
            // console.log(res.data.list);
            if (!res.data.list) {
                $('.catalog').html('<h3 class="text-center">Catalog is empty. <a href="/products/">Browse our products!</a></h3>');
                return;
            }
            successCallback(res.data.list);
        },
        error: function (error) {
            errorCallback(error);
        }
    });
}

const uid = localStorage.getItem('id');
const token = localStorage.getItem('token');

if (!token) {
    $('.content').html('<h3 class="text-center" style="line-height:80px;">Please <a href="/login">login</a> to view your catalog</h3>');
}
else {
    getCatalog(uid, (products) => RenderCatalog(products));
}

export { getCatalog };