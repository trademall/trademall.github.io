import { UserList } from "./renderUserList.js";
import { getUserList } from "./getUserList.js";

function renderAdmin() {
    const container = $('#admin');
    if (container.length) {
        ReactDOM.render(
            <Admin />,
            container[0]
        );
    }
    getUserList(1, 5, renderUserList);
}

function renderUserList(props) {
    const userList = $('#user-list');
    if (userList.length) {
        ReactDOM.render(
            <UserList users={props.list} />,
            userList[0]
        );
    }
}

function Sidebar(props) {
    return (
        <div className="col-sm-1 col-md-2 mysidebar">
            <div className="panel panel-default sidebar-menu">
                <div className="panel-heading">
                    <h4 className="sidebar-title hidden-sm">Pages</h4>
                </div>
                <div className="panel-body">
                    <ul className="nav nav-pills nav-stacked">
                        <li className={window.location.pathname === '/admin/' ? 'active' : ''}>
                            <a href="/admin/"><i className="fa fa-home">&nbsp;</i><span className="hidden-sm">Home</span></a>
                        </li>
                        <li className={window.location.pathname === '/admin/users/' ? 'active' : ''}>
                            <a href="/admin/users/"><i className="fa fa-user">&nbsp;</i><span className="hidden-sm">Users</span></a>
                        </li>
                        <li className={window.location.pathname === '/admin/products/' ? 'active' : ''}>
                            <a href="/admin/products/"><i className="fa fa-list">&nbsp;</i><span className="hidden-sm">Products</span></a>
                        </li>
                        <li className={window.location.pathname === '/admin/templates' ? 'active' : ''}>
                            <a href="/admin/templates"><i className="fa fa-file">&nbsp;</i><span className="hidden-sm">Templates</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Pages: User management, Product management, Template management
function Admin(props) {
    return (
        <div className="row">
            <Sidebar />
            <Dashboard users={props.users} />
        </div>
    );
}

function Dashboard(props) {
    return (
        <div className="col-sm-10">
            <Welcome />
            <ProductPanel />
            <UserPanel users={props.users} />
            <TemplatePanel />
        </div>
    );
}

function Welcome(props) {
    return (
        <div className="row">
            <div className="col-sm-12">
                <h1>Admin Dashboard</h1>
            </div>
        </div>
    );
}

function ProductPanel(props) {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Products</h4>
                    </div>
                    <div className="panel-body">
                        <p>Manage products</p>
                        <a href="/admin/products" className="btn btn-primary"><i className="fa fa-list"></i> Products</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserPanel(props) {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Users</h4>
                    </div>
                    <div className="panel-body" id="user-list">
                    </div>
                    <div className="panel-footer">
                        <a href="/admin/users" className="btn btn-primary"><i className="fa fa-user"></i> User Management</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TemplatePanel(props) {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Templates</h4>
                    </div>
                    <div className="panel-body">
                        <p>Manage templates</p>
                        <a href="/admin/templates" className="btn btn-primary"><i className="fa fa-file"></i> Templates</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { renderAdmin, Sidebar }
