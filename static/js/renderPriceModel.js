import * as PModel from './price_api.js';
import { InputBox } from './InputBox.js';
function renderPriceModel() {
  ReactDOM.render( /*#__PURE__*/React.createElement(PriceModel, null), document.getElementById('price-model'));
}
function emptyModel() {
  return {
    rate: 0.0,
    taxrate: 0.0,
    expressstrategy: 0,
    expressfee: 0.0,
    airstrategy: 0,
    airfee: 0.0,
    seastrategy: 0,
    seafee: 0.0,
    seafreightfee: 0.0,
    username: '',
    id: 0,
    created: ''
  };
}
function PriceModel() {
  const [model, setModel] = React.useState(emptyModel);
  React.useEffect(() => {
    PModel.getModel(data => {
      let curModel = data;
      setModel(curModel);
      console.log(curModel);
    }, error => {
      console.log(error);
    });
  }, []);
  function handleUpdate() {
    let data = {
      rate: Number($('#rate').val()),
      taxrate: Number($('#taxrate').val()),
      expressstrategy: Number($('#express-strategy').text().trim()),
      expressfee: Number($('#express').val()),
      airstrategy: Number($('#air-strategy').text().trim()),
      airfee: Number($('#air').val()),
      seastrategy: Number($('#sea-strategy').text().trim()),
      seafee: Number($('#sea').val()),
      seafreightfee: Number($('#seafreightfee').val()),
      username: localStorage.getItem('username')
    };
    console.log(data);
    PModel.createModel(data, data => {
      alert('Update Success!');
      location.reload();
      // setModel(data);
    }, error => {
      console.log(error);
      alert('Update Failed: ' + error);
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Price Model")), /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement(InputBox, {
    label: "Exchange Rate",
    id: "rate",
    value: model.rate,
    required: true,
    type: "number",
    name: "rate",
    onChange: e => {
      setModel({
        ...model,
        rate: Number(e.target.value)
      });
    }
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Tax Rate",
    id: "taxrate",
    value: model.taxrate,
    required: true,
    type: "number",
    name: "taxrate",
    onChange: e => {
      setModel({
        ...model,
        taxrate: Number(e.target.value)
      });
    }
  }), /*#__PURE__*/React.createElement(DeliverGroup, {
    label: "Express",
    id: "express",
    value: model.expressstrategy,
    strategy: model.expressstrategy,
    fee: model.expressfee
  }), /*#__PURE__*/React.createElement(DeliverGroup, {
    label: "Air",
    id: "air",
    value: model.airstrategy,
    strategy: model.airstrategy,
    fee: model.airfee
  }), /*#__PURE__*/React.createElement(DeliverGroup, {
    label: "Sea",
    id: "sea",
    value: model.seastrategy,
    strategy: model.seastrategy,
    fee: model.seafee
  }), /*#__PURE__*/React.createElement(InputBox, {
    label: "Sea Freight Fee",
    id: "seafreightfee",
    value: model.seafreightfee,
    required: true,
    type: "number",
    name: "seafreightfee",
    onChange: e => {
      setModel({
        ...model,
        seafreightfee: e.target.value
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: handleUpdate
  }, "Update"))));
}
function DeliverGroup(props) {
  const deliver = props;
  const [fee, setFee] = React.useState(deliver.fee);
  React.useEffect(() => {
    setFee(deliver.fee);
  }, [deliver.fee]);
  return /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, deliver.label), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group-btn"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-default dropdown-toggle",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    id: deliver.id + '-strategy'
  }, deliver.strategy, " ", /*#__PURE__*/React.createElement("span", {
    className: "caret"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-menu"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: () => {
      $('#' + deliver.id + '-strategy').html('0 <span class="caret"></span>');
    }
  }, "Strategy 0")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: () => {
      $('#' + deliver.id + '-strategy').html('1 <span class="caret"></span>');
    }
  }, "Strategy 1")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: () => {
      $('#' + deliver.id + '-strategy').html('2 <span class="caret"></span>');
    }
  }, "Strategy 2")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: () => {
      $('#' + deliver.id + '-strategy').html('3 <span class="caret"></span>');
    }
  }, "Strategy 3")))), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-control",
    id: deliver.id,
    value: fee,
    onChange: e => {
      setFee(e.target.value);
    }
  }))));
}
export { renderPriceModel };