import { ImgDiv } from "./renderList.js";
function RenderCatalog(data) {
  const catalog = $('.content')[0];
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductCatalog, {
    catalog: data
  }), catalog);
}
function TextDiv(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "textDiv"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("a", {
    href: "/products/details/?id=" + props.id
  }, props.name)), /*#__PURE__*/React.createElement("p", null, Object.values(props.attributes).join(', ')), /*#__PURE__*/React.createElement("h4", {
    className: "price",
    id: "price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price-symbol"
  }, "$"), props.price));
}
function FootBtns(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "footBtn text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-template-main"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/products/details/?id=" + props.id + "&edit=true"
  }, "Edit")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/products/details/?id=" + props.id
  }, "Details")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger"
  }, "Delete"));
}
function ProductDiv(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-6 col-md-4 col-lg-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "commodity"
  }, /*#__PURE__*/React.createElement(ImgDiv, {
    image: props.image,
    name: props.name,
    id: props.pid
  }), /*#__PURE__*/React.createElement(TextDiv, {
    name: props.name,
    price: props.price,
    id: props.pid,
    attributes: props.attributes
  }), /*#__PURE__*/React.createElement(FootBtns, {
    id: props.pid
  })));
}
function ProductCatalog(props) {
  const catalog = props.catalog;
  const catalogItems = catalog.map(product => /*#__PURE__*/React.createElement(ProductDiv, {
    key: product.id,
    image: product.image,
    name: product.attributes.name,
    price: product.price,
    pid: product.attributes.pid,
    attributes: product.attributes.attributes
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "commodities"
  }, catalogItems);
}
export { RenderCatalog };