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
                        <li className={window.location.pathname === '/admin/templates/' ? 'active' : ''}>
                            <a href="/admin/templates/"><i className="fa fa-file">&nbsp;</i><span className="hidden-sm">Templates</span></a>
                        </li>
                        <li className={window.location.pathname === '/admin/ptemplates/' ? 'active' : ''}>
                            <a href="/admin/ptemplates/"><i className="fa fa-file">&nbsp;</i><span className="hidden-sm">Product Templates</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export { Sidebar }