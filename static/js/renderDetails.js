function RenderDetails(data) {
  const details = $('.content')[0];
  console.log(data);
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductDetails, {
    product: data
  }), details);
}
function ProductDetails(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row details"
  }, /*#__PURE__*/React.createElement(LeftColumn, {
    product: props
  }), /*#__PURE__*/React.createElement(RightColumn, {
    product: props
  }));
}
function LeftColumn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row col-sm-6 col-md-6"
  }, /*#__PURE__*/React.createElement(Pid, {
    product: props.id
  }), /*#__PURE__*/React.createElement(Pimage, {
    product: props.attributes.image,
    name: props.name,
    id: props.id,
    alt: "{props.name}"
  }), /*#__PURE__*/React.createElement(Pdescription, {
    product: props.detailinfo
  }));
}
function Pid(props) {
  return /*#__PURE__*/React.createElement("p", {
    className: "text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12",
    id: "product-id"
  }, "item #", props);
}
function Pimage(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement("img", {
    src: props,
    alt: "",
    className: "img img-responsive",
    id: "product-image"
  }));
}
function Pdescription(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "description col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement("h4", null, "PRODUCT DETAILS."), /*#__PURE__*/React.createElement("p", {
    id: "product-info"
  }, props));
}
function RightColumn(props) {
  return /*#__PURE__*/React.createElement("form", {
    className: "col-sm-6 col-md-6 row",
    method: "POST"
  }, /*#__PURE__*/React.createElement(Customizer, {
    product: props
  }), /*#__PURE__*/React.createElement(SubmitButton, null));
}
function Customizer(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "customizer",
    className: "card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement(CustomizerHeader, null), /*#__PURE__*/React.createElement(CustomizerBody, {
    product: props
  }), /*#__PURE__*/React.createElement(CustomizerFooter, null));
}
function CustomizerHeader() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-header heading"
  }, /*#__PURE__*/React.createElement("h4", null, "Product options."));
}
function CustomizerBody(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, props.product.attributes.map(option => /*#__PURE__*/React.createElement(CustomizerOption, {
    key: option.name,
    option: option
  })));
}
function CustomizerOption(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row selector color-select"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-2"
  }, /*#__PURE__*/React.createElement("h4", null, props.option.name, ": ")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group col-md-10",
    "data-toggle": "buttons"
  }, props.option.values.map(value => /*#__PURE__*/React.createElement(CustomizerValue, {
    key: value,
    value: value
  }))));
}
function CustomizerValue(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default col-md-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "color",
    id: "color1",
    autocomplete: "off"
  }), " ", props.value);
}
function CustomizerFooter() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("h4", null, "Total Price: "), /*#__PURE__*/React.createElement("p", {
    className: "total-price"
  }, "$0.00"))));
}
function SubmitButton() {
  return /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-template-main col-xs-10 col-xs-offset-1  col-sm-12"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-cart-plus"
  }), " add to cart!");
}
export { RenderDetails };