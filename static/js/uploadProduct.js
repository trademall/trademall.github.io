import { createProduct } from "./product_api.js";
import * as PTemplate from "./ptemplate_api.js";
import { InputBox, ImageBox } from "./InputBox.js";
import { uploadFile } from "./uploadFile.js";
function renderCategorySelect() {
  const container = $("#upload-product");
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CategorySelectContainer, null), container[0]);
  }
  function initFileInput(id) {
    $(id).fileinput({
      showUpload: true,
      showPreview: true,
      showRemove: true,
      multiple: true,
      async: false,
      minFileCount: 1,
      maxFileCount: 4,
      // uploadUrl: "http://54.79.139.73:80/v1/upload",
      uploadExtraData: {
        token: localStorage.getItem("token")
      },
      allowedFileExtensions: ['jpg', 'png', 'gif'],
      browseClass: "btn btn-primary btn-lg",
      browseLabel: "Select Image",
      browseIcon: '<i class="glyphicon glyphicon-picture"></i> ',
      removeClass: "btn btn-danger btn-lg",
      removeLabel: "Delete",
      removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
      uploadClass: "btn btn-info btn-lg",
      uploadLabel: "Upload",
      uploadIcon: '<i class="glyphicon glyphicon-upload"></i> '
    }).on('fileuploaded', function (event, data, previewId, index) {
      if (data.response) {
        const image = data.response;
        console.log(image);
      }
    });
  }
}
function CategorySelectContainer() {
  const [category, setCategory] = React.useState([{
    id: 0,
    name: 'Loading...'
  }]);
  const [childcategory, setChildCategory] = React.useState([{
    id: 0,
    name: 'Please select a category'
  }]);
  const getAndSetCategory = ptemplates => {
    const categories = ptemplates.list.map(ptemplate => ({
      id: ptemplate.id,
      name: ptemplate.category
    }));
    setCategory(categories);
    $('.dropdown').on('click', '.dropdown-menu li.able a', function () {
      let target = $(this).html();
      $(this).parents('.dropdown-menu').find('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
      if (target !== "category") {
        const childcategories = ptemplates.list.filter(ptemplate => ptemplate.category === target).map(ptemplate => ({
          id: ptemplate.id,
          name: ptemplate.childcategory
        }));
        setChildCategory(childcategories);
      }
    });
    $('#confirm').click(() => {
      const category = $('#category').text().trim();
      const childcategory = $('#childcategory').text().trim();
      console.log(category, childcategory);
      if (category !== "category" && childcategory !== "childcategory") {
        const ptemplate = ptemplates.list.filter(ptemplate => ptemplate.category === category && ptemplate.childcategory === childcategory)[0];
        console.log(ptemplate);
        ReactDOM.render( /*#__PURE__*/React.createElement(UploadProduct, {
          ptemplate: ptemplate
        }), $("#upload-product")[0]);
      } else {
        alert("Please select a category");
      }
    });
  };
  if (category[0].id === 0) {
    PTemplate.getPTemplateList(1, 100, getAndSetCategory);
  }
  return /*#__PURE__*/React.createElement(CategorySelect, {
    category: category,
    childcategory: childcategory
  });
}
function CategorySelect(props) {
  const {
    category,
    childcategory
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Select Category")), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-5 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement(SelectBtn, {
    name: "category",
    options: category
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-5"
  }, /*#__PURE__*/React.createElement(SelectBtn, {
    name: "childcategory",
    options: childcategory
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg col-xs-12",
    id: "confirm"
  }, "Confirm"))));
}
function SelectBtn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default btn-lg dropdown-toggle btn-select",
    type: "button",
    id: props.name,
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "true"
  }, props.name, /*#__PURE__*/React.createElement("span", {
    className: "caret"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-menu",
    "aria-labelledby": props.name
  }, props.options.map(option => /*#__PURE__*/React.createElement("li", {
    key: option.id,
    className: option.id === 0 ? 'disabled' : 'able'
  }, /*#__PURE__*/React.createElement("a", null, option.name)))));
}
function UploadProduct(props) {
  let [image, setImage] = React.useState('');
  let [fileUploaded, setFileUploaded] = React.useState(false);
  React.useEffect(() => {
    if (fileUploaded) {
      setImage(null);
      setFileUploaded(false);
    }
  }, [fileUploaded]);
  const createProduct = () => {};
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Upload Product")), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement(ImageBox, {
    size: 100,
    text: "upload image",
    src: image,
    id: "uploadImg",
    min: 3,
    max: 6
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "pname",
    type: "text",
    name: "pname",
    label: "Product Name",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "price",
    type: "number",
    name: "price",
    label: "Price",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "description",
    name: "description",
    type: "text",
    label: "Description",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "profit",
    label: "Profit",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "volume",
    label: "Volume",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "weight",
    label: "Weight",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "price",
    label: "Price",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "quantity",
    type: "number",
    name: "quantity",
    label: "Quantity",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "include",
    type: "text",
    name: "include",
    label: "Include",
    required: false
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "exclude",
    type: "text",
    name: "exclude",
    label: "Exclude",
    required: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-sm-10 col-sm-offset-1",
    id: "statusWrapper"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "status"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "status",
    defaultValue: 1
  }, /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Inactive"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Public"), /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Private")))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg col-xs-12",
    onClick: createProduct
  }, "Create"))));
}
renderCategorySelect();
// renderUploadProduct();

export { renderCategorySelect };