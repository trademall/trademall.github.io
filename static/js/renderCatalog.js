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
  }, props.name)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, Object.values(props.attributes).join(', ')), /*#__PURE__*/React.createElement("span", {
    className: "number pull-right text-large text-primary",
    id: "number"
  }, "\xD7 ", props.num)));
}
function FootBtns(props) {
  function confirmDelete() {
    $('#' + props.cid + ' .deleteBtn').removeClass('hidden');
    $('#' + props.cid + ' .operateBtn').addClass('hidden');
  }
  function cancelDelete() {
    $('#' + props.cid + ' .deleteBtn').addClass('hidden');
    $('#' + props.cid + ' .operateBtn').removeClass('hidden');
  }
  function deleteCatalog() {
    const url = 'http://47.89.209.202:80/v1/catalog/' + props.cid;
    $.ajax({
      url: url,
      type: 'DELETE',
      headers: {
        'token': localStorage.getItem('token')
      },
      success: function (res) {
        $('#' + props.cid + ' .deletePrompt').removeClass('hidden');
        $('#' + props.cid + ' .deleteBtn').addClass('hidden');
        if (res.code == 200) {
          alert('Delete Success!');
          window.location.reload();
        } else {
          // alert('Delete Failed!');
          cancelDelete();
        }
      },
      error: function (result) {
        // alert('Delete Failed!');
        cancelDelete();
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "footDiv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footBtn text-center operateBtn"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-template-main"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/products/details/?id=" + props.id + "&edit=true&cid=" + props.cid
  }, "Edit")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/products/details/?id=" + props.id
  }, "Details")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: confirmDelete
  }, "Delete")), /*#__PURE__*/React.createElement("div", {
    className: "footBtn text-center deleteBtn hidden"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: deleteCatalog
  }, "Confirm"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default",
    onClick: cancelDelete
  }, "Cancel")), /*#__PURE__*/React.createElement("div", {
    className: "text-center deletePrompt hidden"
  }, /*#__PURE__*/React.createElement("h5", null, "This product has been deleted.")));
}
function ProductDiv(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-xs-10 col-xs-offset-1 col-sm-6 col-md-4 col-lg-4",
    id: props.cid
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
    attributes: props.attributes,
    num: props.num
  }), /*#__PURE__*/React.createElement(FootBtns, {
    cid: props.cid,
    id: props.pid
  })));
}
function ProductCatalog(props) {
  const catalog = props.catalog;
  const catalogItems = catalog.map(product => /*#__PURE__*/React.createElement(ProductDiv, {
    key: product.id,
    cid: product.id,
    image: product.attributes.image,
    name: product.attributes.name,
    price: product.price,
    pid: product.attributes.pid,
    attributes: product.attributes.attributes,
    num: product.attributes.num
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "commodities"
  }, catalogItems);
}
export { RenderCatalog };