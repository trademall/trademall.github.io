function getProductInfo() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    var url = window.location.href;
    var id = url.split('?')[1].split('=')[1];
    console.log(id);

    var apiUrl = "https://54.79.139.73:80/product/" + id;

    xhr.open("GET", apiUrl);
    xhr.setRequestHeader("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjQiLCJleHAiOjM3Njk3NjMzMDY2LCJpc3MiOiJ1c2VyMTI0In0._MpcX7Gpli64erbFoS15U2vlDk8DcvcUZ5zBZqUzLec");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var products = JSON.parse(this.responseText);
            if (products.code == 200) {
                renderProduct(products.data);
            }
        }
    });
}

function renderProduct(product) {
    renderImage(product);
    renderInfo(product);
}

function renderImage(product) {
    var img = document.getElementById('product-image');
    img.src = product.attributes.image;
}

function renderInfo(product) {
    var id = document.getElementById('product-id');
    id.appendChild(document.createTextNode(product.id));
    var description = document.getElementById('product-info');
    description.innerHTML = product.detailinfo;
}

getProductInfo();
