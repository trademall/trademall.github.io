import { getPrice } from "./product_api.js";
import { getPStageList } from "./pstage_api.js";
// import { submit } from "./details.js";

function RenderDetails(data, callback) {
  const details = $('.content')[0];
  // console.log(data);
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductDetails, {
    product: data
  }), details, callback);
  initCustomizer();
}
function ProductDetails(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row details"
  }, /*#__PURE__*/React.createElement(LeftColumn, {
    product: props.product
  }), /*#__PURE__*/React.createElement(RightColumn, {
    product: props.product
  }));
}
function LeftColumn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row col-sm-6 col-md-6"
  }, /*#__PURE__*/React.createElement(Pname, {
    pname: props.product.name
  }), /*#__PURE__*/React.createElement(Pimage, {
    product: props.product
  }), /*#__PURE__*/React.createElement(Pdescription, {
    description: props.product.detailinfo
  }));
}
function Pname(props) {
  return /*#__PURE__*/React.createElement("p", {
    className: "text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12",
    id: "product-id"
  }, "item #", props.pname);
}
function Pimage(props) {
  const imageURL = JSON.parse(props.product.image);
  const [main, setMain] = React.useState(imageURL[0]);
  const handleImgChange = event => {
    setMain(event.target.src);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "img-main"
  }, /*#__PURE__*/React.createElement("img", {
    src: main,
    alt: "",
    className: "img img-responsive",
    id: "product-image"
  })), /*#__PURE__*/React.createElement("div", {
    className: "img-sub row"
  }, imageURL.map(url => /*#__PURE__*/React.createElement("div", {
    className: "col-xs-4 col-sm-3 col-md-3"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "product-image",
    className: "img-label",
    onClick: handleImgChange
  }, /*#__PURE__*/React.createElement("img", {
    src: url,
    alt: "",
    className: "img img-responsive"
  }))))));
}
function Pdescription(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "description col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement("h4", null, "PRODUCT DETAILS."), /*#__PURE__*/React.createElement("p", {
    id: "product-info"
  }, props.description));
}
function RightColumn(props) {
  return /*#__PURE__*/React.createElement("form", {
    className: "col-sm-6 col-md-6 row"
  }, /*#__PURE__*/React.createElement(Customizer, {
    product: props.product
  }), /*#__PURE__*/React.createElement(SubmitButton, {
    pid: props.product.id
  }), /*#__PURE__*/React.createElement(LoginAlert, null), /*#__PURE__*/React.createElement(SubmitAlert, null), /*#__PURE__*/React.createElement(ErrorAlert, null));
}
function Customizer(props) {
  const [num, setNum] = React.useState(1);
  const [price, setPrice] = React.useState({
    "express": 0.00,
    "airexpress": 0.00,
    "seaexpress": 0.00,
    "seatrans": 0.00
  });
  const initPrice = () => {
    getPrice(Number(props.product.id), 1, setPrice);
  };
  React.useEffect(initPrice, []);
  return /*#__PURE__*/React.createElement("div", {
    id: "customizer",
    className: "card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12"
  }, /*#__PURE__*/React.createElement(CustomizerHeader, null), /*#__PURE__*/React.createElement(CustomizerBody, {
    product: props.product,
    num: num,
    setNum: setNum,
    price: price,
    setPrice: setPrice
  }), /*#__PURE__*/React.createElement(CustomizerFooter, {
    price: price
  }));
}
function CustomizerHeader() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-header heading"
  }, /*#__PURE__*/React.createElement("h4", null, "Product options."));
}
function CustomizerBody(props) {
  const attrs = Object.keys(props.product.attributes);
  let trigger = false;
  let timer = null;
  const handleNumChange = event => {
    props.setNum(event.target.value);
    console.log(trigger);
    trigger ? clearTimeout(timer) : trigger = true;
    timer = setTimeout(() => {
      getPrice(Number(props.product.id), Number(event.target.value), props.setPrice);
    }, 500);
  };
  const handleTableClick = event => {
    props.setNum(event.target.innerText);
    getPrice(Number(props.product.id), Number(event.target.innerText), props.setPrice);
  };
  const [price, setPrice] = React.useState({
    1: 0.00
  });
  React.useEffect(() => {
    let stages = {};
    let stage = {};
    let stageNum = 1;
    getPStageList(Number(props.product.id), data => {
      stageNum = data.total;
      data.list.forEach(item => {
        getPrice(Number(props.product.id), Number(item.start), data => {
          let shipping = document.querySelector('.shipping-selector label.active input').id;
          stage[item.start] = data[shipping];
          stages[item.start] = data;
          stageNum--;
          if (stageNum === 0) {
            setPrice(stage);
            console.log(stages);
          }
        });
      });
      console.log(data);
    });
    $('.shipping-selector label').click(event => {
      let shipping = event.target.querySelector('input').id;
      console.log(shipping);
      let stage = {};
      for (let key in stages) {
        stage[key] = stages[key][shipping];
      }
      setPrice(stage);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, attrs.map(attr => /*#__PURE__*/React.createElement(CustomizerOption, {
    key: attr,
    title: attr,
    option: props.product.attributes[attr]
  })), /*#__PURE__*/React.createElement(CustomizerOption, {
    title: "Shipping",
    option: ["express", "airexpress", "seaexpress", "seatrans"]
  }), /*#__PURE__*/React.createElement(StageTable, {
    price: price,
    onClick: handleTableClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "row selector"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-3"
  }, /*#__PURE__*/React.createElement("h4", null, "Quantity: ")), /*#__PURE__*/React.createElement("div", {
    className: "col-md-9"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "quantity",
    className: "active"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-control",
    id: "quantity",
    name: "quantity",
    min: "1",
    value: props.num,
    onChange: handleNumChange
  })))));
}
function StageTable(props) {
  const price = props.price;
  return /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-hover table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Quantity"), Object.keys(price).map(key => /*#__PURE__*/React.createElement("th", {
    key: key,
    className: "text-center",
    onClick: props.onClick,
    style: {
      cursor: "pointer"
    }
  }, key)))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "text-center"
  }, "Price"), Object.keys(price).map(key => /*#__PURE__*/React.createElement("td", {
    key: key,
    className: "text-center"
  }, "$", price[key].toFixed(2)))))));
}
function CustomizerOption(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row selector " + props.title.toLowerCase() + "-selector"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-3"
  }, /*#__PURE__*/React.createElement("h4", null, props.title + ": ")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group col-md-9",
    "data-toggle": "buttons"
  }, Object.values(props.option).map(value => /*#__PURE__*/React.createElement(CustomizerValue, {
    key: value,
    value: value
  }))));
}
function CustomizerValue(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: props.value,
    id: props.value,
    autocomplete: "off"
  }), " ", props.value);
}
function CustomizerFooter(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("h4", null, "Total Price: "), Object.keys(props.price).map(key => /*#__PURE__*/React.createElement("div", {
    className: "total-price col-xs-12",
    key: key,
    style: {
      transition: "all 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6"
  }, /*#__PURE__*/React.createElement("p", {
    key: key,
    className: "text-uppercase text-left"
  }, key, ": ")), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-6"
  }, /*#__PURE__*/React.createElement("p", {
    key: key,
    className: "text-uppercase text-right"
  }, "$", /*#__PURE__*/React.createElement("strong", null, props.price[key].toFixed(2)))))))));
}
function SubmitButton(props) {
  return /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-template-main col-xs-10 col-xs-offset-1 col-sm-12",
    id: "submitBtn",
    "data-id": props.pid
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-cart-plus"
  }), " ", /*#__PURE__*/React.createElement("span", null, " add to cart!"));
}
function LoginAlert() {
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-warning col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Please ", /*#__PURE__*/React.createElement("a", {
    href: "/login"
  }, "LOGIN"), " first!"));
}
function ErrorAlert() {
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Something went wrong!"));
}
function SubmitAlert() {
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-success col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden",
    role: "alert"
  }, /*#__PURE__*/React.createElement("strong", null, "Successfully added to cart!"));
}
function initCustomizer() {
  const selectors = document.querySelectorAll('.selector');
  for (let i = 0; i < selectors.length; i++) {
    const selector = selectors[i];
    const radios = selector.querySelectorAll('input[type="radio"]');
    radios[0].click();
  }
}
export { RenderDetails };