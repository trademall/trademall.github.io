const server = "http://47.89.209.202:80";

function getModel(successcallback = console.log, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/admin/pmodel",
        type: "GET",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.code == 200) {
                successcallback(data.data);
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

function createModel(data, successcallback = console.log, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/admin/pmodel",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                successcallback(data);
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

function getStageList(type, successcallback = console.log, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/admin/stage/" + type,
        type: "GET",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token")
        },
        success: function (data) {
            if (data.code == 200) {
                successcallback(data.data);
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

function createStage(data, successcallback = console.log, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/admin/stage",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                successcallback(data);
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

function deleteStage(id, successcallback = console.log, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/admin/stage/" + id,
        type: "DELETE",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 200) {
                successcallback(data);
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

export { getModel, createModel, getStageList, createStage, deleteStage };