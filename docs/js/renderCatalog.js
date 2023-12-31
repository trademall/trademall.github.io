import { ImgDiv } from "./renderList.js";
import { getCatalog } from "./catalog.js";
import { getCTemplateList } from "./ctemplate.js";
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
  }, "\xD7 ", props.num)), /*#__PURE__*/React.createElement("h4", {
    className: "price",
    id: "price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price-symbol"
  }, "$"), props.price));
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
    className: "col-xs-12 col-sm-6 col-md-4 col-lg-4",
    id: props.cid
  }, /*#__PURE__*/React.createElement("div", {
    className: "commodity"
  }, /*#__PURE__*/React.createElement(ImgDiv, {
    image: props.image,
    name: props.name,
    id: props.pid,
    disableCache: false,
    loading: "lazy"
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
    price: product.attributes.price,
    pid: product.productid,
    attributes: product.attributes.attributes,
    num: product.attributes.num
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "commodities"
  }, catalogItems, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-template-main btn-circle btn-lg",
    id: "printBtn",
    onClick: handlePrint
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-print"
  })));
}
function handlePrint() {
  generatePDF();
}
function generatePDF() {
  $('#printBtn').html('<i class="fa fa-spinner fa-spin"></i>');
  $('#printBtn').attr('disabled', true);
  const uid = localStorage.getItem('id');
  getCatalog(uid, function (data) {
    const catalog = data.map(product => {
      const attributes = Object.keys(product.attributes.attributes).filter(key => key !== 'Shipping').map(key => {
        return product.attributes.attributes[key];
      }).join(', ');
      return [product.attributes.name, product.attributes.pid, attributes, product.attributes.attributes.Shipping[0], product.attributes.num, '$' + product.attributes.price];
    });
    try {
      const doc = new jsPDF();
      const header = function (data) {
        doc.setFontSize(24);
        doc.setTextColor(40);
        doc.setFontStyle('bold');
        doc.text("Catalog", data.settings.margin.left, 20);
      };

      // TODO: getCTemplateList

      const options = {
        beforePageContent: header,
        margin: {
          top: 30
        },
        columnStyles: {
          0: {
            fontStyle: 'bold'
          },
          5: {
            halign: 'right',
            textColor: [255, 0, 0],
            fontStyle: 'bold'
          }
        },
        headStyles: {
          Price: {
            halign: 'right'
          }
        },
        showHead: 'everyPage'
      };
      doc.autoTable(['Name', 'Product ID', 'Attributes', 'Shipping', 'Number', 'Price'], catalog, options);
      doc.save('catalog.pdf');
    } catch (error) {
      console.log(error);
      alert('Failed to generate catalog!');
    }
    // show success icon
    $('#printBtn').html('<i class="fa fa-check"></i>');
    setTimeout(function () {
      $('#printBtn').html('<i class="fa fa-print"></i>');
    }, 2000);
    $('#printBtn').attr('disabled', false);
  }, function () {
    $('#printBtn').html('<i class="fa fa-print"></i>');
    $('#printBtn').attr('disabled', false);
    alert('Failed to get catalog!');
  });
}
export { RenderCatalog };