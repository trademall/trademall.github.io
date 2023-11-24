function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  return /*#__PURE__*/React.createElement("div", {
    className: " col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image-upload"
  }, "Product Image*"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-upload thumbnail"
  }, /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default btn-file"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: "img-thumbnail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    }
  })), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default btn-file"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: "img-thumbnail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    }
  })), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default btn-file"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    className: "img-thumbnail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "caption"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-center"
  }, "The first picture is the main picture of the product"))));
}
export { InputBox, ImageBox };