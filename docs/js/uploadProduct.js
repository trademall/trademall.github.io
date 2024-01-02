import { createProduct } from "./product_api.js";
import { getProduct } from "./getProduct.js";
import * as PTemplate from "./ptemplate_api.js";
import * as PStage from "./pstage_api.js";
import { InputBox, ImageBox } from "./InputBox.js";

// renderCategorySelect();
renderStageSet(1, 1);
function renderCategorySelect() {
  const container = $("#upload-product");
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CategorySelectContainer, null), container[0]);
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
    // deduplicate
    const categories = ptemplates.list.map(ptemplate => ptemplate.category).filter((category, index, self) => self.indexOf(category) === index).map(category => ({
      id: category,
      name: category
    }));
    setCategory(categories);
    $('.dropdown').on('click', '.dropdown-menu li.able a', function () {
      let target = $(this).html();
      $(this).parents('.dropdown-menu').find('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
      if (target !== "category" && $(this).parents('.dropdown').find('.dropdown-toggle').attr('id') === "category") {
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
      if (category !== "category" && childcategory !== "childcategory") {
        const ptemplate = ptemplates.list.filter(ptemplate => ptemplate.category === category && ptemplate.childcategory === childcategory)[0];
        // console.log(ptemplate);
        if (ptemplate.isactive === 0) {
          alert("This template is inactive");
          return;
        }
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
    className: "col-xs-12 col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "template-title"
  }, "1. Please select your product's category and childcategory")), /*#__PURE__*/React.createElement("div", {
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

//--------------------------------------------------------------

function UploadProduct(props) {
  let [image, setImage] = React.useState('');
  const template = props.ptemplate;
  const newProduct = () => {
    $('upload.btn-upload').click();
    const product = {
      ProductID: $('#pid').val().trim(),
      name: $('#pname').val().trim(),
      image: $('#image').val(),
      Price: Number($('#price').val().trim()),
      DetailInfo: $('#description').val().trim(),
      category: template.category,
      childcategory: template.childcategory,
      Profit: Number($('#profit').val().trim()),
      Volume: Number($('#volume').val().trim()),
      Weight: Number($('#weight').val().trim()),
      attributes: getAttributes(),
      // priceModel: $('#price-model').val().trim(),
      // quantity: $('#quantity').val().trim(),
      Include: $('#include').val().trim().split(",").filter(item => item !== "").map(item => Number(item)),
      Exclude: $('#exclude').val().trim().split(",").filter(item => item !== "").map(item => Number(item)),
      Status: Number($('#status').val().trim()),
      CreatorID: Number(localStorage.getItem('id'))
    };
    console.log(product);
    if (!product.image) {
      alert("Please upload image or wait for image to be uploaded");
      return;
    }
    // set button to loading
    $('#upload.btn-upload').prop('disabled', true);
    $('#upload.btn-upload').html('Creating...');
    createProduct(product, data => {
      alert(data.message);
      $('#upload.btn-upload').prop('disabled', false);
      $('#upload.btn-upload').html('Create');
      // window.location.href = "/products/";
      getProduct("list", localStorage.getItem('id'), data => {
        const pid = data.list.find(item => item.productid === product.ProductID && item.creatorid === product.CreatorID && item.name === product.name && item.category === product.category && item.childcategory === product.childcategory && item.detailinfo === product.DetailInfo).id || data.list[data.total - 1].id;
        renderStageSet(pid, product.Price);
      }, err => {
        alert(err);
      });
    }, err => {
      alert(err);
      $('#upload.btn-upload').prop('disabled', false);
      $('#upload.btn-upload').html('Create');
    });
  };
  const getAttributes = () => {
    let attributes = {};
    $('.attributes input').each(function () {
      let attr = $(this).val().trim();
      let attrName = $(this).attr('name');
      let attrType = $(this).data('type');
      if (attr !== "") {
        attributes[attrName] = attrType === "custom" ? attr : attr.split(',').map(item => item.trim());
      }
    });
    $('.custom-attributes').each(function () {
      let attrName = $(this).find('.attr-name input').val().trim();
      let attrValue = $(this).find('.attr-value input').val().trim().split(',').map(item => item.trim());
      if (attrName !== "" && attrValue !== "") {
        attributes[attrName] = attrValue;
      }
    });
    attributes['Price'] = Number($('#price').val().trim());
    return attributes;
  };
  const [customAttributes, setCustomAttributes] = React.useState([]);
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Upload Product")), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "template-title"
  }, props.ptemplate.category, " > ", props.ptemplate.childcategory, " : ", props.ptemplate.templatename)), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 col-sm-10 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement(ImageBox, {
    size: 100,
    text: "upload image",
    src: image,
    id: "uploadImg",
    min: 3,
    max: 6
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "pid",
    type: "text",
    name: "pid",
    label: "Product ID",
    required: false,
    defaultValue: template.id,
    disabled: false
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
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "description"
  }, "Description*"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-control",
    name: "description",
    id: "description",
    rows: "5",
    required: true
  }))), /*#__PURE__*/React.createElement(InputBox, {
    id: "profit",
    label: "Profit",
    type: "number",
    required: true,
    value: template.profit,
    disabled: true
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
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-10 col-md-offset-1",
    id: "attributesWrapper"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attributes"
  }, "Attributes"), /*#__PURE__*/React.createElement(Attributes, {
    attributes: template.attributes
  }), customAttributes.map(attribute => attribute), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => setCustomAttributes([...customAttributes, /*#__PURE__*/React.createElement(EmptyAttributes, {
      key: customAttributes.length
    })])
  }, "Add new", /*#__PURE__*/React.createElement("span", {
    className: "hidden-xs"
  }, " Attribute")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => setCustomAttributes(customAttributes.slice(0, -1))
  }, "Remove", /*#__PURE__*/React.createElement("span", {
    className: "hidden-xs"
  }, " Attribute")))), /*#__PURE__*/React.createElement(InputBox, {
    id: "price-model",
    label: "Price Model",
    type: "text",
    required: true,
    value: template.attributes.price,
    disabled: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "include",
    type: "text",
    name: "include",
    label: "Include",
    required: false,
    defaultValue: template.include.join(),
    disabled: false
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "exclude",
    type: "text",
    name: "exclude",
    label: "Exclude",
    required: false,
    defaultValue: template.exclude.join(),
    disabled: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-10 col-md-offset-1",
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
    onClick: newProduct
  }, "Create"))));
}
function Attributes(props) {
  const {
    attributes
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "attributes"
  }, attributes.attrs.map(attribute => /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    key: attribute.name
  }, /*#__PURE__*/React.createElement(InputBox, {
    type: "text",
    name: attribute.name,
    label: attribute.name,
    required: attribute.required,
    "data-type": attribute.type,
    placeholder: attribute.type === "custom" ? "Input custom attribute" : "Input attributes, separated by comma",
    defaultValue: attribute.example
  }))));
}
function EmptyAttributes() {
  return /*#__PURE__*/React.createElement("div", {
    className: "custom-attributes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4 row attr-name"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "attr-name",
    placeholder: "Attr Name"
  })), /*#__PURE__*/React.createElement("div", {
    className: "attr-value"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    name: "attr-value",
    placeholder: "Attr Value"
  })))));
}

//--------------------------------------------------------------
function renderStageSet(pid, price) {
  const container = $("#upload-product");
  console.log(pid, price);
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(StageSet, {
      price: price,
      pid: pid
    }), container[0]);
  }
}
function StageSet(props) {
  const [stage, setStage] = React.useState([{
    id: 1,
    start: 1,
    end: 99999,
    price: props.price
  }]);
  const handleStageSubmit = () => {
    const stageNum = stage.length;
    let createdNum = 0;
    stage.forEach(item => {
      const stage = {
        pid: Number(props.pid),
        start: Number(item.start),
        to: Number(item.end),
        price: Number(item.price),
        username: localStorage.getItem('username')
      };
      PStage.createPStage(stage, data => {
        createdNum++;
        if (createdNum === stageNum) {
          alert(data.message);
          window.location.href = "/products/";
        }
      }, err => {
        alert(err);
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Stage Set")), /*#__PURE__*/React.createElement("div", {
    className: "vertical-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-10 col-sm-9 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info"
  }, /*#__PURE__*/React.createElement("p", null, "The start of next stage should be the ", /*#__PURE__*/React.createElement("strong", null, "SAME"), " as the end of previous stage!")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "stage"
  }, "Stage"), stage.map((item, index) => /*#__PURE__*/React.createElement("div", {
    className: "row mb-small",
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(InputBox, {
    type: "number",
    name: "start",
    label: "Start",
    required: true,
    min: 1,
    max: 999999,
    defaultValue: item.start,
    onChange: e => {
      let newStage = [...stage];
      newStage[index].start = Number(e.target.value);
      setStage(newStage);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(InputBox, {
    type: "number",
    name: "end",
    label: "End",
    required: true,
    min: 1,
    max: 999999,
    defaultValue: item.end,
    onChange: e => {
      let newStage = [...stage];
      newStage[index].end = Number(e.target.value);
      setStage(newStage);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(InputBox, {
    type: "number",
    name: "price",
    label: "Price",
    required: true,
    defaultValue: item.price,
    onChange: e => {
      let newStage = [...stage];
      newStage[index].price = Number(e.target.value);
      setStage(newStage);
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-2 col-sm-1"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setStage([...stage, {
      id: stage.length + 1,
      start: stage[stage.length - 1].end,
      end: 99999,
      price: props.price
    }])
  }, "+"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: () => stage.length > 1 ? setStage(stage.slice(0, -1)) : null
  }, "-"))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6 col-xs-offset-2 col-sm-4 col-sm-offset-3 row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-lg col-xs-12",
    onClick: handleStageSubmit
  }, "Confirm!"))));
}
export { renderCategorySelect, Attributes };