function getProductList() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;


    xhr.open("GET", "http://54.79.139.73:80/productlist/0");
    xhr.setRequestHeader("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjQiLCJleHAiOjM3Njk3NjMzMDY2LCJpc3MiOiJ1c2VyMTI0In0._MpcX7Gpli64erbFoS15U2vlDk8DcvcUZ5zBZqUzLec");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var products = JSON.parse(this.responseText);
            if (products.code == 200) {
                renderProducts(products.data);
            }
        }
    });
}

// render products list using jquery
function renderProducts(products) {
    var items_count = 4;
    var products_count = products.total;
    var pages_count = Math.ceil(products_count / items_count);
    var items = products.list;
    var pages = [];
    for (var i = 0; i < pages_count; i++) {
        pages.push(i);
    }
    var products_list = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var product = '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">' +
            '<div class="commodity">' +
            '<div class="image">' +
            '<a href="details?id=' + item.id + '">' +
            '<img src="' + item.attributes.image + '" alt="' + item.name + '" class="img-responsive">' +
            '</a>' +
            '</div>' +
            '<div class="text">' +
            '<h4><a href="details?id=' + item.id + '">' + item.name + ' </a></h4>' +
            '<h4 class="price" id="price"><span class="price-symbol">$</span>' + item.attributes.price + '</h4>' +
            '</div>' +
            '</div>' +
            '</div>';
        products_list.push(product);
    }
    var products_html = products_list.join('');
    $('.commodities').html(products_html);
    var pages_html = pages.map(function (page) {
        return '<li><a href="#">' + page + '</a></li>';
    }).join('');
    $('.pagination').html(pages_html);
}

getProductList();
