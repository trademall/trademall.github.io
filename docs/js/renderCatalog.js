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
    disableCache: false
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "commodities"
  }, catalogItems), /*#__PURE__*/React.createElement("button", {
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
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  document.body.scrollIntoView();
  const uid = localStorage.getItem('id');
  getCatalog(uid, function (data) {
    const catalog = data.map(product => {
      const attributes = Object.keys(product.attributes.attributes).filter(key => key !== 'Shipping').map(key => {
        return product.attributes.attributes[key];
      }).join(', ');
      return [product.attributes.name, product.attributes.pid, attributes, product.attributes.attributes.Shipping[0], product.attributes.num, '$' + product.attributes.price];
    });

    // const images = document.querySelectorAll('div.commodity .img');
    // images.forEach((image) => {
    //     // var img = new Image();
    //     // img.crossOrigin = "Anonymous";
    //     // img.src = image.src + '?t=' + new Date().getTime();
    //     image.src = image.src + '?t=' + new Date().getTime();
    //     image.crossOrigin = "Anonymous";
    // });

    try {
      let ctemplateinfo = undefined;
      getCTemplateList(1, 10086, function (data) {
        const ctemplates = data.list;
        ctemplateinfo = ctemplates.filter(ctemplate => ctemplate.user_id == uid);
      });

      // html2canvas
      const catalogDiv = document.querySelector('#commodities').cloneNode(true);
      const item_height = document.querySelector('.commodity').offsetHeight;
      console.log(item_height);
      catalogDiv.style.position = 'absolute';
      catalogDiv.style.top = '0';
      catalogDiv.style.left = '0';
      catalogDiv.style.zIndex = '-1';
      catalogDiv.style.opacity = '0';
      document.body.appendChild(catalogDiv);
      html2canvas(catalogDiv, {
        allowTaint: false,
        useCORS: true,
        scale: 4
      }).then(function (canvas) {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pageHeight = contentWidth / 592.28 * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        const imgWidth = 595.28;
        const imgHeight = 592.28 / contentWidth * contentHeight;
        const pageData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF('', 'pt', 'a4');
        if (ctemplateinfo != undefined && ctemplateinfo.length > 0) {
          const merchant = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", null, "Merchant"), /*#__PURE__*/React.createElement("p", null, "Merchant:\xA0", ctemplateinfo[0].mname), /*#__PURE__*/React.createElement("p", null, "Address:\xA0", ctemplateinfo[0].maddress), /*#__PURE__*/React.createElement("p", null, "Title:\xA0", ctemplateinfo[0].mtitle), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h4", null, "Customer"), /*#__PURE__*/React.createElement("p", null, "Customer:\xA0", ctemplateinfo[0].cname), /*#__PURE__*/React.createElement("p", null, "Address:\xA0", ctemplateinfo[0].caddress), /*#__PURE__*/React.createElement("p", null, "Title:\xA0", ctemplateinfo[0].ctitle));
          pdf.html(merchant, {
            margin: [80, 40, 40, 80]
          });
          pdf.addPage();
        }
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight);
        } else {
          const pcontentHeight = Math.floor(pageHeight / item_height) * item_height;
          const pimgHeight = pcontentHeight / contentHeight * imgHeight;
          const scale = 592.28 / contentWidth;
          let first_page = true;
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'PNG', 0, first_page ? 0 : position - 100 * scale, imgWidth, imgHeight);
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, pimgHeight + 30 * scale + (first_page ? 100 * scale : 0), 595.28, 841.9, 'F');
            leftHeight -= pcontentHeight;
            position -= pimgHeight + 35 * scale;
            if (leftHeight > 0) {
              pdf.addPage();
            }
            first_page = false;
          }
        }
        pdf.save('catalog.pdf');
        document.body.removeChild(catalogDiv);
      });

      // const doc = new jsPDF();
      // const header = function (data) {
      //     doc.setFontSize(24);
      //     doc.setTextColor(40);
      //     doc.setFontStyle('bold');
      //     doc.text("Catalog", data.settings.margin.left, 20);
      // };

      // const options = {
      //     beforePageContent: header,
      //     margin: {
      //         top: 30
      //     },
      //     columnStyles: {
      //         0: { fontStyle: 'bold' },
      //         5: { halign: 'right', textColor: [255, 0, 0], fontStyle: 'bold' }
      //     },
      //     headStyles: {
      //         Price: { halign: 'right' }
      //     },
      //     showHead: 'everyPage',
      // };
      // doc.autoTable(['Name', 'Product ID', 'Attributes', 'Shipping', 'Number', 'Price'], catalog, options);

      // doc.addImage(images[0], 'JPEG', 15, 40, 180, 180);

      // doc.save('catalog.pdf');
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
    document.documentElement.scrollTop = scroll;
  }, function () {
    $('#printBtn').html('<i class="fa fa-print"></i>');
    $('#printBtn').attr('disabled', false);
    alert('Failed to get catalog!');
  });
}
export { RenderCatalog };