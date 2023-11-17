const server = "http://54.79.139.73:80"

function getProductInfo(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/product/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function getProductList(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/productlist/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function createProduct(data, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function updateProduct(data, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product",
        type: "PATCH",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

function deleteProduct(id, callback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/product/" + id,
        type: "DELETE",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                callback(data.data);
            }
            else {
                errorcallback(data.message);
            }
        },
        error: function (data) {
            errorcallback(data.message);
        }
    });
}

export { getProductInfo, getProductList, createProduct, updateProduct, deleteProduct };
