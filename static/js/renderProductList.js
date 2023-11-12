import { Sidebar } from "./renderAdmin.js";
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
  }), /*#__PURE__*/React.createElement(Pagination, null));
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
    updateProduct(id);
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
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover table-responsive text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Profit"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows))));
}
function handlePreviousPage() {
  const page = parseInt($('#page').val());
  if (page > 1) {
    $('#page').val(page - 1);
    getProductList();
  }
}
function handleNextPage() {
  const page = parseInt($('#page').val());
  $('#page').val(page + 1);
  getProductList();
}
function getProductList() {
  const page = $('#page').val();
  $.ajax({
    url: '/api/products?page=' + page,
    method: 'GET',
    success: function (data) {
      renderProductList(data);
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
}
function deleteProduct(id) {
  $.ajax({
    url: '/api/products/' + id,
    method: 'DELETE',
    success: function (data) {
      getProductList();
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
}
function updateProduct(id) {
  $.ajax({
    url: '/api/products/' + id,
    method: 'PUT',
    success: function (data) {
      getProductList();
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
}
export { renderProductList, ProductList };