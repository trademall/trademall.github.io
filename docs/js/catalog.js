import { RenderCatalog } from "./renderCatalog.js";

function getCatalog() {
    $.ajax({
        url: 'http://54.79.139.73:80/v1/catalog/' + uid,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        success: function (res) {
            // console.log(res.data.list);
            if (res.data.list.length == 0) {
                $('#content').html('<h3 class="text-center">Catalog is empty</h3>');
                return;
            }
            RenderCatalog(res.data.list);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

const uid = localStorage.getItem('id');
const token = localStorage.getItem('token');

if (!token) {
    $('#content').html('<h3 class="text-center">Please <a href="/login">login</a> to view your catalog</h3>');
}
else {
    getCatalog();
}