import { UserListTable } from "./renderUserList.js";
import { ProductListTable } from "./renderProductList.js";
import { TemplateListTable } from "./renderTemplateList.js";
import { PTemplateListTable } from "./renderPTemplateList.js";
import { getUserList } from "./getUserList.js";
import { getProduct } from "./getProduct.js";
import { getCTemplateList } from "./ctemplate.js";
import { getPTemplateList } from "./ptemplate_api.js";
import { Sidebar } from "./sidebar.js";

function renderAdmin() {
    const container = $('#admin');
    if (container.length) {
        ReactDOM.render(
            <Admin />,
            container[0]
        );
    }
    getUserList(1, 5, renderUserPanel);
    getProduct("list", Number(localStorage.getItem('id')), renderProductPanel);
    getCTemplateList(1, 5, renderCTemplatePanel, console.log);
    getPTemplateList(1, 5, renderPTemplatePanel, console.log);
}

function renderUserPanel(props) {
    const userList = $('#user-list');
    if (userList.length) {
        ReactDOM.render(
            <UserListTable users={props.list} />,
            userList[0]
        );
    }
    else {
        ReactDOM.render(
            <p>No users found.</p>,
            $('#user-list')[0]
        );
    }
}

function renderProductPanel(props) {
    const productList = $('#product-list');
    if (productList.length) {
        ReactDOM.render(
            <ProductListTable products={props.list} />,
            productList[0]
        );
    }
    else {
        ReactDOM.render(
            <p>No products found.</p>,
            $('#product-list')[0]
        );
    }
}

function renderCTemplatePanel(props) {
    const templateList = $('#ctemplate-list');
    if (templateList.length) {
        ReactDOM.render(
            <TemplateListTable templates={props.list} />,
            templateList[0]
        );
    }
    else {
        ReactDOM.render(
            <p>No templates found.</p>,
            $('#ctemplate-list')[0]
        );
    }
}

function renderPTemplatePanel(props) {
    const templateList = $('#ptemplate-list');
    if (templateList.length) {
        ReactDOM.render(
            <PTemplateListTable templates={props.list} />,
            templateList[0]
        );
    }
    else {
        ReactDOM.render(
            <p>No templates found.</p>,
            $('#ptemplate-list')[0]
        );
    }
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
            <PTemplatePanel />
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
                    <div className="panel-body" id="product-list">
                    </div>
                    <div className="panel-footer">
                        <a href="/admin/products" className="btn btn-primary"><i className="fa fa-list"></i> Product Management</a>
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
                        <h4 className="panel-title">Catalog Templates</h4>
                    </div>
                    <div className="panel-body" id="ctemplate-list">
                    </div>
                    <div className="panel-footer">
                        <a href="/admin/templates" className="btn btn-primary"><i className="fa fa-file"></i> Catalog Template Management</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PTemplatePanel(props) {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Product Templates</h4>
                    </div>
                    <div className="panel-body" id="ptemplate-list">
                    </div>
                    <div className="panel-footer">
                        <a href="/admin/ptemplates" className="btn btn-primary"><i className="fa fa-file"></i> Product Template Management</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { renderAdmin }
