import { UserListTable } from "./renderUserList.js";
import { ProductListTable } from "./renderProductList.js";
import { TemplateListTable } from "./renderTemplateList.js";
import { PTemplateListTable } from "./renderPTemplateList.js";
import { getUserList } from "./getUserList.js";
import { getProduct } from "./getProduct.js";
import { getCTemplateList } from "./ctemplate.js";
import { getPTemplateList } from "./ptemplate_api.js";
import { Sidebar } from "./sidebar.js";
function renderAdmin() {
  const container = $('#admin');
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Admin, null), container[0]);
  }
  getUserList(1, 5, renderUserPanel);
  getProduct("list", 0, renderProductPanel);
  getCTemplateList(1, 5, renderCTemplatePanel, console.log);
  getPTemplateList(1, 5, renderPTemplatePanel, console.log);
}
function renderUserPanel(props) {
  const userList = $('#user-list');
  if (userList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserListTable, {
      users: props.list
    }), userList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No users found."), $('#user-list')[0]);
  }
}
function renderProductPanel(props) {
  const productList = $('#product-list');
  if (productList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ProductListTable, {
      products: props.list
    }), productList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No products found."), $('#product-list')[0]);
  }
}
function renderCTemplatePanel(props) {
  const templateList = $('#template-list');
  if (templateList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(TemplateListTable, {
      templates: props.data.list
    }), templateList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No templates found."), $('#template-list')[0]);
  }
}
function renderPTemplatePanel(props) {
  const templateList = $('#ptemplate-list');
  if (templateList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PTemplateListTable, {
      templates: props.list
    }), templateList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No templates found."), $('#ptemplate-list')[0]);
  }
}

// Pages: User management, Product management, Template management
function Admin(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement(Dashboard, {
    users: props.users
  }));
}
function Dashboard(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10"
  }, /*#__PURE__*/React.createElement(Welcome, null), /*#__PURE__*/React.createElement(ProductPanel, null), /*#__PURE__*/React.createElement(UserPanel, {
    users: props.users
  }), /*#__PURE__*/React.createElement(TemplatePanel, null), /*#__PURE__*/React.createElement(PTemplatePanel, null));
}
function Welcome(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("h1", null, "Admin Dashboard")));
}
function ProductPanel(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "panel-title"
  }, "Products")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body",
    id: "product-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel-footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/products",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-list"
  }), " Product Management")))));
}
function UserPanel(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "panel-title"
  }, "Users")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body",
    id: "user-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel-footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/users",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-user"
  }), " User Management")))));
}
function TemplatePanel(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "panel-title"
  }, "Catalog Templates")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body",
    id: "template-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel-footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }), " Catalog Template Management")))));
}
function PTemplatePanel(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "panel-title"
  }, "Product Templates")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body",
    id: "ptemplate-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel-footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/ptemplates",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }), " Product Template Management")))));
}
export { renderAdmin };