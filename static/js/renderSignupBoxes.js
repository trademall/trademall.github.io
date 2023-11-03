import { InputBox } from './InputBox.js';
function RenderBoxes() {
  const userInfo = $('#user-info')[0];
  const boxes = [{
    id: 'username',
    label: 'Username',
    type: 'text',
    name: 'username',
    required: true
  }, {
    id: 'email',
    label: 'Email',
    type: 'email',
    name: 'email',
    required: true
  }, {
    id: 'password',
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true
  }, {
    id: 'confirm-password',
    label: 'Confirm Password',
    type: 'password',
    name: 'confirm-password',
    required: true
  }, {
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    name: 'phone',
    required: true
  }, {
    id: 'address',
    label: 'Address',
    type: 'text',
    name: 'address',
    required: true
  }];
  const listItems = boxes.map(box => /*#__PURE__*/React.createElement(InputBox, {
    key: box.id,
    id: box.id,
    label: box.label,
    type: box.type,
    name: box.name,
    required: box.required
  }));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, listItems), userInfo);
}
function Avatar(props) {
  return /*#__PURE__*/React.createElement("img", {
    src: props.user.avatar,
    alt: "",
    className: "img img-responsive",
    id: "avatar"
  });
}
export { RenderBoxes };