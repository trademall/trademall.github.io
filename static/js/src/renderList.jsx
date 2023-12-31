function RenderList(data) {
    const list = $('.content')[0];
    ReactDOM.render(<ProductList products={data} />, list);
}

function ImgDiv(props) {
    var imageURL = "";
    try {
        if (typeof (JSON.parse(props.image)) == "string") {
            imageURL = JSON.parse(props.image);
        } else {
            imageURL = JSON.parse(props.image)[0];
        }
        if (imageURL == "") {
            imageURL = "/img/placeholder.png"
        }
    } catch (error) {
        imageURL = "/img/placeholder.png"
        console.log(error);
    }
    return (
        <div className="image">
            <a href={"details?id=" + props.id}>
                <img src={imageURL} alt={props.name} className="img img-responsive" loading={props.loading||""} />
            </a>
        </div>
    );
}

function TextDiv(props) {
    return (
        <div className="text">
            <h4><a href={"details?id="+props.id}>{props.name}</a></h4>
            <h4 className="price" id="price"><span className="price-symbol">$</span>{props.price}</h4>
        </div >
    );
}

function ProductDiv(props) {
    return (
        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3">
            <div className="commodity">
                <ImgDiv image={props.image} name={props.name} id={props.id} loading="lazy" />
                <TextDiv name={props.name} price={props.price} id={props.id} />
            </div>
        </div>
    );
}

function ProductList(props) {
    const products = props.products;
    if (products.length == 0) {
        return (
            <div className="commodities">
                <h4 className="text-center">No products found.</h4>
            </div>
        );
    }
    
    const listItems = products.map((product) =>
        <ProductDiv key={product.id} image={product.image} name={product.name} price={product.attributes.Price} id={product.id} />
    );
    return (
        <div className="commodities">
            {listItems}
        </div>
    );
}

export { RenderList, ImgDiv, TextDiv, ProductDiv, ProductList };