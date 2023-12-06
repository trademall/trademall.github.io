import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { Attributes } from "./uploadProduct.js";
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

function emptyProduct() {
    return {
        id: '',
        name: '',
        image: '[]',
        productid: '',
        detailinfo: '',
        category: '',
        childcategory: '',
        attributes: {},
        include: [],
        exclude: [],
        status: '',
        volume: '',
        weight: '',
        price: '',
        profit: '',
    };
}

function ProductListTable(props) {
    const products = props.products;
    const [productEdit, setProductEdit] = React.useState(emptyProduct);

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteProduct(id, (data) => {
            alert('Delete success');
            location.reload();
        }, (err) => {
            alert('Delete failed: ' + err);
        });
    }
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        const product = products.find(product => product.id == id);
        if (!product) {
            alert('Product not found');
            return;
        }
        setProductEdit(product);
        $('#productEditModal').modal('show');
    }

    const rows = products.map((product) =>
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.status == 2 ? 'Inactive' : product.status == 1 ? 'Public' : 'Private'}</td>
            <td>{product.price}</td>
            <td>{product.profit}</td>
            <td>
                <button className="btn btn-primary" data-id={product.id} onClick={handleUpdate}>Update</button>
                <button className="btn btn-danger" data-id={product.id} onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );

    return (
        <div className="row">
            <div className="col-sm-12 table-responsive">
                <div className="col-sm-10">
                    <div id="popup-edit-product">
                        <PopupEdit product={productEdit} />
                    </div>
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
    const images = JSON.parse(product.image);

    function handleUpdate(e) {
        const data = {
            ID: Number(e.target.dataset.id),
            name: $('#name').val(),
            productid: Number($('#pid').val()),
            detailinfo: $('#detail').val(),
            category: $('#category').val(),
            childcategory: $('#childcategory').val(),
            attributes: getAttributes(),
            Status: Number($('#status').val()),
            Volume: Number($('#volume').val()),
            Weight: Number($('#weight').val()),
            include: getInclude(),
            exclude: getExclude(),
            Price: Number($('#price').val()),
            Profit: Number($('#profit').val()),
        }
        console.log(data);
        updateProduct(data, (data) => {
            alert('Update success');
            location.reload();
        }, (err) => {
            alert('Update failed: ' + err);
        });
    }

    function getAttributes() {
        let attributes = {};
        $('#attributesWrapper input').each(function (index, element) {
            const key = element.id;
            const value = element.value.split(',').map((item) => item.trim());
            attributes[key] = value;
        });
        return attributes;
    }

    function getInclude() {
        let include = $('input#include').value ? $('input#include').value.split(',').map((item) => Number(item.trim())) : [];
        return include;
    }

    function getExclude() {
        let exclude = $('input#exclude').value ? $('input#exclude').value.split(',').map((item) => Number(item.trim())) : [];
        return exclude;
    }

    const attributes = Object.keys(product.attributes).map((key) => (
        <div className="">
            <div className="form-group col-12" key={key}>
                <InputBox id={key} label={key} type="text" defaultValue={product.attributes[key].join()} required={false} />
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
                            <div className="form-group col-sm-10 col-sm-offset-1">
                                <label htmlFor="image">Image</label>
                                <div className="row" id="pimages">
                                    {images.map((image) => (
                                        <div className="col-xs-6 col-sm-4 col-md-3" key={image}>
                                            <img src={image} className="img-responsive" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <InputBox id="name" label="Name" type="text" defaultValue={product.name} required={true} />
                            <InputBox id="pid" label="Product ID" type="text" defaultValue={product.productid} required={true} />
                            <InputBox id="detail" label="Detail" type="text" defaultValue={product.detailinfo} required={true} />
                            <InputBox id="category" label="Category" type="text" defaultValue={product.category} required={true} disabled={true} />
                            <InputBox id="childcategory" label="Child Category" type="text" defaultValue={product.childcategory} required={true} disabled={true} />

                            <div className="form-group col-md-10 col-md-offset-1" id="attributesWrapper">
                                <label htmlFor="attributes">Attributes</label>
                                {attributes}
                            </div>

                            <InputBox id="include" label="Include" type="text" defaultValue={product.include.join()} required={false} />
                            <InputBox id="exclude" label="Exclude" type="text" defaultValue={product.exclude.join()} required={false} />

                            <div className="form-group col-md-10 col-md-offset-1" id="statusWrapper">
                                <label htmlFor="status">Status</label>
                                <select className="form-control" id="status">
                                    <option value={2} selected={product.status == 2 ? 'selected' : ''}>Inactive</option>
                                    <option value={1} selected={product.status == 1 ? 'selected' : ''}>Public</option>
                                    <option value={0} selected={product.status == 0 ? 'selected' : ''}>Private</option>
                                </select>
                            </div>
                            <InputBox id="volume" label="Volume" type="number" defaultValue={product.volume} required={true} />
                            <InputBox id="weight" label="Weight" type="number" defaultValue={product.weight} required={true} />
                            <InputBox id="price" label="Price" type="number" defaultValue={product.price} required={true} />
                            <InputBox id="profit" label="Profit" type="number" defaultValue={product.profit} required={true} disabled ={true} />
                        </form>
                    </div>
                    <div className="modal-footer text-center">
                        <button type="button" className="btn btn-primary" onClick={handleUpdate} data-id={product.id}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { renderProductList, ProductListTable }