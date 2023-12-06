const server = 'http://47.89.209.202:80'

function getPTemplate(ptid, successCallback = console.log, errorCallback=console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate/' + ptid,
        type: 'GET',
        headers: {
            'token': localStorage.getItem('token')
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function createPTemplate(data, successCallback = console.log, errorCallback=console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate',
        type: 'POST',
        dataType: 'json',
        data: data,
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function updatePTemplate(data, successCallback = console.log, errorCallback=console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate/',
        type: 'PATCH',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function setPTemplateStatus(ptid, status, successCallback = console.log, errorCallback = console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate/',
        type: 'PATCH',
        dataType: 'json',
        data: JSON.stringify({
            id: Number(ptid),
            status: Number(status)
        }),
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function deletePTemplate(ptid, successCallback = console.log, errorCallback=console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate/' + ptid,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

function getPTemplateList(pageNum, pageSize, successCallback = console.log, errorCallback=console.log) {
    $.ajax({
        url: server + '/v1/admin/ptemplate',
        type: 'GET',
        dataType: 'json',
        data: {
            pageNum: pageNum,
            pageSize: pageSize
        },
        headers: {
            'token': localStorage.getItem('token')
        },
        success: function (data) {
            if (data.code == 200) {
                successCallback(data.data);
            } else {
                errorCallback(data.message);
            }
            return data;
        },
        error: function (data) {
            errorCallback(data.message);
        }
    });
}

export {
    getPTemplate,
    createPTemplate,
    updatePTemplate,
    setPTemplateStatus,
    deletePTemplate,
    getPTemplateList
}
