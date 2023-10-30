function getProduct(type, id, callback, errorcallback=console.log) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if (type == "list") {
        xhr.open("GET", "http://54.79.139.73:80/productlist/" + id);
    }
    else if (type == "info") {
        xhr.open("GET", "http://54.79.139.73:80/product/" + id);
    }
    xhr.setRequestHeader("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjQiLCJleHAiOjM3Njk3NjMzMDY2LCJpc3MiOiJ1c2VyMTI0In0._MpcX7Gpli64erbFoS15U2vlDk8DcvcUZ5zBZqUzLec");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var products = JSON.parse(this.responseText);
            if (products.code == 200) {
                callback(products.data);
            }
            else {
                errorcallback(products.message);
            }
        }
    });
}

export { getProduct };