import { activeUser } from "./users.js";
import { deleteUser } from "./users.js";
import { updateUser } from "./users.js";
import { handlePreviousPage } from "./users.js";
import { handleNextPage } from "./users.js";
import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";

function renderUserList(props) {
    const userList = $('#user-list');
    if (userList.length) {
        ReactDOM.render(
            <div className="row">
                <Sidebar />
                <div className="col-sm-10">
                    <UserList users={props.list} />
                </div>
            </div>,
            userList[0]
        );
    }
}

function UserList(props) {
    return (
        <div>
            <Heading />
            <UserListTable users={props.users} />
            <Pagination />
        </div>
    );
}

function Heading() {
    return (
        <div className="row">
            <div className="col-sm-12 heading">
                <h3 className="text-uppercase">User List</h3>
            </div>
        </div>
    );
}

function Pagination() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button className="btn btn-default" onClick={handlePreviousPage}>&lt;&nbsp;Prev</button>
                <button className="btn btn-default" onClick={handleNextPage}>Next&nbsp;&gt;</button>
            </div>
        </div>
    );
}

function UserListTable(props) {
    const users = props.users;

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteUser(id);
    }
    const handleActive = (e) => {
        const id = e.target.dataset.id;
        activeUser(id);
    }
    const handleEdit = (e) => {
        const id = e.target.dataset.id;
        const user = users.find(user => user.id == id);
        console.log(user);
        ReactDOM.render(
            <PopupEdit user={user} />,
            $('#popup-edit-user')[0]
        );
    }

    const listItems = users.map((user) =>
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.isactive ? 'Yes' : 'No'}</td>
            <td>
                <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#userEditModal" onClick={handleEdit} data-id={user.id}>Edit</button>
                <button type="button" className={user.isactive ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success'} onClick={handleActive} data-id={user.id}>{user.isactive ? 'Deactivate' : 'Activate'}</button>
                <button type="button" className="btn btn-sm btn-danger" onClick={handleDelete} data-id={user.id}>Delete</button>
            </td>
            <td title={user.created}>{user.created.slice(0, 10)}</td>
            <td title={user.updated}>{user.updated.slice(0, 10)}</td>
        </tr >
    );

    return (
        <div className="col-sm-12 row table-responsive">
            <div className="row">
                <div className="col-sm-12">
                    <div id="popup-edit-user"></div>
                </div>
            </div>
            <table className="table table-striped table-hover col-sm-12 table-condensed text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Operations</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        </div>
    );
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
        }
        updateUser(data);
    }
    return (
        <div className="modal fade" id="userEditModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="text-danger">&times;</span>
                        </button>
                        <h4 className="modal-title" id="editModalLabel">Edit User</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <InputBox id="username" label="Username" type="text" defaultValue={user.username} required={true} />
                            <InputBox id="password" label="Password" type="password" defaultValue={user.password} required={true} />
                            <InputBox id="email" label="Email" type="email" defaultValue={user.email} required={true} />
                            <InputBox id="phone" label="Phone" type="text" defaultValue={user.phone} required={true} />
                            <InputBox id="address" label="Address" type="text" defaultValue={user.address} required={true} />
                            <InputBox id="profit" label="Profit" type="number" defaultValue={user.profit} required={true} />
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select className="form-control" id="role" defaultValue={user.role}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate} data-id={user.id}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { renderUserList, UserList }