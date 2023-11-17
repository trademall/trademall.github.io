import { UserList } from "./renderUserList.js";
import { ProductList } from "./renderProductList.js";
import { TemplateList } from "./renderTemplateList.js";
import { getUserList } from "./getUserList.js";
import { getProduct } from "./getProduct.js";
import { getCTemplateList } from "./ctemplate.js";
function renderAdmin() {
  const container = $('#admin');
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Admin, null), container[0]);
  }
  getUserList(1, 5, renderUserPanel);
  getProduct("list", 0, renderProductPanel);
  getCTemplateList(1, 5, renderCTemplatePanel, console.log);
}
function renderUserPanel(props) {
  const userList = $('#user-list');
  if (userList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserList, {
      users: props.list
    }), userList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No users found."), $('#user-list')[0]);
  }
}
function renderProductPanel(props) {
  const productList = $('#product-list');
  if (productList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ProductList, {
      products: props.list
    }), productList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No products found."), $('#product-list')[0]);
  }
}
function renderCTemplatePanel(props) {
  const templateList = $('#template-list');
  if (templateList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(TemplateList, {
      templates: props.data.list
    }), templateList[0]);
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "No templates found."), $('#template-list')[0]);
  }
}
function Sidebar(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-1 col-md-2 mysidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default sidebar-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sidebar-title hidden-sm"
  }, "Pages")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav nav-pills nav-stacked"
  }, /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-home"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Home"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/users/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/users/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-user"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Users"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/products/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/products/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-list"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Products"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/templates/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Templates")))))));
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
  }), /*#__PURE__*/React.createElement(TemplatePanel, null));
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
  }, "Templates")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body",
    id: "template-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel-footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }), " Template Management")))));
}
export { renderAdmin, Sidebar };