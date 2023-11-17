import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { getProductInfo, getProductList, updateProduct, createProduct, deleteProduct } from "./product_api.js";
function renderProductList(props) {
  const productList = $('#product-list');
  if (productList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-10"
    }, /*#__PURE__*/React.createElement(ProductList, {
      products: props.list
    }))), productList[0]);
    ReactDOM.render( /*#__PURE__*/React.createElement(PopupEdit, {
      product: props.list[0]
    }), $('#popup-edit-product')[0]);
  }
}
function ProductList(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null), /*#__PURE__*/React.createElement(ProductListTable, {
    products: props.products
  }));
}
function Heading() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 heading"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-uppercase"
  }, "Product List")));
}
function Pagination() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default",
    onClick: handlePreviousPage,
    disabled: true
  }, "<\xA0Prev"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default",
    onClick: handleNextPage,
    disabled: true
  }, "Next\xA0>")));
}
function ProductListTable(props) {
  const products = props.products;
  const handleDelete = e => {
    const id = e.target.dataset.id;
    deleteProduct(id);
  };
  const handleUpdate = e => {
    const id = e.target.dataset.id;
    const product = products.find(product => product.id == id);
    console.log(product);
    ReactDOM.render( /*#__PURE__*/React.createElement(PopupEdit, {
      product: product
    }), $('#popup-edit-product')[0]);
  };
  const rows = products.map(product => /*#__PURE__*/React.createElement("tr", {
    key: product.id
  }, /*#__PURE__*/React.createElement("td", null, product.id), /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, product.status == 2 ? 'Inactive' : product.status == 1 ? 'Public' : 'Private'), /*#__PURE__*/React.createElement("td", null, product.price), /*#__PURE__*/React.createElement("td", null, product.profit), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    "data-id": product.id,
    "data-toggle": "modal",
    "data-target": "#productEditModal",
    onClick: handleUpdate
  }, "Update"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    "data-id": product.id,
    onClick: handleDelete
  }, "Delete"))));
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 table-responsive"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10"
  }, /*#__PURE__*/React.createElement("div", {
    id: "popup-edit-product"
  })), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Profit"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows))));
}
function PopupEdit(props) {
  const product = props.product;
  function handleUpdate(e) {
    const data = {
      ID: e.target.dataset.id,
      Title: $('#name').val(),
      ProductID: $('#pid').val(),
      DetailInfo: $('#detail').val(),
      category: $('#category').val(),
      childcategory: $('#childcategory').val(),
      Attributes: getAttributes(),
      Status: $('#status').val(),
      Volume: $('#volume').val(),
      Weight: $('#weight').val(),
      Include: getInclude(),
      Exclude: getExclude(),
      Price: $('#price').val(),
      Profit: $('#profit').val()
    };
    updateProduct(data);
  }
  function getAttributes() {
    const attributes = {};
    $('#attributes input').each(function (index, element) {
      const key = element.dataset.key;
      const value = element.value;
      attributes[key] = value;
    });
  }
  function getInclude() {
    const include = [];
    $('#include input').each(function (index, element) {
      include.push(element.value);
    });
  }
  function getExclude() {
    const exclude = [];
    $('#exclude input').each(function (index, element) {
      exclude.push(element.value);
    });
  }
  const attributes = Object.keys(product.attributes).map(key => /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-10 col-offset-1",
    key: key
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: key
  }, key), Object.values(product.attributes[key]).map(value => /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: value,
    id: value,
    defaultValue: value,
    required: false
  })))));
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "productEditModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "productEditModalLabel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header bg-primary"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "text-danger"
  }, "\xD7")), /*#__PURE__*/React.createElement("h4", {
    className: "modal-title",
    id: "productEditModalLabel"
  }, "Edit Product")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(InputBox, {
    id: "name",
    label: "Name",
    type: "text",
    defaultValue: product.name,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "pid",
    label: "Product ID",
    type: "text",
    defaultValue: product.productid,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "detail",
    label: "Detail",
    type: "text",
    defaultValue: product.detailinfo,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "category",
    label: "Category",
    type: "text",
    defaultValue: product.category,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "childcategory",
    label: "Child Category",
    type: "text",
    defaultValue: product.childcategory,
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10 col-sm-offset-1",
    id: "attributes"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attributes"
  }, "Attributes"), attributes), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group row",
    id: "include"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "include",
    className: "col-xs-12"
  }, "Include"), product.include.map(item => /*#__PURE__*/React.createElement("div", {
    className: "col-xs-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: item,
    id: item,
    defaultValue: item,
    required: false
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "exclude-empty",
    id: "exclude-empty",
    required: false
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group row",
    id: "exclude"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "exclude",
    className: "col-xs-12"
  }, "Exclude"), product.exclude.map(item => /*#__PURE__*/React.createElement("div", {
    className: "col-xs-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: item,
    id: item,
    defaultValue: item,
    required: false
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "exclude-empty",
    id: "exclude-empty",
    required: false
  })))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-10 col-sm-offset-1",
    id: "statusWrapper"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "status"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "status",
    defaultValue: product.status
  }, /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Inactive"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Public"), /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Private"))), /*#__PURE__*/React.createElement(InputBox, {
    id: "volume",
    label: "Volume",
    type: "number",
    defaultValue: product.volume,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "weight",
    label: "Weight",
    type: "number",
    defaultValue: product.weight,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "price",
    label: "Price",
    type: "number",
    defaultValue: product.price,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "profit",
    label: "Profit",
    type: "number",
    defaultValue: product.profit,
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleUpdate,
    "data-id": product.id
  }, "Update"))))));
}
export { renderProductList, ProductList };