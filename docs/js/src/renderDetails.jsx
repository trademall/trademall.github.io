import { getPrice } from "./product_api.js";
import { getPStageList } from "./pstage_api.js";
// import { submit } from "./details.js";

function RenderDetails(data, callback) {
    const details = $('.content')[0];
    // console.log(data);
    ReactDOM.render(<ProductDetails product={data} />, details, callback);
    initCustomizer();
}

function ProductDetails(props) {
    return (
        <div className="row details">
            <LeftColumn product={props.product} />
            <RightColumn product={props.product} />
        </div>
    );
}

function LeftColumn(props) {
    return (
        <div className="row col-sm-6 col-md-6">
            <Pname pname={props.product.name} />

            <Pimage product={props.product} />

            <Pdescription description={props.product.detailinfo} />
        </div>
    );
}

function Pname(props) {
    return (
        <p className="text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12" id="product-id">
            item #{props.pname}
        </p>
    );
}

function Pimage(props) {
    const imageURL = JSON.parse(props.product.image);
    const [main, setMain] = React.useState(imageURL[0]);
    const handleImgChange = (event) => {
        setMain(event.target.src);
    };
    return (
        <div className="img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <div className="img-main">
                <img src={main} alt="" className="img img-responsive" id="product-image" />
            </div>
            <div className="img-sub row">
                {imageURL.map((url) => (
                    <div className="col-xs-4 col-sm-3 col-md-3">
                        <label htmlFor="product-image" className="img-label" onClick={handleImgChange}>
                            <img src={url} alt="" className="img img-responsive" />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Pdescription(props) {
    return (
        <div className="description col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <h4>PRODUCT DETAILS.</h4>
            <p id="product-info">
                {props.description}
            </p>
        </div>
    );
}

function RightColumn(props) {
    return (
        <form className="col-sm-6 col-md-6 row">
            <Customizer product={props.product} />
            <SubmitButton pid={props.product.id} />
            <LoginAlert />
            <SubmitAlert />
            <ErrorAlert />
        </form>
    );
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

    return (
        <div id="customizer" className="card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <CustomizerHeader />
            <CustomizerBody product={props.product} num={num} setNum={setNum} price={price} setPrice={setPrice} />
            <CustomizerFooter price={price} />
        </div>
    );
}

function CustomizerHeader() {
    return (
        <div className="card-header heading">
            <h4>Product options.</h4>
        </div>
    );
}

function CustomizerBody(props) {
    const attrs = Object.keys(props.product.attributes).filter((attr) => attr !== "Price");
    let trigger = false;
    let timer = null;
    const handleNumChange = (event) => {
        props.setNum(event.target.value);
        console.log(trigger);
        trigger ? clearTimeout(timer) : trigger = true;
        timer = setTimeout(() => {
            getPrice(Number(props.product.id), Number(event.target.value), props.setPrice);
        }, 500);
    };
    const handleTableClick = (event) => {
        props.setNum(event.target.innerText);
        getPrice(Number(props.product.id), Number(event.target.innerText), props.setPrice);
    }
    const [price, setPrice] = React.useState({
        1: 0.00,
    });
    React.useEffect(() => {
        let stages = {};
        let stage = {};
        let stageNum = 1;
        getPStageList(Number(props.product.id), (data) => {
            stageNum = data.total;
            data.list.forEach((item) => {
                getPrice(Number(props.product.id), Number(item.start), (data) => {
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
        $('.shipping-selector label').click((event) => {
            let shipping = event.target.querySelector('input').id;
            console.log(shipping);
            let stage = {};
            for (let key in stages) {
                stage[key] = stages[key][shipping];
            }
            setPrice(stage);
        });
    }, []);

    return (
        <div className="card-body">
            {attrs.map((attr) => (
                <CustomizerOption key={attr} title={attr} option={props.product.attributes[attr]} />
            ))}
            <CustomizerOption title="Shipping" option={["express", "airexpress", "seaexpress", "seatrans"]} />
            <div className="row selector">
                <div className="col-md-5">
                    <h4>Ship to Zipcode: </h4>
                </div>
                <div className="col-md-7">
                    <label htmlFor="zipcode" className="active">
                        <input type="text" className="form-control" id="zipcode" name="zipcode" required />
                    </label>
                </div>
            </div>
            <div className="row selector">
                <div className="col-md-4">
                    <h4>Lead Time: </h4>
                </div>
                <div className="col-md-8">
                    <label htmlFor="leadtime" className="active input-group">
                        <input type="number" className="form-control" id="leadtime" name="leadtime" required />
                        <span className="input-group-addon">days</span>
                    </label>
                </div>
            </div>
            <StageTable price={price} onClick={handleTableClick} />
            <div className="row selector">
                <div className="col-md-3">
                    <h4>Quantity: </h4>
                </div>
                <div className="col-md-9">
                    <label htmlFor="quantity" className="active">
                        <input type="number" className="form-control" id="quantity" name="quantity" min="1" value={props.num} onChange={handleNumChange} readOnly/>
                    </label>
                </div>
            </div>
        </div>
    );
}

function StageTable(props) {
    const price = props.price;
    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        {Object.keys(price).map((key) => (
                            <th key={key} className="text-center" onClick={props.onClick} style={{ cursor: "pointer" }}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">Price</td>
                        {Object.keys(price).map((key) => (
                            <td key={key} className="text-center">${price[key].toFixed(2)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function CustomizerOption(props) {
    return (
        <div className={"row selector " + props.title.toLowerCase() + "-selector"}>
            <div className="col-md-3">
                <h4>{props.title + ": "}</h4>
            </div>
            <div className="btn-group col-md-9" data-toggle="buttons">
                {Object.values(props.option).map((value) => (
                    <CustomizerValue key={value} value={value} />
                ))}
            </div>
        </div>
    );
}

function CustomizerValue(props) {
    return (
        <label className="btn btn-default">
            <input type="radio" name={props.value} id={props.value} autocomplete="off" /> {props.value}
        </label>
    );
}

function CustomizerFooter(props) {
    return (
        <div className="card-footer">
            <div className="row">
                <div className="col-md-12">
                    <h4>Total Price: </h4>
                    {Object.keys(props.price).map((key) => (
                        <div className="total-price col-xs-12" key={key} style={{ transition: "all 0.3s ease" }}>
                            <div className="col-xs-6">
                                <p key={key} className="text-uppercase text-left">{key}: </p>
                            </div>
                            <div className="col-xs-6">
                                <p key={key} className="text-uppercase text-right">$<strong>{props.price[key].toFixed(2)}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SubmitButton(props) {
    return (
        <button type="submit" className="btn btn-lg btn-template-main col-xs-10 col-xs-offset-1 col-sm-12" id="submitBtn" data-id={props.pid}>
            <i className="fa fa-cart-plus"></i> <span> add to cart!</span>
        </button>
    );
}

function LoginAlert() {
    return (
        <div className="alert alert-warning col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden" role="alert">
            <strong>Please <a href="/login">LOGIN</a> first!</strong>
        </div>
    );
}

function ErrorAlert() {
    return (
        <div className="alert alert-danger col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden" role="alert">
            <strong>Something went wrong!</strong>
        </div>
    );
}

function SubmitAlert() {
    return (
        <div className="alert alert-success col-xs-10 col-xs-offset-1 col-sm-12 col-md-12 hidden" role="alert">
            <strong>Successfully added to cart!</strong>
        </div>
    );
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