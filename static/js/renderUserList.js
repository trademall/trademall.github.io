import { activeUser } from "./users.js";
import { deleteUser } from "./users.js";
import { updateUser } from "./users.js";
import { handlePreviousPage } from "./users.js";
import { handleNextPage } from "./users.js";
import { Sidebar } from "./sidebar.js";
import { InputBox } from "./InputBox.js";
function renderUserList(props) {
  const userList = $('#user-list');
  if (userList.length) {
    ReactDOM.render( /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
      className: "col-sm-10"
    }, /*#__PURE__*/React.createElement(UserList, {
      users: props.list
    }))), userList[0]);
  }
}
function UserList(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null), /*#__PURE__*/React.createElement(UserListTable, {
    users: props.users
  }));
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
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
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
    }), $('#popup-edit-user')[0]);
  };
  const listItems = users.map(user => /*#__PURE__*/React.createElement("tr", {
    key: user.id
  }, /*#__PURE__*/React.createElement("td", null, user.id), /*#__PURE__*/React.createElement("td", null, user.username), /*#__PURE__*/React.createElement("td", null, user.email), /*#__PURE__*/React.createElement("td", null, user.role), /*#__PURE__*/React.createElement("td", null, user.isactive ? 'Yes' : 'No'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm btn-primary",
    "data-toggle": "modal",
    "data-target": "#userEditModal",
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
  }, "Delete"))));
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 row table-responsive"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12"
  }, /*#__PURE__*/React.createElement("div", {
    id: "popup-edit-user"
  }))), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover col-sm-12 table-condensed text-center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Username"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Role"), /*#__PURE__*/React.createElement("th", null, "Active"), /*#__PURE__*/React.createElement("th", null, "Operations"))), /*#__PURE__*/React.createElement("tbody", null, listItems)));
}
function PopupEdit(props) {
  const user = props.user;
  function handleUpdate(e) {
    const data = {
      id: Number(e.target.dataset.id),
      username: $('#username').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      address: $('#address').val(),
      profit: Number($('#profit').val()),
      role: $('#role').val()
    };
    if ($('#password').val()) {
      data.password = $('#password').val();
    }
    updateUser(data);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal fade",
    id: "userEditModal",
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
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(InputBox, {
    id: "username",
    label: "Username",
    type: "text",
    defaultValue: user.username,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "password",
    label: "New Password",
    type: "password",
    defaultValue: "",
    required: false,
    autoComplete: "new-password",
    placeholder: "Leave blank if you don't want to change password"
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "email",
    label: "Email",
    type: "email",
    defaultValue: user.email,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "phone",
    label: "Phone",
    type: "text",
    defaultValue: user.phone,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "address",
    label: "Address",
    type: "text",
    defaultValue: user.address,
    required: true
  }), /*#__PURE__*/React.createElement(InputBox, {
    id: "profit",
    label: "Profit",
    type: "number",
    defaultValue: user.profit,
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-10 col-md-offset-1"
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
  }, "User"))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-danger",
    id: "error-message"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-success",
    id: "success-message"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handleUpdate,
    "data-id": user.id
  }, "Update"))))));
}
export { renderUserList, UserListTable };