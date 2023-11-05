import { RenderCatalog } from "./renderCatalog.js";

function getCatalog() {
    const uid = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    $.ajax({
        url: 'http://54.79.139.73:80/v1/catalog/' + uid,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        success: function (res) {
            // console.log(res.data.list);
            RenderCatalog(res.data.list);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

getCatalog();