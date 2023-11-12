import { activeUser } from "./users.js";
import { deleteUser } from "./users.js";
import { updateUser } from "./users.js";
import { handlePreviousPage } from "./users.js";
import { handleNextPage } from "./users.js";
import { Sidebar } from "./renderAdmin.js";

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
            $('#popup-edit')[0]
        );
    }

    const listItems = users.map((user) =>
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.isactive ? 'Yes' : 'No'}</td>
            <td>
                <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#editModal" onClick={handleEdit} data-id={user.id}>Edit</button>
                <button type="button" className={user.isactive ? 'btn btn-sm btn-warning' : 'btn btn-sm btn-success'} onClick={handleActive} data-id={user.id}>{user.isactive ? 'Deactivate' : 'Activate'}</button>
                <button type="button" className="btn btn-sm btn-danger" onClick={handleDelete} data-id={user.id}>Delete</button>
            </td>
            <td title={user.created}>{user.created.slice(0, 10)}</td>
            <td title={user.updated}>{user.updated.slice(0, 10)}</td>
        </tr >
    );

    return (
        <div className="col-sm-12 row">
            <div className="row">
                <div className="col-sm-12">
                    <div id="popup-edit"></div>
                </div>
            </div>
            <table className="table table-bordered table-striped table-hover table-responsive-sm col-sm-12 table-condensed text-center">
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
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel">
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
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" defaultValue={user.username} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" defaultValue={user.password} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" defaultValue={user.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" id="phone" defaultValue={user.phone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" defaultValue={user.address} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profit">Profit</label>
                                <input type="text" className="form-control" id="profit" defaultValue={user.profit} />
                            </div>
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