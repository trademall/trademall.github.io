import { activeUser } from "./users.js";
import { deleteUser } from "./users.js";
import { updateUser } from "./users.js";
import { handlePreviousPage } from "./users.js";
import { handleNextPage } from "./users.js";
function renderUserList(props) {
  const userList = $('#user-list');
  if (userList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserList, {
      users: props.list
    }), userList[0]);
  }
}
function UserList(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement(Heading, null), /*#__PURE__*/React.createElement(UserListTable, {
    users: props.users
  }), /*#__PURE__*/React.createElement(Pagination, null)));
}
function Heading() {
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 heading"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-uppercase"
  }, "User List")));
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
function UserListTable(props) {
  const users = props.users;
  const handleDelete = e => {
    const id = e.target.dataset.id;
    deleteUser(id);
  };
  const handleActive = e => {
    const id = e.target.dataset.id;
    activeUser(id);
  };
  const handleEdit = e => {
    const id = e.target.dataset.id;
    const user = users.find(user => user.id == id);
    console.log(user);
    ReactDOM.render( /*#__PURE__*/React.createElement(PopupEdit, {
      user: user
    }), $('#popup-edit')[0]);
  };
  const listItems = users.map(user => /*#__PURE__*/React.createElement("tr", {
    key: user.id
  }, /*#__PURE__*/React.createElement("td", null, user.id), /*#__PURE__*/React.createElement("td", null, user.username), /*#__PURE__*/React.createElement("td", null, user.email), /*#__PURE__*/React.createElement("td", null, user.role), /*#__PURE__*/React.createElement("td", null, user.isactive ? 'Yes' : 'No'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm btn-primary",
    "data-toggle": "modal",
    "data-target": "#editModal",
    onClick: handleEdit,
    "data-id": user.id
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: user.isactive ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success',
    onClick: handleActive,
    "data-id": user.id
  }, user.isactive ? 'Deactivate' : 'Activate'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm btn-danger",
    onClick: handleDelete,
    "data-id": user.id
  }, "Delete")), /*#__PURE__*/React.createElement("td", {
    title: user.created
  }, user.created.slice(0, 10)), /*#__PURE__*/React.createElement("td", {
    title: user.updated
  }, user.updated.slice(0, 10))));
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    id: "popup-edit"
  }))), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover table-responsive text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Username"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Role"), /*#__PURE__*/React.createElement("th", null, "Active"), /*#__PURE__*/React.createElement("th", null, "Operations"), /*#__PURE__*/React.createElement("th", null, "Created At"), /*#__PURE__*/React.createElement("th", null, "Updated At"))), /*#__PURE__*/React.createElement("tbody", null, listItems)));
}
function PopupEdit(props) {
  const user = props.user;
  function handleUpdate(e) {
    const data = {
      id: e.target.dataset.id,
      username: $('#username').val(),
      password: $('#password').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      address: $('#address').val(),
      profit: $('#profit').val(),
      role: $('#role').val()
    };
    updateUser(data);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "editModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "editModalLabel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header bg-primary"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "text-danger"
  }, "\xD7")), /*#__PURE__*/React.createElement("h4", {
    className: "modal-title",
    id: "editModalLabel"
  }, "Edit User")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "username",
    defaultValue: user.username
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "password"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    className: "form-control",
    id: "password",
    defaultValue: user.password
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email"
  }, "Email address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "form-control",
    id: "email",
    defaultValue: user.email
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "phone"
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "phone",
    defaultValue: user.phone
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "address"
  }, "Address"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "address",
    defaultValue: user.address
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "profit"
  }, "Profit"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "profit",
    defaultValue: user.profit
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "role"
  }, "Role"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    id: "role",
    defaultValue: user.role
  }, /*#__PURE__*/React.createElement("option", {
    value: "admin"
  }, "Admin"), /*#__PURE__*/React.createElement("option", {
    value: "user"
  }, "User"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleUpdate,
    "data-id": user.id
  }, "Update"))))));
}
export { renderUserList, UserList };