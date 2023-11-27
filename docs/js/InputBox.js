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
  const size = props.size || 200;
  const text = props.text || 'select image';
  const src = props.src || 'http://iph.href.lu/' + size + 'x' + size + '?text=' + text;
  const alt = props.alt || 'upload file';
  const FileBox = /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default btn-file"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: "img-thumbnail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: props.id,
    style: {
      display: 'none'
    },
    onChange: ev => {
      let file = ev.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        ev.target.previousSibling.src = e.target.result;
        ev.target.classList.add('uploaded');
      };
      reader.readAsDataURL(file);
      ev.target.nextSibling.nodeValue = file.name;
      console.log(ev.target.nextSibling.nodeValue);
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-center"
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: " col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image-upload"
  }, "Product Image*"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-upload thumbnail",
    id: "image-upload"
  }, FileBox, FileBox, FileBox, FileBox), /*#__PURE__*/React.createElement("div", {
    className: "caption text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    id: "upload",
    onClick: () => {
      let files = document.querySelectorAll('#image-upload input[type="file"].uploaded');
      let fileNames = document.querySelectorAll('#file-upload p');
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        if (files[i].files.length > 0) {
          formData.append('file', files[i].files[0], '<file>');
          console.log(fileNames[i]);
        }
      }
      uploadFile(formData, data => {
        console.log(data);
      });
    }
  }, "Upload"), /*#__PURE__*/React.createElement("p", {
    className: "text-center"
  }, "The first picture is the main picture of the product"))));
}
export { InputBox, ImageBox };