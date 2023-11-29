function RenderList(data) {
    const list = $('.content')[0];
    ReactDOM.render(<ProductList products={data} />, list);
}

function ImgDiv(props) {
    var imageURL = "";
    try {
        imageURL = JSON.parse(props.image)[0];
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="image">
            <a href={"details?id=" + props.id}>
                <img src={imageURL} alt={props.name} className="img-responsive" loading="lazy"/>
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
                <ImgDiv image={props.image} name={props.name} id={props.id} />
                <TextDiv name={props.name} price={props.price} id={props.id} />
            </div>
        </div>
    );
}

function ProductList(props) {
    const products = props.products.list;
    const listItems = products.map((product) =>
        <ProductDiv key={product.id} image={product.image} name={product.name} price={product.price} id={product.id} />
    );
    return (
        <div className="commodities">
            {listItems}
        </div>
    );
}

export { RenderList, ImgDiv, TextDiv, ProductDiv, ProductList };