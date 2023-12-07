import * as PModel from './price_api.js';
import { InputBox } from './InputBox.js';

function renderPriceModel() {
    ReactDOM.render(
        <>
            <PriceModel />
            <StageManage />
        </>,
        document.getElementById('price-model')
    );
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
        created: '',
    }
}

function PriceModel() {
    const [model, setModel] = React.useState(emptyModel);
    React.useEffect(() => {
        PModel.getModel((data) => {
            let curModel = data;
            setModel(curModel);
            console.log(curModel);
        }, (error) => {
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
            username: localStorage.getItem('username'),
        };
        console.log(data);
        PModel.createModel(data, (data) => {
            alert('Update Success!');
            location.reload();
            // setModel(data);
        }, (error) => {
            console.log(error);
            alert('Update Failed: ' + error);
        });
    }

    return (
        <div className="row">
            <div className="col-sm-12 heading">
                <h3>Price Model</h3>
            </div>
            <div className="col-md-12">
                <InputBox label="Exchange Rate" id="rate" value={model.rate} required={true} type="number" name="rate" onChange={(e) => { setModel({ ...model, rate: Number(e.target.value) }); }} />
                <InputBox label="Tax Rate" id="taxrate" value={model.taxrate} required={true} type="number" name="taxrate" onChange={(e) => { setModel({ ...model, taxrate: Number(e.target.value) }); }} />

                <DeliverGroup label="Express" id="express" value={model.expressstrategy} strategy={model.expressstrategy} fee={model.expressfee} />
                <DeliverGroup label="Air" id="air" value={model.airstrategy} strategy={model.airstrategy} fee={model.airfee} />
                <DeliverGroup label="Sea" id="sea" value={model.seastrategy} strategy={model.seastrategy} fee={model.seafee} />
                <InputBox label="Sea Freight Fee" id="seafreightfee" value={model.seafreightfee} required={true} type="number" name="seafreightfee" onChange={(e) => { setModel({ ...model, seafreightfee: e.target.value }); }} />
                <div className="col-sm-12 text-center">
                    <button className="btn btn-primary btn-lg" onClick={handleUpdate}>Update</button>
                </div>

            </div>
        </div>
    );
}

function DeliverGroup(props) {
    const deliver = props;
    const [fee, setFee] = React.useState(deliver.fee);
    React.useEffect(() => {
        setFee(deliver.fee);
    }, [deliver.fee]);
    return (
            <div className="col-md-10 col-md-offset-1">
                <div className='form-group'>
                <label>{deliver.label}</label>
                    <div className='input-group'>
                        <div className="input-group-btn">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id={deliver.id + '-strategy'}>
                            {deliver.strategy} <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                            <li><a href="#" onClick={() => { $('#' + deliver.id + '-strategy').html('0 <span class="caret"></span>'); }}>Strategy 0</a></li>
                            <li><a href="#" onClick={() => { $('#' + deliver.id + '-strategy').html('1 <span class="caret"></span>'); }}>Strategy 1</a></li>
                            <li><a href="#" onClick={() => { $('#' + deliver.id + '-strategy').html('2 <span class="caret"></span>'); }}>Strategy 2</a></li>
                            <li><a href="#" onClick={() => { $('#' + deliver.id + '-strategy').html('3 <span class="caret"></span>'); }}>Strategy 3</a></li>
                            </ul>
                        </div>
                    <input type="number" className="form-control" id={deliver.id} value={fee} onChange={(e) => { setFee(e.target.value); }} />
                    </div>
                </div>
            </div>
    );
}

// TODO: Stage Manage
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
        },]
    });
    const [stageList, setStageList] = React.useState([]);
    React.useEffect(() => {
        PModel.getStageList(type, (data) => {
            let curStage = data;
            setStageList(curStage.list);
            setStage(curStage);
            console.log(curStage);
        }, (error) => {
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
                },]
            });
            setStageList([]);
        });
    }, []);

    function handleTypeChange(e) {
        setType(Number(e.target.querySelector('input').value)+1);
        PModel.getStageList(Number(e.target.querySelector('input').value)+1, (data) => {
            let curStage = data;
            setStage(curStage);
            setStageList(curStage.list);
            console.log(curStage);
        }, (error) => {
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
        newStage.find((item) => { return item.id === Number(e.target.parentNode.dataset.id); }).start = Number(e.target.value);
        setStage({ ...stage, list: newStage });
    }

    function handleEndChange(e) {
        let newStage = stage.list;
        newStage.find((item) => { return item.id === Number(e.target.parentNode.dataset.id); }).to = Number(e.target.value);
        setStage({ ...stage, list: newStage });
    }

    function handlePriceChange(e) {
        let newStage = stage.list;
        newStage.find((item) => { return item.id === Number(e.target.parentNode.dataset.id); }).price = Number(e.target.value);
        setStage({ ...stage, list: newStage });
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
        setStage({ ...stage, list: [...stage.list, newStage], total: stage.total + 1 });
    }

    function deleteLastStage() {
        let newStage = stage.list;
        if (newStage.length === 1) {
            alert('Cannot delete the last stage!');
            return;
        }
        newStage.pop();
        setStage({ ...stage, list: newStage, total: stage.total - 1 });
    }

    function handleUpdate() {
        let newStage = {
            username: localStorage.getItem('username'),
            list: stage.list
        };
        let deleted = 0;
        if (stageList.length === 0) {
            let created = 0;
            for (let i = 0; i < newStage.list.length; i++) {
                PModel.createStage(newStage.list[i], (data) => {
                    created++;
                    if (created === newStage.list.length) {
                        alert('Update Success!');
                        location.reload();
                        return;
                    }
                }, (error) => {
                    console.log(error);
                    alert('Update Failed: ' + error);
                    return;
                });
            }
        }
        for (let i = 0; i < stageList.length; i++) {
            PModel.deleteStage(Number(stageList[i].id), (data) => {
                deleted++;
                if (deleted === stageList.length) {
                    let updated = 0;
                    for (let i = 0; i < newStage.list.length; i++) {
                        PModel.createStage(newStage.list[i], (data) => {
                            updated++;
                            if (updated === newStage.list.length) {
                                alert('Update Success!');
                                location.reload();
                            }
                        }, (error) => {
                            console.log(error);
                            alert('Update Failed: ' + error);
                        });
                    }
                }
            }, (error) => {
                console.log(error);
                alert('Update Failed: ' + error);
            });
        }
    }
    
    return (
        <div className="row">
            <div className="col-md-10 col-md-offset-1 heading">
                <h3>Stage Manage</h3>
            </div>
            <div className="col-md-10 col-md-offset-1">
                <div className='alert alert-info'>
                    <p>The start of next stage should be the <strong>SAME</strong> as the end of previous stage!</p>
                </div>
                <div className='btn-group-justified mb-small' data-toggle="buttons" onClick={handleTypeChange}>
                <label className='btn btn-default active'>
                        <input type='radio' name='stage-type' value='0' autocomplete="off" /> Express
                </label>
                <label className='btn btn-default'>
                        <input type='radio' name='stage-type' value='1' autocomplete="off" /> Air Exp
                </label>
                <label className='btn btn-default'>
                        <input type='radio' name='stage-type' value='2' autocomplete="off" /> Sea Exp
                </label>
                <label className='btn btn-default'>
                        <input type='radio' name='stage-type' value='3' autocomplete="off" /> Sea <span className='hidden-xs'>Freight</span><span className='visible-xs-inline'>Frt</span>
                    </label>
                    </div>
            </div>
            <div className="col-xs-12 vertical-center">
                <div className='col-xs-11 col-sm-9 col-sm-offset-1 row'>
                    <div className='form-group'>
                        {
                            stage.list.map((item, index) => {
                                return (
                                    <div className='input-group mb-xs' key={index} data-id={item.id}>
                                        <span className='input-group-addon'>{'S'+(index+1)}: </span>
                                        <input type="number" className="form-control" id={'stage-' + index + '-start'} value={item.start} onChange={handleStartChange} />
                                        <span className='input-group-addon'>to</span>
                                        <input type="number" className="form-control" id={'stage-' + index + '-to'} value={item.to} onChange={handleEndChange} />
                                        <span className='input-group-addon'><span className='hidden-xs'>Price</span><span className='visible-xs-inline'>$</span></span>
                                        <input type="number" className="form-control" id={'stage-' + index + '-price'} value={item.price} onChange={handlePriceChange} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-xs-2 col-sm-1">
                    <button className="btn btn-primary" onClick={handleNewStage}>+</button>
                    <button className="btn btn-danger" onClick={deleteLastStage}>-</button>
                </div>
            </div>
            <div className="col-xs-12 text-center">
                <button className="btn btn-primary btn-lg" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
}

export { renderPriceModel };