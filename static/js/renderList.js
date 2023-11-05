function RenderList(data) {
  const list = $('.content')[0];
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductList, {
    products: data
  }), list);
}
function ImgDiv(props) {
  var imageURL = "";
  try {
    imageURL = props.image;
  } catch (error) {
    console.log(error);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("a", {
    href: "details?id=" + props.id
  }, /*#__PURE__*/React.createElement("img", {
    src: imageURL,
    alt: props.name,
    className: "img-responsive",
    loading: "lazy"
  })));
}
function TextDiv(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("a", {
    href: "details?id=" + props.id
  }, props.name)), /*#__PURE__*/React.createElement("h4", {
    className: "price",
    id: "price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price-symbol"
  }, "$"), props.price));
}
function ProductDiv(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-sm-4 col-md-3 col-lg-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "commodity"
  }, /*#__PURE__*/React.createElement(ImgDiv, {
    image: props.image,
    name: props.name,
    id: props.id
  }), /*#__PURE__*/React.createElement(TextDiv, {
    name: props.name,
    price: props.price,
    id: props.id
  })));
}
function ProductList(props) {
  const products = props.products.list;
  const listItems = products.map(product => /*#__PURE__*/React.createElement(ProductDiv, {
    key: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    id: product.id
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "commodities"
  }, listItems);
}
export { RenderList, ImgDiv, TextDiv, ProductDiv, ProductList };