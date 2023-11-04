function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { InputBox } from './InputBox.js';
function RenderBoxes() {
  const userInfo = $('#user-info')[0];
  const boxes = [{
    id: 'username',
    label: 'Username',
    type: 'text',
    name: 'username',
    required: true,
    minLength: 3,
    maxLength: 25,
    placeholder: '3-25 characters, alphabet and numbers only'
  }, {
    id: 'email',
    label: 'Email',
    type: 'email',
    name: 'email',
    required: true,
    placeholder: 'Your E-mail'
  }, {
    id: 'password',
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
    minLength: 6,
    maxLength: 25,
    placeholder: '6-25 characters, alphabet and numbers only'
  }, {
    id: 'confirm-password',
    label: 'Confirm Password',
    type: 'password',
    name: 'confirm-password',
    required: true,
    minLength: 6,
    maxLength: 25,
    placeholder: '6-25 characters, alphabet and numbers only'
  }, {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    required: false,
    placeholder: 'Your Phone Number'
  }, {
    id: 'address',
    label: 'Address',
    type: 'text',
    name: 'address',
    required: false,
    placeholder: 'Your Address'
  }];
  const listItems = boxes.map(box => /*#__PURE__*/React.createElement(InputBox, _extends({
    key: box.id,
    id: box.id,
    label: box.label,
    type: box.type,
    name: box.name,
    required: box.required
  }, box)));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, listItems, /*#__PURE__*/React.createElement(ToLogin, null)), userInfo);
}
function Avatar(props) {
  return /*#__PURE__*/React.createElement("img", {
    src: props.user.avatar,
    alt: "",
    className: "img img-responsive",
    id: "avatar"
  });
}
function ToLogin(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("p", {
    id: "back-to-login"
  }, "Already have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "{{ .Site.BaseURL }}login"
  }, "Log in"), "."));
}
export { RenderBoxes };