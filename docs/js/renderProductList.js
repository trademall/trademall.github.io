import { Sidebar } from "./sidebar.js";
import { InputBox } from "./InputBox.js";
// import { Attributes } from "./uploadProduct.js";
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
function emptyProduct() {
  return {
    id: '',
    name: '',
    image: '[]',
    productid: '',
    detailinfo: '',
    category: '',
    childcategory: '',
    attributes: {},
    include: [],
    exclude: [],
    status: '',
    volume: '',
    weight: '',
    price: '',
    profit: ''
  };
}
function ProductListTable(props) {
  const products = props.products;
  const [productEdit, setProductEdit] = React.useState(emptyProduct);
  const handleDelete = e => {
    const id = e.target.dataset.id;
    deleteProduct(id, data => {
      alert('Delete success');
      location.reload();
    }, err => {
      alert('Delete failed: ' + err);
    });
  };
  const handleUpdate = e => {
    const id = e.target.dataset.id;
    const product = products.find(product => product.id == id);
    if (!product) {
      alert('Product not found');
      return;
    }
    setProductEdit(product);
    $('#productEditModal').modal('show');
  };
  const rows = products.map(product => /*#__PURE__*/React.createElement("tr", {
    key: product.id
  }, /*#__PURE__*/React.createElement("td", null, product.id), /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, product.status == 2 ? 'Inactive' : product.status == 1 ? 'Public' : 'Private'), /*#__PURE__*/React.createElement("td", null, product.price), /*#__PURE__*/React.createElement("td", null, product.profit), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    "data-id": product.id,
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
  }, /*#__PURE__*/React.createElement(PopupEdit, {
    product: productEdit
  }))), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Profit"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows))));
}
function PopupEdit(props) {
  const product = props.product;
  const images = JSON.parse(product.image);
  function handleUpdate(e) {
    const data = {
      ID: Number(e.target.dataset.id),
      name: $('#name').val(),
      productid: Number($('#pid').val()),
      detailinfo: $('#detail').val(),
      category: $('#category').val(),
      childcategory: $('#childcategory').val(),
      attributes: getAttributes(),
      Status: Number($('#status').val()),
      Volume: Number($('#volume').val()),
      Weight: Number($('#weight').val()),
      include: getInclude(),
      exclude: getExclude(),
      Price: Number($('#price').val()),
      Profit: Number($('#profit').val())
    };
    console.log(data);
    updateProduct(data, data => {
      alert('Update success');
      location.reload();
    }, err => {
      alert('Update failed: ' + err);
    });
  }
  function getAttributes() {
    let attributes = {};
    $('#attributesWrapper input').each(function (index, element) {
      const key = element.id;
      const value = element.value.split(',').map(item => item.trim());
      attributes[key] = value;
    });
    return attributes;
  }
  function getInclude() {
    let include = $('input#include').value ? $('input#include').value.split(',').map(item => Number(item.trim())) : [];
    return include;
  }
  function getExclude() {
    let exclude = $('input#exclude').value ? $('input#exclude').value.split(',').map(item => Number(item.trim())) : [];
    return exclude;
  }
  const attributes = Object.keys(product.attributes).map(key => /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-12",
    key: key
  }, /*#__PURE__*/React.createElement(InputBox, {
    id: key,
    label: key,
    type: "text",
    defaultValue: product.attributes[key].join(),
    required: false
  }))));
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
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image"
  }, "Image"), /*#__PURE__*/React.createElement("div", {
    className: "row",
    id: "pimages"
  }, images.map(image => /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-sm-4 col-md-3",
    key: image
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    className: "img-responsive"
  }))))), /*#__PURE__*/React.createElement(InputBox, {
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
    required: true,
    disabled: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "childcategory",
    label: "Child Category",
    type: "text",
    defaultValue: product.childcategory,
    required: true,
    disabled: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-10 col-md-offset-1",
    id: "attributesWrapper"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attributes"
  }, "Attributes"), attributes), /*#__PURE__*/React.createElement(InputBox, {
    id: "include",
    label: "Include",
    type: "text",
    defaultValue: product.include.join(),
    required: false
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "exclude",
    label: "Exclude",
    type: "text",
    defaultValue: product.exclude.join(),
    required: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-10 col-md-offset-1",
    id: "statusWrapper"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "status"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "status"
  }, /*#__PURE__*/React.createElement("option", {
    value: 2,
    selected: product.status == 2 ? 'selected' : ''
  }, "Inactive"), /*#__PURE__*/React.createElement("option", {
    value: 1,
    selected: product.status == 1 ? 'selected' : ''
  }, "Public"), /*#__PURE__*/React.createElement("option", {
    value: 0,
    selected: product.status == 0 ? 'selected' : ''
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
    required: true,
    disabled: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleUpdate,
    "data-id": product.id
  }, "Update")))));
}
export { renderProductList, ProductListTable };