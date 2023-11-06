function getProduct(type, id, callback, errorcallback=console.log) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if (type == "list") {
        xhr.open("GET", "http://54.79.139.73:80/productlist/" + id);
    }
    else if (type == "info") {
        xhr.open("GET", "http://54.79.139.73:80/product/" + id);
    }
    else {
        return null;
    }

    var token = localStorage.getItem("token");
    if (token != null) {
        xhr.setRequestHeader("token", token);
    }
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            // console.log(this.responseText);
            var products = JSON.parse(this.responseText);
            if (products.code == 200) {
                callback(products.data);
                return products.data;
            }
            else {
                errorcallback(products.message);
                return null;
            }
        }
    });
}

export { getProduct };