import { Sidebar } from "./renderAdmin.js";
import { deleteCTemplate, updateCTemplate } from "./ctemplate.js";
import { handleNextPage, handlePreviousPage } from "./template_manage.js";
function renderCTemplateList(props) {
  const templateList = $('#template-list');
  if (templateList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-10"
    }, /*#__PURE__*/React.createElement(TemplateList, {
      templates: props.list
    }))), templateList[0]);
  }
}
function TemplateList(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null), /*#__PURE__*/React.createElement(TemplateListTable, {
    templates: props.templates
  }));
}
function Heading() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 heading"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-uppercase"
  }, "Template List")));
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
function TemplateListTable(props) {
  const templates = props.templates;
  const handleDelete = e => {
    const id = e.target.dataset.id;
    deleteCTemplate(id);
  };
  const handleUpdate = e => {
    const id = e.target.dataset.id;
    updateCTemplate(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Merchant"), /*#__PURE__*/React.createElement("th", null, "Customer"), /*#__PURE__*/React.createElement("th", null, "Created At"), /*#__PURE__*/React.createElement("th", null, "Expire At"), /*#__PURE__*/React.createElement("th", null, "Operations"))), /*#__PURE__*/React.createElement("tbody", null, templates.map(template => {
    return /*#__PURE__*/React.createElement("tr", {
      key: template.id
    }, /*#__PURE__*/React.createElement("td", null, template.mname), /*#__PURE__*/React.createElement("td", null, template.cname), /*#__PURE__*/React.createElement("td", null, template.creat), /*#__PURE__*/React.createElement("td", null, template.expire), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
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
export { renderCTemplateList, TemplateListTable };