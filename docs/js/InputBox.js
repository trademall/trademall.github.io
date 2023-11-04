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
export { InputBox };