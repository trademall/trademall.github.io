const server = "http://47.89.209.202:8080";

function createPStage(pstage, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/stage",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(pstage),
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

function getPStageList(pid, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/stage/" + pid,
        type: "GET",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
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

function deletePStage(pid, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/stage/" + pid,
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

function createFobStage(pstage, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/fobstage",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(pstage),
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

function getFobStageList(pid, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/fobstage/" + pid,
        type: "GET",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
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

function deleteFobStage(pid, successcallback, errorcallback = console.log) {
    $.ajax({
        url: server + "/v1/operator/fobstage/" + pid,
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

export { createPStage, getPStageList, deletePStage, createFobStage, getFobStageList, deleteFobStage };