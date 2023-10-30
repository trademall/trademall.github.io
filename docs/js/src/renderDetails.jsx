function RenderDetails(data) {
    const details = $('.content')[0];
    console.log(data);
    ReactDOM.render(<ProductDetails product={data} />, details);
}

function ProductDetails(props) {
    return (
        <div className="row details">
            <LeftColumn product={props} />
            <RightColumn product={props} />
        </div>
    );
}

function LeftColumn(props) {
    return (
        <div className="row col-sm-6 col-md-6">
            <Pid product={props.id} />

            <Pimage product={props.attributes.image} name={props.name} id={props.id} alt="{props.name}" />

            <Pdescription product={props.detailinfo} />
        </div>
    );
}

function Pid(props) {
    return (
        <p className="text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12" id="product-id">
            item #{props}
        </p>
    );
}

function Pimage(props) {
    return (
        <div className="img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <img src={props} alt="" className="img img-responsive" id="product-image" />
        </div>
    );
}

function Pdescription(props) {
    return (
        <div className="description col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <h4>PRODUCT DETAILS.</h4>
            <p id="product-info">
                {props}
            </p>
        </div>
    );
}

function RightColumn(props) {
    return (
        <form className="col-sm-6 col-md-6 row" method="POST">
            <Customizer product={props} />
            <SubmitButton />
        </form>
    );
}

function Customizer(props) {
    return (
        <div id="customizer" className="card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <CustomizerHeader />
            <CustomizerBody product={props} />
            <CustomizerFooter />
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
    return (
        <div className="card-body">
            {props.product.attributes.map((option) => (
                <CustomizerOption key={option.name} option={option} />
            ))}
        </div>
    );
}

function CustomizerOption(props) {
    return (
        <div className="row selector color-select">
            <div className="col-md-2">
                <h4>{props.option.name}: </h4>
            </div>
            <div className="btn-group col-md-10" data-toggle="buttons">
                {props.option.values.map((value) => (
                    <CustomizerValue key={value} value={value} />
                ))}
            </div>
        </div>
    );
}

function CustomizerValue(props) {
    return (
        <label className="btn btn-default col-md-3">
            <input type="radio" name="color" id="color1" autocomplete="off" /> {props.value}
        </label>
    );
}

function CustomizerFooter() {
    return (
        <div className="card-footer">
            <div className="row">
                <div className="col-md-12">
                    <h4>Total Price: </h4>
                    <p className="total-price">$0.00</p>
                </div>
            </div>
        </div>
    );
}

function SubmitButton() {
    return (
        <button type="submit" className="btn btn-lg btn-template-main col-xs-10 col-xs-offset-1  col-sm-12">
            <i className="fa fa-cart-plus"></i> add to cart!
        </button>
    );
}

export { RenderDetails };