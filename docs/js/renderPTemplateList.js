import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { createPTemplate, deletePTemplate, updatePTemplate, setPTemplateStatus } from "./ptemplate_api.js";
function renderPTemplateList(props) {
  const templateList = $('#ptemplate-list');
  if (templateList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-10"
    }, /*#__PURE__*/React.createElement(PTemplateList, {
      templates: props.list
    }))), templateList[0]);
  }
}
function PTemplateList(props) {
  const [template, setTemplate] = React.useState({});
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null), /*#__PURE__*/React.createElement(PTemplateListTable, {
    templates: props.templates
  }), /*#__PURE__*/React.createElement(NewPTemplateModal, null), /*#__PURE__*/React.createElement(CreatePTmplateBtn, null));
}
function Heading() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 heading"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-uppercase"
  }, "Product Templates")));
}
function Pagination() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default",
    onClick: handlePreviousPage
  }, "<\xA0Prev"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-default",
    onClick: handleNextPage
  }, "Next\xA0>")));
}
function PTemplateListTable(props) {
  const templates = props.templates;
  const handleDelete = e => {
    const id = e.target.dataset.id;
    deletePTemplate(id, () => {
      window.location.reload();
    });
  };
  const handleActive = e => {
    const id = Number(e.target.dataset.id);
    const status = templates.find(template => {
      return template.id === id;
    }).isactive;
    console.log(id, status);
    setPTemplateStatus(id, 1 - status, () => {
      window.location.reload();
    });
  };
  const handleUpdate = e => {
    const id = Number(e.target.dataset.id);
    $('#editPTemplateModal').modal('show');
    $('#editPTemplateModal form').attr('data-id', id);
    const template = templates.find(template => {
      return template.id === id;
    });
    // console.log(template);
    $('#template-name').val(template.templatename);
    $('#category').val(template.category);
    $('#child-category').val(template.childcategory);
    $('#profit').val(template.profit);
    $('#include').val(template.include);
    $('#exclude').val(template.exclude);
    $('#description').val(template.description);
    $('#attributes').val(template.attributes);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Profit"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, templates.map(template => {
    return /*#__PURE__*/React.createElement("tr", {
      key: template.id
    }, /*#__PURE__*/React.createElement("td", null, template.templatename), /*#__PURE__*/React.createElement("td", null, template.category), /*#__PURE__*/React.createElement("td", null, template.profit), /*#__PURE__*/React.createElement("td", null, template.isactive ? 'Active' : 'Inactive'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-default",
      "data-id": template.id,
      onClick: handleUpdate
    }, "Update"), /*#__PURE__*/React.createElement("button", {
      className: template.isactive ? "btn btn-warning" : "btn btn-success",
      "data-id": template.id,
      onClick: handleActive
    }, template.isactive ? 'Deactivate' : 'Activate'), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger",
      "data-id": template.id,
      onClick: handleDelete
    }, "Delete")));
  })))));
}
function PopupEdit(props) {
  const handleSubmit = e => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const templateName = $('#template-name').val();
    const category = $('#category').val();
    const childCategory = $('#child-category').val();
    const profit = Number($('#profit').val());
    const status = 1;
    const include = $('#include').val() || [];
    const exclude = $('#exclude').val() || [];
    const description = $('#description').val() || '';
    const attributes = $('#attributes').val() || {};
    const data = {
      "id": id,
      "templatename": templateName,
      "category": category,
      "childcategory": childCategory,
      "Profit": profit,
      "isactive": status,
      "include": include,
      "exclude": exclude,
      "description": description,
      "attributes": attributes
    };
    console.log(data);
    updatePTemplate(data, () => {
      $('#info').html('<p class="text-success">Product Template Updated Successfully!</p>');
      setTimeout(() => {
        $('#info').html('');
        $('#editPTemplateModal').modal('hide');
        // window.location.reload();
      }, 1000);
    }, res => {
      $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
    });
  };
  const handleClick = e => {
    const sel = e.target.dataset.title;
    const tog = e.target.dataset.toggle;
    $('#' + tog).prop('value', sel);
    $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active btn-success').addClass('notActive btn-default');
    $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-success');
  };
  const [attributes, setAttributes] = React.useState([/*#__PURE__*/React.createElement(Attributes, {
    items: props.attributes
  })]);
  const handleNewAttribute = e => {
    e.preventDefault();
    const newAttribute = /*#__PURE__*/React.createElement(EmptyAttribute, null);
    setAttributes([...attributes, newAttribute]);
  };
  const handleDeleteAttribute = e => {
    e.preventDefault();
    if (attributes.length === 1) {
      return;
    }
    const newAttributes = attributes.slice(0, attributes.length - 1);
    setAttributes(newAttributes);
  };
  const handleCancel = e => {
    // hide modal
    $('#editPTemplateModal').modal('hide');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "editPTemplateModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "editPTemplateModalLabel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("form", {
    "data-id": props.id,
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close",
    onClick: handleCancel
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")), /*#__PURE__*/React.createElement("h4", {
    className: "modal-title",
    id: "editPTemplateModalLabel"
  }, "Edit Product Template")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement(InputBox, {
    label: "Template Name",
    id: "template-name",
    type: "text",
    required: true,
    value: props.name
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Category",
    id: "category",
    type: "text",
    required: true,
    value: props.category
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Child Category",
    id: "child-category",
    type: "text",
    required: true,
    value: props.childCategory
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Profit",
    id: "profit",
    type: "number",
    required: true,
    value: props.profit
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Description",
    id: "description",
    type: "text",
    required: false,
    value: props.description,
    onChange: handleDescriptionChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attributes"
  }, "Attributes"), /*#__PURE__*/React.createElement("div", {
    className: "vertical-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-11",
    id: "attributes"
  }, attributes.map(attribute => {
    return attribute;
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-1 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleNewAttribute
  }, "+"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-danger",
    onClick: handleDeleteAttribute
  }, "-")))), /*#__PURE__*/React.createElement("div", {
    className: "info col-md-10 col-md-offset-1",
    id: "info"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-foot text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-primary"
  }, "Submit"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-lg btn-default",
    "data-dismiss": "modal",
    onClick: handleCancel
  }, "Cancel")))))));
}
function NewPTemplateModal() {
  const handleSubmit = e => {
    e.preventDefault();
    const templateName = $('#template-name').val();
    const category = $('#category').val();
    const childCategory = $('#child-category').val();
    const profit = Number($('#profit').val());
    const status = 1;
    const include = $('#include').val() || [];
    const exclude = $('#exclude').val() || [];
    const description = $('#description').val() || '';
    const attributes = getAttributes();
    const data = {
      "templatename": templateName,
      "category": category,
      "childcategory": childCategory,
      "Profit": profit,
      "isactive": status,
      "include": include,
      "exclude": exclude,
      "description": description,
      "attributes": attributes,
      "creator_id": Number(localStorage.getItem('id'))
    };
    console.log(data);
    createPTemplate(JSON.stringify(data), () => {
      $('#info').html('<p class="text-success">New Product Template Created Successfully!</p>');
      setTimeout(() => {
        $('#info').html('');
        $('#newPTemplateModal').modal('hide');
        // window.location.reload();
      }, 1000);
    }, res => {
      $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
    });
  };
  const getAttributes = () => {
    const attrs = {};
    const price = $('#price-model').val();
    attrs['price'] = price;
    const attrName = $('#attr-name').val();
    const type = $('#type').val();
    const required = $('#required').val();
    attrs['attrs'] = [{
      "name": attrName,
      "type": type,
      "required": required
    }];
    return attrs;
  };
  const handleClick = e => {
    const sel = e.target.dataset.title;
    const tog = e.target.dataset.toggle;
    $('#' + tog).prop('value', sel);
    $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active btn-success').addClass('notActive btn-default');
    $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-success');
  };
  const [attributes, setAttributes] = React.useState([/*#__PURE__*/React.createElement(EmptyAttribute, null)]);
  const handleNewAttribute = e => {
    e.preventDefault();
    const newAttribute = /*#__PURE__*/React.createElement(EmptyAttribute, null);
    setAttributes([...attributes, newAttribute]);
  };
  const handleDeleteAttribute = e => {
    e.preventDefault();
    if (attributes.length === 1) {
      return;
    }
    const newAttributes = attributes.slice(0, attributes.length - 1);
    setAttributes(newAttributes);
  };
  const handleCancel = e => {
    e.preventDefault();
    setAttributes([/*#__PURE__*/React.createElement(EmptyAttribute, null)]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "newPTemplateModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "newPTemplateModalLabel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")), /*#__PURE__*/React.createElement("h4", {
    className: "modal-title",
    id: "newPTemplateModalLabel"
  }, "New Product Template")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(InputBox, {
    label: "Template Name",
    id: "template-name",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Category",
    id: "category",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Child Category",
    id: "child-category",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Profit",
    id: "profit",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "price-model"
  }, "Price Model*"), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-group",
    id: "radioBtn",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/React.createElement("a", {
    type: "button",
    className: "btn btn-success btn-lg active",
    "data-toggle": "price-model",
    "data-title": "flat"
  }, "Flat")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/React.createElement("a", {
    type: "button",
    className: "btn btn-default btn-lg notActive",
    "data-toggle": "price-model",
    "data-title": "tier"
  }, "Tier"))), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    id: "price-model",
    name: "price-model",
    value: "flat"
  })))), /*#__PURE__*/React.createElement(InputBox, {
    label: "Description",
    id: "description",
    type: "text",
    required: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attributes"
  }, "Attributes"), /*#__PURE__*/React.createElement("div", {
    className: "vertical-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-11",
    id: "attributes"
  }, attributes.map(attribute => {
    return attribute;
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-1 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleNewAttribute
  }, "+"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-danger",
    onClick: handleDeleteAttribute
  }, "-")))), /*#__PURE__*/React.createElement("div", {
    className: "info col-md-10 col-md-offset-1",
    id: "info"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-foot text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-primary",
    onClick: handleSubmit
  }, "Submit"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-lg btn-default",
    "data-dismiss": "modal",
    onClick: handleCancel
  }, "Cancel")))))));
}
function EmptyAttribute() {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attr-name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "attr-name",
    placeholder: "Attribute Name"
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "type"
  }, "Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "type"
  }, /*#__PURE__*/React.createElement("option", {
    value: "multiple"
  }, "Multiple"), /*#__PURE__*/React.createElement("option", {
    value: "custom"
  }, "Custom"))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(InputBox, {
    label: "Required",
    id: "required",
    type: "checkbox"
  }))));
}
function Attributes(props) {
  const items = props.items;
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "attr-name"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "attr-name",
    placeholder: "Attribute Name",
    value: items.name
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "type"
  }, "Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "type",
    value: items.type
  }, /*#__PURE__*/React.createElement("option", {
    value: "multiple"
  }, "Multiple"), /*#__PURE__*/React.createElement("option", {
    value: "custom"
  }, "Custom"))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(InputBox, {
    label: "Required",
    id: "required",
    type: "checkbox",
    value: items.required
  }))));
}
function CreatePTmplateBtn() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-lg btn-primary",
    "data-toggle": "modal",
    "data-target": "#newPTemplateModal"
  }, "Create New")));
}
export { renderPTemplateList, PTemplateListTable };