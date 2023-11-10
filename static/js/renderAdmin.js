import { UserList } from "./renderUserList.js";
import { getUserList } from "./getUserList.js";
function renderAdmin() {
  const container = $('#admin');
  if (container.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Admin, null), container[0]);
  }
  getUserList(1, 5, renderUserList);
}
function renderUserList(props) {
  const userList = $('#user-list');
  if (userList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserList, {
      users: props.list
    }), userList[0]);
  }
}
function Sidebar(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default sidebar-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sidebar-title"
  }, "Pages")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav nav-pills nav-stacked"
  }, /*#__PURE__*/React.createElement("li", {
    className: "active"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/dashboard"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-home"
  }), " Home")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/admin/users"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-user"
  }), " Users")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/admin/products"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-list"
  }), " Products")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }), " Templates"))))));
}

// Pages: User management, Product management, Template management
function Admin(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement(Dashboard, {
    users: props.users
  })));
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
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("p", null, "Manage products"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/products",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-list"
  }), " Products")))));
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
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("p", null, "Manage templates"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates",
    className: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-file"
  }), " Templates")))));
}
export { renderAdmin, Sidebar };