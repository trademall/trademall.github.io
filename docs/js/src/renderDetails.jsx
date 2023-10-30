function RenderDetails(data) {
    const details = $('.content')[0];
    // console.log(data);
    ReactDOM.render(<ProductDetails product={data} />, details);
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
            <Pid pid={props.product.id} />

            <Pimage product={props.product} />

            <Pdescription description={props.product.detailinfo} />
        </div>
    );
}

function Pid(props) {
    return (
        <p className="text-uppercase col-xs-10 col-xs-offset-1 col-sm-12 col-md-12" id="product-id">
            item #{props.pid}
        </p>
    );
}

function Pimage(props) {
    var imageURL = "";
    try {
        imageURL = props.product.attributes.image;
    } catch (error) {
        try {
            imageURL = props.product.images;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="img-wrapper col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <img src={imageURL} alt="" className="img img-responsive" id="product-image" />
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
        <form className="col-sm-6 col-md-6 row" method="POST">
            <Customizer product={props.product} />
            <SubmitButton />
        </form>
    );
}

function Customizer(props) {
    return (
        <div id="customizer" className="card col-xs-10 col-xs-offset-1 col-sm-12 col-md-12">
            <CustomizerHeader />
            <CustomizerBody product={props.product} />
            <CustomizerFooter product={props.product} />
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
    const attrs = Object.keys(props.product.attributes);
    console.log(attrs);
    console.log(attrs[0]);
    return (
        <div className="card-body">
            {attrs.map((attr) => (
                <CustomizerOption key={attr} title={attr} option={props.product.attributes[attr]} />
            ))}
        </div>
    );
}

function CustomizerOption(props) {
    return (
        <div className="row selector color-select">
            <div className="col-md-2">
                <h4>{props.title+": "}</h4>
            </div>
            <div className="btn-group col-md-10" data-toggle="buttons">
                {Object.values(props.option).map((value) => (
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

function CustomizerFooter(props) {
    return (
        <div className="card-footer">
            <div className="row">
                <div className="col-md-12">
                    <h4>Total Price: </h4>
                    <p className="total-price">{"$"+props.price}</p>
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