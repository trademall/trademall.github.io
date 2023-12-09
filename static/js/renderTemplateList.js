import { Sidebar } from "./sidebar.js";
import { InputBox, SingleImageBox } from "./InputBox.js";
import { deleteCTemplate, updateCTemplate, createCTemplate } from "./ctemplate.js";
import { handleNextPage, handlePreviousPage } from "./template_manage.js";
import { uploadFile } from "./uploadFile.js";
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
  }), /*#__PURE__*/React.createElement(NewCTemplateModal, null), /*#__PURE__*/React.createElement(CreateCTemplateBtn, null));
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
const emptyCTemplate = {
  id: 0,
  logo: '',
  mname: '',
  cname: '',
  maddress: '',
  caddress: '',
  mtitle: '',
  ctitle: '',
  profit: 0,
  create: '',
  expire: ''
};
function TemplateListTable(props) {
  const templates = props.templates;
  const [ctemplate, setCTemplate] = React.useState(emptyCTemplate);
  const handleDelete = e => {
    const id = e.target.dataset.id;
    if (confirm('Are you sure to delete this template?')) {
      deleteCTemplate(id, data => {
        alert('Delete Success!');
        window.location.reload();
      }, data => {
        alert('Delete Failed: ' + data.message);
      });
    }
  };
  const handleUpdate = e => {
    const id = e.target.dataset.id;
    const template = templates.find(template => {
      return template.id == id;
    });
    setCTemplate(template);
    $('#editCTemplateModal').modal('show');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(PopupEdit, {
    ctemplate: ctemplate,
    setCTemplate: setCTemplate
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Merchant"), /*#__PURE__*/React.createElement("th", null, "Customer"), /*#__PURE__*/React.createElement("th", null, "Expire At"), /*#__PURE__*/React.createElement("th", null, "Profit"), /*#__PURE__*/React.createElement("th", null, "Operations"))), /*#__PURE__*/React.createElement("tbody", null, templates.map(template => {
    return /*#__PURE__*/React.createElement("tr", {
      key: template.id
    }, /*#__PURE__*/React.createElement("td", null, template.mname), /*#__PURE__*/React.createElement("td", null, template.cname), /*#__PURE__*/React.createElement("td", null, template.expire.slice(0, 16).replace('T', ' ')), /*#__PURE__*/React.createElement("td", null, template.profit), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
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
function PopupEdit(props) {
  const ctemplate = props.ctemplate;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "editCTemplateModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "editCTemplateModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement(EditCTemplateModalHeader, null), /*#__PURE__*/React.createElement(EditCTemplateModalBody, {
    ctemplate: ctemplate
  }), /*#__PURE__*/React.createElement(EditCTemplateModalFooter, {
    ctemplate: ctemplate
  }))));
}
function EditCTemplateModalHeader() {
  return /*#__PURE__*/React.createElement("div", {
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
    id: "editCTemplateModalLabel"
  }, "Edit Template"));
}
function EditCTemplateModalBody(props) {
  const ctemplate = props.ctemplate;
  React.useEffect(() => {
    // $('#editCTemplateModal #new-logo').val(ctemplate.logo);
    $('#editCTemplateModal #merchant').val(ctemplate.mname);
    $('#editCTemplateModal #customer').val(ctemplate.cname);
    $('#editCTemplateModal #merchant-address').val(ctemplate.maddress);
    $('#editCTemplateModal #customer-address').val(ctemplate.caddress);
    $('#editCTemplateModal #merchant-title').val(ctemplate.mtitle);
    $('#editCTemplateModal #customer-title').val(ctemplate.ctitle);
    $('#editCTemplateModal #profit').val(ctemplate.profit);
    $('#editCTemplateModal #expire').val(ctemplate.expire.substr(0, 16));
  }, [ctemplate]);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-body row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image-upload"
  }, "Logo*"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-upload thumbnail text-hide text-center",
    id: "image-upload"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("img", {
    src: ctemplate.logo,
    className: "img-thumbnail",
    draggable: "false"
  }), /*#__PURE__*/React.createElement("p", null)), /*#__PURE__*/React.createElement(SingleImageBox, {
    label: "New Logo",
    id: "new-logo",
    required: true,
    text: "upload new logo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info",
    role: "alert"
  }, /*#__PURE__*/React.createElement("p", null, "Select a new logo if you want to change.")))), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant",
    id: "merchant",
    required: true,
    defalutValue: ctemplate.mname
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer",
    id: "customer",
    required: true,
    defalutValue: ctemplate.cname
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant Address",
    id: "merchant-address",
    type: "text",
    required: true,
    defalutValue: ctemplate.maddress
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer Address",
    id: "customer-address",
    type: "text",
    required: true,
    defalutValue: ctemplate.caddress
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant Title",
    id: "merchant-title",
    type: "text",
    required: true,
    defalutValue: ctemplate.mtitle
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer Title",
    id: "customer-title",
    type: "text",
    required: true,
    defalutValue: ctemplate.ctitle
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Profit",
    id: "profit",
    type: "number",
    required: true,
    defalutValue: ctemplate.profit
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Expire",
    id: "expire",
    type: "datetime-local",
    required: true,
    defalutValue: ctemplate.expire
  }));
}
function EditCTemplateModalFooter(props) {
  const handleUpdateCTemplate = e => {
    $('#editCTemplateModal .modal-foot .btn').attr('disabled', true);
    $('#editCTemplateModal #updateCTemplateBtn').html('<i class="fa fa-spinner fa-spin"></i> Updating...');
    const id = Number(e.target.dataset.id);
    const logo = $('#editCTemplateModal p#new-logo').text();
    const merchant = $('#editCTemplateModal #merchant').val();
    const customer = $('#editCTemplateModal #customer').val();
    const merchantAddress = $('#editCTemplateModal #merchant-address').val();
    const customerAddress = $('#editCTemplateModal #customer-address').val();
    const merchantTitle = $('#editCTemplateModal #merchant-title').val();
    const customerTitle = $('#editCTemplateModal #customer-title').val();
    const profit = Number($('#editCTemplateModal #profit').val());
    const expire = $('#editCTemplateModal #expire').val() + ':00Z';
    const newdata = {
      id: id,
      logo: props.ctemplate.logo,
      mname: merchant,
      cname: customer,
      maddress: merchantAddress,
      caddress: customerAddress,
      mtitle: merchantTitle,
      ctitle: customerTitle,
      profit: profit,
      create: props.ctemplate.create,
      expire: expire
    };
    if (logo) {
      let logoIcon = document.querySelector('#editCTemplateModal input#new-logo[type="file"].uploaded');
      let logoName = document.querySelector('#editCTemplateModal p#new-logo.img-name.has-file');
      let formData = new FormData();
      formData.append('file', logoIcon.files[0], logoName.innerHTML);
      uploadFile(formData, data => {
        $('#editCTemplateModal input#new-logo-url').val(data.data);
        newdata.logo = $('#editCTemplateModal input#new-logo-url').val();
        deleteCTemplate(id, data => {
          createCTemplate(newdata, data => {
            $('#editCTemplateModal .modal-foot').addClass('bg-success');
            $('#editCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Update Success!</p>');
            setTimeout(() => {
              $('#editCTemplateModal').modal('hide');
              window.location.reload();
            }, 1500);
          }, data => {
            $('#editCTemplateModal .modal-foot').addClass('bg-danger');
            $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>');
            setTimeout(() => {
              $('#editCTemplateModal').modal('hide');
              window.location.reload();
            }, 1500);
          });
        }, data => {
          $('#editCTemplateModal .modal-foot').addClass('bg-danger');
          $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>');
          setTimeout(() => {
            $('#editCTemplateModal').modal('hide');
            window.location.reload();
          }, 1500);
        });
      }, err => {
        $('#editCTemplateModal .modal-foot').addClass('bg-danger');
        $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>');
        setTimeout(() => {
          $('#editCTemplateModal').modal('hide');
          window.location.reload();
        }, 1500);
      });
    } else {
      console.log(newdata);
      deleteCTemplate(id, data => {
        createCTemplate(newdata, data => {
          $('#editCTemplateModal .modal-foot').addClass('bg-success');
          $('#editCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Update Success!</p>');
          setTimeout(() => {
            $('#editCTemplateModal').modal('hide');
            window.location.reload();
          }, 1500);
        }, data => {
          $('#editCTemplateModal .modal-foot').addClass('bg-danger');
          $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>');
          setTimeout(() => {
            $('#editCTemplateModal').modal('hide');
            window.location.reload();
          }, 1500);
        });
      }, data => {
        $('#editCTemplateModal .modal-foot').addClass('bg-danger');
        $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>');
        setTimeout(() => {
          $('#editCTemplateModal').modal('hide');
          window.location.reload();
        }, 1500);
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-foot text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-lg btn-primary",
    onClick: handleUpdateCTemplate,
    "data-id": props.ctemplate.id,
    id: "updateCTemplateBtn"
  }, "Update"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-lg btn-default",
    "data-dismiss": "modal"
  }, "Cancel"));
}
function NewCTemplateModal() {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "newCTemplateModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "newCTemplateModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement(NewCTemplateModalHeader, null), /*#__PURE__*/React.createElement(NewCTemplateModalBody, null), /*#__PURE__*/React.createElement(NewCTemplateModalFooter, null))));
}
function NewCTemplateModalHeader() {
  return /*#__PURE__*/React.createElement("div", {
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
    id: "newCTemplateModalLabel"
  }, "Create New Template"));
}
function NewCTemplateModalBody() {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-body row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "image-upload"
  }, "Logo*"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload"
  }, /*#__PURE__*/React.createElement("div", {
    className: "file-upload thumbnail text-hide text-center",
    id: "image-upload"
  }, /*#__PURE__*/React.createElement(SingleImageBox, {
    label: "Logo",
    id: "logo",
    required: true
  })))), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant Name",
    id: "merchant",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer Name",
    id: "customer",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant Address",
    id: "merchant-address",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer Address",
    id: "customer-address",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Merchant Title",
    id: "merchant-title",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Customer Title",
    id: "customer-title",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Profit",
    id: "profit",
    type: "number",
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Expire",
    id: "expire",
    type: "datetime-local",
    required: true
  }));
}
function NewCTemplateModalFooter() {
  const handleCreateCTemplate = () => {
    $('#newCTemplateModal .modal-foot .btn').attr('disabled', true);
    $('#newCTemplateModal #createCTemplateBtn').html('<i class="fa fa-spinner fa-spin"></i> Creating...');
    let logoIcon = document.querySelector('#newCTemplateModal input#logo[type="file"].uploaded');
    if (!logoIcon) {
      alert('Please select a logo');
      $('#newCTemplateModal .modal-foot .btn').attr('disabled', false);
      $('#newCTemplateModal #createCTemplateBtn').html('Create');
      return;
    }
    let logoName = document.querySelector('#newCTemplateModal p#logo.img-name.has-file');
    let formData = new FormData();
    formData.append('file', logoIcon.files[0], logoName.innerHTML);
    uploadFile(formData, data => {
      $('#newCTemplateModal input#logo-url').val(data.data);
      const logo = $('#newCTemplateModal input#logo-url').val();
      const merchant = $('#newCTemplateModal #merchant').val();
      const customer = $('#newCTemplateModal #customer').val();
      const merchantAddress = $('#newCTemplateModal #merchant-address').val();
      const customerAddress = $('#newCTemplateModal #customer-address').val();
      const merchantTitle = $('#newCTemplateModal #merchant-title').val();
      const customerTitle = $('#newCTemplateModal #customer-title').val();
      const profit = Number($('#newCTemplateModal #profit').val());
      const expire = $('#newCTemplateModal #expire').val() + ':00Z';
      const cdata = {
        logo: logo,
        mname: merchant,
        cname: customer,
        maddress: merchantAddress,
        caddress: customerAddress,
        mtitle: merchantTitle,
        ctitle: customerTitle,
        profit: profit,
        create: new Date().toISOString(),
        expire: expire
      };
      createCTemplate(cdata, data => {
        $('#newCTemplateModal .modal-foot').addClass('bg-success');
        $('#newCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Create Success!</p>');
        setTimeout(() => {
          $('#newCTemplateModal').modal('hide');
          window.location.reload();
        }, 1500);
      }, data => {
        $('#newCTemplateModal .modal-foot').addClass('bg-danger');
        $('#newCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Create Failed: ' + data.message + '</p>');
        setTimeout(() => {
          $('#newCTemplateModal').modal('hide');
          window.location.reload();
        }, 1500);
      });
    }, err => {
      $('#newCTemplateModal .modal-foot').addClass('bg-danger');
      $('#newCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Create Failed: ' + data.message + '</p>');
      setTimeout(() => {
        $('#newCTemplateModal').modal('hide');
        window.location.reload();
      }, 1500);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-foot text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-lg btn-primary",
    onClick: handleCreateCTemplate,
    id: "createCTemplateBtn"
  }, "Create"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-lg btn-default",
    "data-dismiss": "modal"
  }, "Cancel"));
}
function CreateCTemplateBtn() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-lg btn-primary",
    "data-toggle": "modal",
    "data-target": "#newCTemplateModal"
  }, "Create New Template")));
}
export { renderCTemplateList, TemplateListTable };