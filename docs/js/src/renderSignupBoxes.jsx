import { InputBox } from './InputBox.js';

function RenderBoxes() {
    const userInfo = $('#user-info')[0];
    const boxes = [
        { id: 'username', label: 'Username', type: 'text', name: 'username', required: true, minLength: 3, maxLength: 25, placeholder: '3-25 characters, alphabet and numbers only' },
        { id: 'email', label: 'Email', type: 'email', name: 'email', required: true, placeholder: 'Your E-mail' },
        { id: 'password', label: 'Password', type: 'password', name: 'password', required: true, minLength: 6, maxLength: 25, placeholder: '6-25 characters, alphabet and numbers only' },
        { id: 'confirm-password', label: 'Confirm Password', type: 'password', name: 'confirm-password', required: true, minLength: 6, maxLength: 25, placeholder: '6-25 characters, alphabet and numbers only' },
        { id: 'phone', label: 'Phone', type: 'tel', name: 'phone', required: false, placeholder: 'Your Phone Number' },
        { id: 'address', label: 'Address', type: 'text', name: 'address', required: false, placeholder: 'Your Address' }
    ];
    const listItems = boxes.map((box) =>
        <InputBox key={box.id} id={box.id} label={box.label} type={box.type} name={box.name} required={box.required} {...box} />
    );
    ReactDOM.render(
        <div className="row">
            {listItems}
            <ToLogin />
        </div>,
        userInfo
    );
}

function Avatar(props) {
    return (
        <img src={props.user.avatar} alt="" className="img img-responsive" id="avatar" />
    );
}

function ToLogin(props) {
    return (
        <div className="col-md-10 col-md-offset-1">
            <p id="back-to-login">Already have an account? <a href="{{ .Site.BaseURL }}login">Log in</a></p>
        </div>
    );
}


export { RenderBoxes };
