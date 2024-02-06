const server = "http://47.89.209.202:8080";

function uploadFile(formData, successCallback, errorCallback=console.log) {
  $.ajax({
    url: server + "/v1/upload",
    type: "POST",
    data: formData,
    headers: {
      "token": localStorage.getItem("token")
    },
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    success: function (data) {
      data = JSON.parse(data);
      if (data.code === 200) {
        successCallback(data);
      } else {
        errorCallback(data);
      }
    },
    error: function (data) {
      errorCallback(data);
    },
  });
}

function uploadFileWithProgress(formData, file, successCallback, errorCallback, progressCallback) {
  $.ajax({
    url: server + "/v1/upload",
    type: "POST",
    data: {
      "file": file,
    },
    headers: {
      "token": localStorage.getItem("token")
    },
    processData: false,
    contentType: false,
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          progressCallback(percentComplete);
        }
      }, false);
      return xhr;
    },
    success: function (data) {
      successCallback(data);
    },
    error: function (data) {
      errorCallback(data);
    },
  });
}

function uploadFileWithProgressAndCancel(formData, file, successCallback, errorCallback, progressCallback, cancelCallback) {
  var xhr = new window.XMLHttpRequest();
  xhr.open("POST", server + "/v1/upload");
  xhr.setRequestHeader("token", localStorage.getItem("token"));
  xhr.upload.addEventListener("progress", function (evt) {
    if (evt.lengthComputable) {
      var percentComplete = evt.loaded / evt.total;
      progressCallback(percentComplete);
    }
  }, false);
  xhr.onreadystatechange = function (oEvent) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successCallback(xhr.responseText);
      } else {
        errorCallback(xhr.responseText);
      }
    }
  };
  xhr.send(formData);
  cancelCallback(function () {
    xhr.abort();
  });
}

export { uploadFile, uploadFileWithProgress, uploadFileWithProgressAndCancel };