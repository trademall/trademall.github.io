import * as PModel from './price_api.js';
import { InputBox } from './InputBox.js';

function renderPriceModel() {
    ReactDOM.render(
        <PriceModel />,
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

export { renderPriceModel };