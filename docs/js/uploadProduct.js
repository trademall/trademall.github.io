import { createProduct } from "./product_api.js";
import * as PTemplate from "./ptemplate_api.js";
import { InputBox, ImageBox } from "./InputBox.js";
import { uploadFile } from "./uploadFile.js";
function renderCategorySelect() {
  const container = $("#upload-product");
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CategorySelect, null), container[0], () => {
      $("#confirm").click(() => {
        const category = $("#category").text();
        const childcategory = $("#childcategory").text();
        if (category !== "Category" && childcategory !== "Child Category") {
          PTemplate.getPTemplate;
          ReactDOM.render( /*#__PURE__*/React.createElement(UploadProduct, null), container[0]);
        }
      });
    });
  }
  $('.dropdown').on('click', '.dropdown-menu li.able a', function () {
    var target = $(this).html();

    //Adds active class to selected item
    $(this).parents('.dropdown-menu').find('li').removeClass('active');
    $(this).parent('li').addClass('active');

    //Displays selected text on dropdown-toggle button
    $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
  });
}
function CategorySelect(props) {
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
    $('#category').on('click', '.dropdown-menu li.able a', function () {
      var target = $(this).html();
      const childcategories = ptemplates.list.filter(ptemplate => ptemplate.category === target).map(ptemplate => ({
        id: ptemplate.id,
        name: ptemplate.childcategory
      }));
      setChildCategory(childcategories);
    });
  };
  PTemplate.getPTemplateList(1, 10, getAndSetCategory);
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
function UploadProduct() {
  let [image, setImage] = React.useState(null);
  let [fileUploaded, setFileUploaded] = React.useState(false);
  React.useEffect(() => {
    if (fileUploaded) {
      setImage(null);
      setFileUploaded(false);
    }
  }, [fileUploaded]);
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
    onChange: e => setImage(e.target.value)
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
    name: "description",
    type: "text",
    label: "Description",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "quantity",
    type: "number",
    name: "quantity",
    label: "Quantity",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg col-xs-12",
    onClick: createProduct
  }, "Upload"))));
}
renderCategorySelect();
// renderUploadProduct();

export { renderCategorySelect };