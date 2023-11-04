function RenderDetails(data) {
  const details = $('.content')[0];
  // console.log(data);
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductDetails, {
    product: data
  }), details);
}
function ProductDetails(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row details"
  }, /*#__PURE__*/React.createElement(LeftColumn, {
    product: props.product
  }), /*#__PURE__*/React.createElement(RightColumn, {
    product: props.product
  }));
}
function LeftColumn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row col-sm-6 col-md-6"
  }, /*#__PURE__*/React.createElement(Pid, {
    pid: props.product.id
  }), /*#__PURE__*/React.createElement(Pimage, {
    product: props.product
  }), /*#__PURE__*/React.createElement(Pdescription, {
    description: props.product.detailinfo
  }));
}
function Pid(props) {
  return /*#__PURE__*/React.createElement("p", {
    className: "text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12",
    id: "product-id"
  }, "item #", props.pid);
}
function Pimage(props) {
  var imageURL = "";
  try {
    imageURL = props.product.image;
  } catch (error) {
    console.log(error);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageURL,
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
  }, props.description));
}
function RightColumn(props) {
  return /*#__PURE__*/React.createElement("form", {
    className: "col-sm-6 col-md-6 row",
    method: "POST"
  }, /*#__PURE__*/React.createElement(Customizer, {
    product: props.product
  }), /*#__PURE__*/React.createElement(SubmitButton, null), /*#__PURE__*/React.createElement(LoginAlert, null), /*#__PURE__*/React.createElement(SubmitAlert, null));
}
function Customizer(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "customizer",
    className: "card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement(CustomizerHeader, null), /*#__PURE__*/React.createElement(CustomizerBody, {
    product: props.product
  }), /*#__PURE__*/React.createElement(CustomizerFooter, {
    product: props.product
  }));
}
function CustomizerHeader() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-header heading"
  }, /*#__PURE__*/React.createElement("h4", null, "Product options."));
}
function CustomizerBody(props) {
  const attrs = Object.keys(props.product.attributes);
  return /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, attrs.map(attr => /*#__PURE__*/React.createElement(CustomizerOption, {
    key: attr,
    title: attr,
    option: props.product.attributes[attr]
  })));
}
function CustomizerOption(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row selector color-select"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-2"
  }, /*#__PURE__*/React.createElement("h4", null, props.title + ": ")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group col-md-10",
    "data-toggle": "buttons"
  }, Object.values(props.option).map(value => /*#__PURE__*/React.createElement(CustomizerValue, {
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
function CustomizerFooter(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("h4", null, "Total Price: "), /*#__PURE__*/React.createElement("p", {
    className: "total-price"
  }, "$" + props.product.price))));
}
function SubmitButton() {
  return /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-template-main col-xs-10 col-xs-offset-1  col-sm-12",
    onClick: addToCart
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-cart-plus"
  }), " add to cart!");
}
function LoginAlert() {
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-warning col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Please ", /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, "LOGIN"), " first!"));
}
function SubmitAlert() {
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-success col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Successfully added to cart!"));
}
function addToCart(event) {
  event.preventDefault();
  if (!(localStorage.getItem("login-status") == "true")) {
    $('.alert-warning').removeClass('hidden');
    return;
  } else {
    $('.alert-success').removeClass('hidden');
  }
}
export { RenderDetails };