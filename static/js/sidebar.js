function Sidebar(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-1 col-md-2 mysidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel panel-default sidebar-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-heading"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "sidebar-title hidden-sm"
  }, "Pages")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav nav-pills nav-stacked"
  }, /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-home"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Home"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/users/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/users/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-user"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Users"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/products/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/products/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-cubes"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Products"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/templates/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/templates/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-print"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Catalog Templates"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/ptemplates/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/ptemplates/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-database"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Product Templates"))), /*#__PURE__*/React.createElement("li", {
    className: window.location.pathname === '/admin/price-model/' ? 'active' : ''
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/price-model/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-chart-line"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "hidden-sm"
  }, "Price Model")))))));
}
export { Sidebar };