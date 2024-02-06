const root = "http://47.89.209.202:8080/";

function getCTemplate(ctid, successCallback, errorCallback) {
    $.ajax({
        url: root + "v1/admin/ctemplate/" + ctid,
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
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
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            }
            else {
                errorCallback(data.message);
            }
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
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
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
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function getCTemplateList(pageNum, pageSize, successCallback, errorCallback) {
    $.ajax({
        url: root + "admin/ctemplate",
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
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}

export { getCTemplate, createCTemplate, updateCTemplate, deleteCTemplate, getCTemplateList };