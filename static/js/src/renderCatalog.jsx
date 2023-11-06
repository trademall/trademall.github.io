import { ImgDiv } from "./renderList.js";

function RenderCatalog(data) {
    const catalog = $('.content')[0];
    ReactDOM.render(<ProductCatalog catalog={data} />, catalog);
}

function TextDiv(props) {
    return (
        <div className="textDiv">
            <h4><a href={"/products/details/?id=" + props.id}>{props.name}</a></h4>
            <p>{Object.values(props.attributes).join(', ')}</p>
            <h4 className="price" id="price"><span className="price-symbol">$</span>{props.price}</h4>
        </div >
    );
}

function FootBtns(props) {
    return (
        <div className="footBtn text-center">
            <button className="btn btn-template-main"><a href={"/products/details/?id=" + props.id + "&edit=true"}>Edit</a></button>
            <button className="btn btn-default"><a href={"/products/details/?id=" + props.id}>Details</a></button>
            <button className="btn btn-danger">Delete</button>
        </div>
    );
}

function ProductDiv(props) {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div className="commodity">
                <ImgDiv image={props.image} name={props.name} id={props.id} />
                <TextDiv name={props.name} price={props.price} id={props.pid} attributes={props.attributes} />
                <FootBtns id={props.id} />
            </div>
        </div>
    );
}

function ProductCatalog(props) {
    const catalog = props.catalog;
    const catalogItems = catalog.map((product) =>
        <ProductDiv key={product.id} image={product.image} name={product.attributes.name} price={product.price} pid={product.attributes.pid} attributes={ product.attributes.attributes } />
    );
    return (
        <div className="commodities">
            {catalogItems}
        </div>
    );
}

export { RenderCatalog };