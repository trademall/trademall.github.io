function getUserList(pageNum, pageSize, successCallback=console.log, errorCallback=console.log) {
    $.ajax({
        url: "http://47.89.209.202:80/v1/root/user",
        type: "GET",
        dataType: "json",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: {
            "pageNum": pageNum,
            "pageSize": pageSize
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
            errorCallback(data.message);
        }
    });
}

export { getUserList };