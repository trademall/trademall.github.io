import * as PModel from './price_api.js';
import { Sidebar } from "./sidebar.js";
import { InputBox } from './InputBox.js';
function renderPriceModel() {
  ReactDOM.render( /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-10"
  }, /*#__PURE__*/React.createElement(PriceModel, null), /*#__PURE__*/React.createElement(StageManage, null))), document.getElementById('price-model'));
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
      // console.log(curModel);
    }, error => {
      console.log(error);
    });
  }, []);
  function handleUpdate() {
    $('#updateModel').attr('disabled', true);
    $('#updateModel').html('Updating...');
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
    // console.log(data);
    PModel.createModel(data, data => {
      $('#updateModel').attr('disabled', false);
      $('#updateModel').html('Update');
      alert('Update Success!');
      location.reload();
      // setModel(data);
    }, error => {
      console.log(error);
      $('#updateModel').attr('disabled', false);
      $('#updateModel').html('Update');
      alert('Update Failed: ' + error);
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row mb-small"
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
    onClick: handleUpdate,
    id: "updateModel"
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

//---------------------Stage Manage---------------------

function StageManage() {
  const [type, setType] = React.useState(1);
  const [stage, setStage] = React.useState({
    total: 1,
    list: [{
      id: 0,
      deliverytype: 1,
      start: 1,
      to: 999999,
      price: 0.0,
      username: '',
      created: ''
    }]
  });
  const [stageList, setStageList] = React.useState([]);
  React.useEffect(() => {
    PModel.getStageList(type, data => {
      let curStage = data;
      setStageList(curStage.list);
      setStage(curStage);
    }, error => {
      alert(error);
      setStage({
        total: 1,
        list: [{
          id: 0,
          deliverytype: type,
          start: 1,
          to: 999999,
          price: 0.0,
          username: '',
          created: ''
        }]
      });
      setStageList([]);
    });
  }, []);
  function handleTypeChange(e) {
    setType(Number(e.target.querySelector('input').value) + 1);
    PModel.getStageList(Number(e.target.querySelector('input').value) + 1, data => {
      let curStage = data;
      setStage(curStage);
      setStageList(curStage.list);
    }, error => {
      alert(error);
      setStage({
        total: 1,
        list: [{
          id: 0,
          deliverytype: Number(e.target.querySelector('input').value) + 1,
          start: 1,
          to: 999999,
          price: 0.0,
          username: '',
          created: ''
        }]
      });
      setStageList([]);
    });
  }
  function handleStartChange(e) {
    let newStage = stage.list;
    newStage.find(item => {
      return item.id === Number(e.target.parentNode.dataset.id);
    }).start = Number(e.target.value) === 0 ? null : Number(e.target.value);
    setStage({
      ...stage,
      list: newStage
    });
  }
  function handleEndChange(e) {
    let newStage = stage.list;
    newStage.find(item => {
      return item.id === Number(e.target.parentNode.dataset.id);
    }).to = Number(e.target.value) === 0 ? null : Number(e.target.value);
    setStage({
      ...stage,
      list: newStage
    });
  }
  function handlePriceChange(e) {
    let newStage = stage.list;
    newStage.find(item => {
      return item.id === Number(e.target.parentNode.dataset.id);
    }).price = Number(e.target.value) === 0 ? null : Number(e.target.value);
    setStage({
      ...stage,
      list: newStage
    });
  }
  function handleNewStage() {
    let newStage = {
      id: 0,
      deliverytype: type,
      start: stage.list[stage.list.length - 1].to,
      to: 999999,
      price: stage.list[stage.list.length - 1].price,
      username: localStorage.getItem('username'),
      created: ''
    };
    setStage({
      ...stage,
      list: [...stage.list, newStage],
      total: stage.total + 1
    });
  }
  function deleteLastStage() {
    let newStage = stage.list;
    if (newStage.length === 1) {
      alert('Cannot delete the last stage!');
      return;
    }
    newStage.pop();
    setStage({
      ...stage,
      list: newStage,
      total: stage.total - 1
    });
  }
  function handleUpdate() {
    let newStage = {
      username: localStorage.getItem('username'),
      list: stage.list
    };
    $('#updateStage').attr('disabled', true);
    $('#updateStage').html('Updating...');
    let deleted = 0;
    if (stageList.length === 0) {
      let created = 0;
      for (let i = 0; i < newStage.list.length; i++) {
        PModel.createStage(newStage.list[i], data => {
          created++;
          if (created === newStage.list.length) {
            $('#updateStage').attr('disabled', false);
            $('#updateStage').html('Update');
            alert('Update Success!');
            location.reload();
            return;
          }
        }, error => {
          console.log(error);
          $('#updateStage').attr('disabled', false);
          $('#updateStage').html('Update');
          alert('Update Failed: ' + error);
          return;
        });
      }
    }
    for (let i = 0; i < stageList.length; i++) {
      PModel.deleteStage(Number(stageList[i].id), data => {
        deleted++;
        if (deleted === stageList.length) {
          let updated = 0;
          for (let i = 0; i < newStage.list.length; i++) {
            PModel.createStage(newStage.list[i], data => {
              updated++;
              if (updated === newStage.list.length) {
                $('#updateStage').attr('disabled', false);
                $('#updateStage').html('Update');
                alert('Update Success!');
                location.reload();
              }
            }, error => {
              console.log(error);
              $('#updateStage').attr('disabled', false);
              $('#updateStage').html('Update');
              alert('Update Failed: ' + error);
            });
          }
        }
      }, error => {
        console.log(error);
        $('#updateStage').attr('disabled', false);
        $('#updateStage').html('Update');
        alert('Update Failed: ' + error);
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row mb-small"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12 heading"
  }, /*#__PURE__*/React.createElement("h3", null, "Stage Manage")), /*#__PURE__*/React.createElement("div", {
    className: "col-md-10 col-md-offset-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info"
  }, /*#__PURE__*/React.createElement("p", null, "The start of next stage should be the ", /*#__PURE__*/React.createElement("strong", null, "SAME"), " as the end of previous stage!")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group-justified mb-small",
    "data-toggle": "buttons",
    onClick: handleTypeChange
  }, /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default active"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "stage-type",
    value: "0",
    autocomplete: "off"
  }), " Express"), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "stage-type",
    value: "1",
    autocomplete: "off"
  }), " Air Exp"), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "stage-type",
    value: "2",
    autocomplete: "off"
  }), " Sea Exp"), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-default"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "stage-type",
    value: "3",
    autocomplete: "off"
  }), " Sea ", /*#__PURE__*/React.createElement("span", {
    className: "hidden-xs"
  }, "Freight"), /*#__PURE__*/React.createElement("span", {
    className: "visible-xs-inline"
  }, "Frt")))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 vertical-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-xs-11 col-sm-9 col-sm-offset-1 row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, stage.list.map((item, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "input-group mb-xs",
      key: index,
      "data-id": item.id
    }, /*#__PURE__*/React.createElement("span", {
      className: "input-group-addon"
    }, 'S' + (index + 1), ": "), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      id: 'stage-' + index + '-start',
      value: item.start,
      onChange: handleStartChange
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-addon"
    }, "to"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      id: 'stage-' + index + '-to',
      value: item.to,
      onChange: handleEndChange
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-addon"
    }, /*#__PURE__*/React.createElement("span", {
      className: "hidden-xs"
    }, "Price"), /*#__PURE__*/React.createElement("span", {
      className: "visible-xs-inline"
    }, "$")), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-control",
      id: 'stage-' + index + '-price',
      value: item.price,
      onChange: handlePriceChange
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-2 col-sm-1"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleNewStage
  }, "+"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: deleteLastStage
  }, "-"))), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-12 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: handleUpdate,
    id: "updateStage"
  }, "Update")));
}
export { renderPriceModel };