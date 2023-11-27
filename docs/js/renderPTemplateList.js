import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { createPTemplate, deletePTemplate, updatePTemplate } from "./ptemplate_api.js";
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
  const handleUpdate = e => {
    const id = e.target.dataset.id;
    updatePTemplate(id, () => {
      window.location.reload();
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
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
      className: "btn btn-danger",
      "data-id": template.id,
      onClick: handleDelete
    }, "Delete")));
  })))));
}
function NewPTemplateModal() {
  const handleSubmit = e => {
    e.preventDefault();
    const templateName = $('#template-name').val();
    const category = $('#category').val();
    const childCategory = $('#child-category').val();
    const profit = Number($('#profit').val());
    const status = $('#status').val() === 'on' ? 1 : 0;
    const include = $('#include').val();
    const exclude = $('#exclude').val();
    const data = {
      templatename: templateName,
      category: category,
      childcategory: childCategory,
      profit: profit,
      isactive: status,
      include: include,
      exclude: exclude
    };
    createPTemplate(data, () => {
      $('#info').html('<p class="text-success">New Product Template Created Successfully!</p>');
      setTimeout(() => {
        $('#info').html('');
        $('#newPTemplateModal').modal('hide');
        window.location.reload();
      }, 1000);
    }, res => {
      $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
    });
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
  }, /*#__PURE__*/React.createElement("h4", {
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
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Active",
    id: "status",
    type: "checkbox"
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Include",
    id: "include",
    type: "text",
    required: false
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Exclude",
    id: "exclude",
    type: "text",
    required: false
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Description",
    id: "description",
    type: "text",
    required: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "info",
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
    "data-dismiss": "modal"
  }, "Cancel")))))));
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