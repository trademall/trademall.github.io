import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { getProductInfo, getProductList, updateProduct, createProduct, deleteProduct } from "./product_api.js";

function renderProductList(props) {
    const productList = $('#product-list');
    if (productList.length) {
        ReactDOM.render(
            <div className="row">
                <Sidebar />
                <div className="col-sm-10">
                    <ProductList products={props.list} />
                </div>
            </div>,
            productList[0]
        );
        ReactDOM.render(
            <PopupEdit product={props.list[0]} />,
            $('#popup-edit-product')[0]
        );
    }
}

function ProductList(props) {
    return (
        <div>
            <Heading />
            <ProductListTable products={props.products} />
            {/* <Pagination /> */}
        </div>
    );
}

function Heading() {
    return (
        <div className="row">
            <div className="col-sm-12 heading">
                <h3 className="text-uppercase">Product List</h3>
            </div>
        </div>
    );
}

function Pagination() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button className="btn btn-default" onClick={handlePreviousPage} disabled>&lt;&nbsp;Prev</button>
                <button className="btn btn-default" onClick={handleNextPage} disabled>Next&nbsp;&gt;</button>
            </div>
        </div>
    );
}

function ProductListTable(props) {
    const products = props.products;

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteProduct(id);
    }
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        const product = products.find(product => product.id == id);
        console.log(product);
        ReactDOM.render(
            <PopupEdit product={product} />,
            $('#popup-edit-product')[0]
        );

    }

    const rows = products.map((product) =>
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.status == 2 ? 'Inactive' : product.status == 1 ? 'Public' : 'Private'}</td>
            <td>{product.price}</td>
            <td>{product.profit}</td>
            <td>
                <button className="btn btn-primary" data-id={product.id} data-toggle="modal" data-target="#productEditModal" onClick={handleUpdate}>Update</button>
                <button className="btn btn-danger" data-id={product.id} onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );

    return (
        <div className="row">
            <div className="col-sm-12 table-responsive">
                <div className="col-sm-10">
                    <div id="popup-edit-product"></div>
                </div>
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Profit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PopupEdit(props) {
    const product = props.product;
    function handleUpdate(e) {
        const data = {
            ID: e.target.dataset.id,
            Title: $('#name').val(),
            ProductID: $('#pid').val(),
            DetailInfo: $('#detail').val(),
            category: $('#category').val(),
            childcategory: $('#childcategory').val(),
            Attributes: getAttributes(),
            Status: $('#status').val(),
            Volume: $('#volume').val(),
            Weight: $('#weight').val(),
            Include: getInclude(),
            Exclude: getExclude(),
            Price: $('#price').val(),
            Profit: $('#profit').val(),
        }
        updateProduct(data);
    }

    function getAttributes() {
        const attributes = {};
        $('#attributes input').each(function (index, element) {
            const key = element.dataset.key;
            const value = element.value;
            attributes[key] = value;
        });
    }

    function getInclude() {
        const include = [];
        $('#include input').each(function (index, element) {
            include.push(element.value);
        });
    }

    function getExclude() {
        const exclude = [];
        $('#exclude input').each(function (index, element) {
            exclude.push(element.value);
        });
    }

    const attributes = Object.keys(product.attributes).map((key) => (
        <div className="col-md-10 col-md-offset-1">
            <div className="form-group col-sm-10 col-offset-1" key={key}>
                <label htmlFor={key}>{key}</label>
                {Object.values(product.attributes[key]).map((value) => (
                    <input type="text" className="form-control" name={value} id={value} defaultValue={value} required={false} />
                ))}
            </div>
        </div>
    ));


    return (
        <div className="modal fade" id="productEditModal" tabIndex="-1" role="dialog" aria-labelledby="productEditModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="text-danger">&times;</span>
                        </button>
                        <h4 className="modal-title" id="productEditModalLabel">Edit Product</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <InputBox id="name" label="Name" type="text" defaultValue={product.name} required={true} />
                            <InputBox id="pid" label="Product ID" type="text" defaultValue={product.productid} required={true} />
                            <InputBox id="detail" label="Detail" type="text" defaultValue={product.detailinfo} required={true} />
                            <InputBox id="category" label="Category" type="text" defaultValue={product.category} required={true} />
                            <InputBox id="childcategory" label="Child Category" type="text" defaultValue={product.childcategory} required={true} />
                            <div className="col-sm-10 col-sm-offset-1" id="attributes">
                                <label htmlFor="attributes">Attributes</label>
                                {attributes}
                            </div>
                            <div className="col-sm-10 col-sm-offset-1">
                                <div className="form-group row" id="include">
                                    <label htmlFor="include" className="col-xs-12">Include</label>
                                    {product.include.map((item) =>
                                        <div className="col-xs-3">
                                            <input type="text" className="form-control" name={item} id={item} defaultValue={item} required={false} />
                                        </div>
                                    )}
                                    <div className="col-xs-3">
                                        <input type="text" className="form-control" name="exclude-empty" id="exclude-empty" required={false} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-10 col-sm-offset-1">
                                <div className="form-group row" id="exclude">
                                    <label htmlFor="exclude" className="col-xs-12">Exclude</label>
                                    {product.exclude.map((item) =>
                                        <div className="col-xs-3">
                                            <input type="text" className="form-control" name={item} id={item} defaultValue={item} required={false} />
                                        </div>
                                    )}
                                    <div className="col-xs-3">
                                        <input type="text" className="form-control" name="exclude-empty" id="exclude-empty" required={false} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-sm-10 col-sm-offset-1" id="statusWrapper">
                                <label htmlFor="status">Status</label>
                                <select className="form-control" id="status" defaultValue={product.status}>
                                    <option value="2">Inactive</option>
                                    <option value="1">Public</option>
                                    <option value="0">Private</option>
                                </select>
                            </div>
                            <InputBox id="volume" label="Volume" type="number" defaultValue={product.volume} required={true} />
                            <InputBox id="weight" label="Weight" type="number" defaultValue={product.weight} required={true} />
                            <InputBox id="price" label="Price" type="number" defaultValue={product.price} required={true} />
                            <InputBox id="profit" label="Profit" type="number" defaultValue={product.profit} required={true} />
                            <button type="button" className="btn btn-primary" onClick={handleUpdate} data-id={product.id}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { renderProductList, ProductList }