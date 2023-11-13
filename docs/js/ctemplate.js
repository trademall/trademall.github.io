const root = "http://54.79.139.73:80/";

function getCTemplate(ctid, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate/" + ctid,
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

function createCTemplate(data, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate",
        type: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

function updateCTemplate(data, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate/",
        type: "PATCH",
        data: data,
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

function deleteCTemplate(ctid, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate/" + ctid,
        type: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

function getCTemplateList(pageNum, pageSize, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate",
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        data: {
            "pageNum": pageNum,
            "pageSize": pageSize
        },
        success: function (data) {
            successCallback(data);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

export { getCTemplate, createCTemplate, updateCTemplate, deleteCTemplate, getCTemplateList };