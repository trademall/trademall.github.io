function InputBox(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.id
  }, props.label + (props.required ? "*" : "")), /*#__PURE__*/React.createElement("input", {
    type: props.type,
    className: "form-control",
    name: props.name,
    id: props.id,
    required: props.required
  })));
}
export { InputBox };