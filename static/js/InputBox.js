function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { uploadFile } from "./uploadFile.js";
function InputBox(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.id
  }, props.label + (props.required ? "*" : "")), /*#__PURE__*/React.createElement("input", _extends({
    type: props.type,
    className: "form-control",
    name: props.name,
    id: props.id,
    required: props.required
  }, props))));
}
function ImageBox(props) {
  const [FileBoxes, setFileBoxes] = React.useState([/*#__PURE__*/React.createElement(FileBox, {
    id: "file1"
  }), /*#__PURE__*/React.createElement(FileBox, {
    id: "file2"
  }), /*#__PURE__*/React.createElement(FileBox, {
    id: "file3"
  })]);
  const [imageUrls, setImageUrls] = React.useState('');
  let fileUploaded = false;
  const handleChange = () => {
    fileUploaded = false;
    $('#upload.btn-upload').prop('disabled', false);
    $('#upload.btn-upload').html('Upload');
    let files = document.querySelectorAll('#image-upload input[type="file"].uploaded');
    if (files.length >= 2 && files.length < props.max - 1) {
      let newFileBoxes = [...FileBoxes];
      newFileBoxes.push( /*#__PURE__*/React.createElement(FileBox, {
        id: "file" + (files.length + 1)
      }));
      setFileBoxes(newFileBoxes);
    }
    if (files.length > props.max - 1) {
      alert('You can only upload up to ' + props.max + ' images');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: " col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image-upload"
  }, "Product Image*"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-upload thumbnail",
    id: "image-upload",
    onChange: handleChange
  }, FileBoxes.map(FileBox => FileBox)), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "image",
    id: "image",
    value: imageUrls
  }), /*#__PURE__*/React.createElement("div", {
    className: "caption text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-upload",
    id: "upload",
    onClick: () => {
      $('#upload.btn-upload').prop('disabled', true);
      $('#upload.btn-upload').html('Uploading...');
      let files = document.querySelectorAll('#image-upload input[type="file"].uploaded');
      let fileNames = document.querySelectorAll('#image-upload p.img-name.has-file');
      let images = [];
      if (files.length < props.min) {
        alert('You must upload at least ' + props.min + ' images');
        $('#upload.btn-upload').prop('disabled', false);
        $('#upload.btn-upload').html('Upload');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData();
        formData.append('file', files[i].files[0], fileNames[i].innerHTML);
        uploadFile(formData, data => {
          images.push(data.data);
          setImageUrls(JSON.stringify(images));
          if (images.length === files.length) {
            fileUploaded = true;
          }
          if (fileUploaded) {
            alert('Upload success');
            $('#upload.btn-upload').prop('disabled', true);
            $('#upload.btn-upload').html('Uploaded');
          }
        }, err => {
          alert('Upload failed: ' + err);
          $('#upload.btn-upload').prop('disabled', false);
          $('#upload.btn-upload').html('Upload');
        });
      }
    }
  }, "Upload"), /*#__PURE__*/React.createElement("p", {
    className: "text-center"
  }, "The first picture is the main picture of the product"))));
}
function FileBox(props) {
  const size = props.size || 200;
  const text = props.text || 'select image';
  const [filename, setFilename] = React.useState('');
  const [src, setSrc] = React.useState('http://iph.href.lu/' + size + 'x' + size + '?text=' + text);
  const [alt, setAlt] = React.useState('upload file');
  const [hasFile, setHasFile] = React.useState("no-file");
  return /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default btn-file"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: "img-thumbnail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: props.id,
    style: {
      opacity: 0
    },
    onChange: ev => {
      let file = ev.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        setSrc(e.target.result);
        setAlt(file.name);
        ev.target.classList.add('uploaded');
        setHasFile("has-file");
      };
      reader.readAsDataURL(file);
      setFilename(file.name);
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-center img-name" + " " + hasFile,
    id: props.id
  }, filename));
}
export { InputBox, ImageBox };