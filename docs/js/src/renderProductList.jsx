import { Sidebar } from "./sidebar.js";
import { InputBox } from "./InputBox.js";
// import { Attributes } from "./uploadProduct.js";
import { getProductInfo, getProductList, updateProduct, createProduct, deleteProduct } from "./product_api.js";
import { getFobStageList } from "./pstage_api.js";

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
    if (props.products.length == 0) {
        return (
            <div>
                <Heading />
                <UploadProductBtn />
            </div>
        );
    }
    return (
        <div>
            <Heading />
            <ProductListTable products={props.products} />
            {/* <Pagination /> */}
            <UploadProductBtn />
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
    const [pid, setPid] = React.useState(0);

    const handleDelete = (e) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }
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

    const handleStageEdit = (e) => {
        const id = e.target.dataset.id;
        const product = products.find(product => product.id == id);
        if (!product) {
            alert('Product not found');
            return;
        }
        setPid(id);
        $('#productStageModal').modal('show');
        // getFobStageList(id, (data) => {
        //     setPid(id);
        //     $('#productStageModal').modal('show');
        // }, (err) => {
        //     alert('Get stage list failed: ' + err);
        // });
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
                <button className="btn btn-warning" data-id={product.id} onClick={handleStageEdit}>Stage</button>
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
                    <div id="popup-stage-product">
                        <PopupStage pid={pid} />
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
            if (element.value.indexOf(',') == -1) {
                attributes[key] = Number(element.value);
            } else {
                const value = element.value.split(',').map((item) => item.trim());
                attributes[key] = value;
            }
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
                <InputBox id={key} label={key} type="text" defaultValue={typeof product.attributes[key] == 'object' ? product.attributes[key].join() : product.attributes[key]} required={true} />
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
                    <div className="modal-body row">
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

function PopupStage(props) {
    const [fob, setFOB] = React.useState([
        {
            pid: props.pid,
            quantity: 1,
            fobla: 0.0000,
            fobcn: 0.0000,
            username: localStorage.getItem('username')
        }
    ]);
    const [oldFOB, setOldFOB] = React.useState([]);

    getFobStageList(props.pid, (data) => {
        setFOB(data.list);
        setOldFOB(data.list);
    }, (err) => {
        // alert('Get stage list failed: ' + err);
        console.log(err);
        console.log(props.pid);
    });

    const handleFOBSubmit = () => {
        const fobNum = fob.length;
        let createdNum = 0;
        let deletedNum = 0;
        let originalNum = oldFOB.length;
        oldFOB.forEach((item) => {
            PStage.deleteFobStage(item.id, (data) => {
                deletedNum++;
                if (deletedNum === originalNum) {
                    fob.forEach((item) => {
                        console.log(item);
                        PStage.createFobStage(item, (data) => {
                            createdNum++;
                            if (createdNum === fobNum) {
                                alert(data.message);
                                location.reload();
                            }
                        }, (err) => {
                            alert(err);
                        });
                    });
                }
            });
        });
    }

    return (
        <div className="modal fade" id="productStageModal" tabIndex="-1" role="dialog" aria-labelledby="productStageModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="text-danger">&times;</span>
                        </button>
                        <h4 className="modal-title" id="productStageModalLabel">Edit Stage</h4>
                    </div>
                    <div className="modal-body row">
                        <div className="vertical-center">
                            <div className="col-xs-10 col-sm-9 col-sm-offset-1">
                                <div className="form-group">
                                    <label htmlFor="stage">Set FOB Stage</label>
                                    {fob.map((item, index) => (
                                        <div className="row mb-small" key={index}>
                                            <div className="col-sm-4">
                                                <InputBox type="number" name="quantity" label="Quantity" required={true} min={1} max={999999} defaultValue={item.quantity} onChange={(e) => {
                                                    let newFOB = [...fob];
                                                    newFOB[index].quantity = Number(e.target.value);
                                                    setFOB(newFOB);
                                                }} />
                                            </div>
                                            <div className="col-sm-4">
                                                <InputBox type="number" name="fobla" label="FOB LA" required={true} min={1} max={999999} defaultValue={item.fobla} onChange={(e) => {
                                                    let newFOB = [...fob];
                                                    newFOB[index].fobla = Number(e.target.value);
                                                    setFOB(newFOB);
                                                }} />
                                            </div>
                                            <div className="col-sm-4">
                                                <InputBox type="number" name="fobcn" label="FOB CN" required={true} defaultValue={item.fobcn} onChange={(e) => {
                                                    let newFOB = [...fob];
                                                    newFOB[index].fobcn = Number(e.target.value);
                                                    setFOB(newFOB);
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-xs-2 col-sm-1">
                                <button className="btn btn-primary" onClick={() => setFOB([...fob, {
                                    pid: props.pid,
                                    quantity: 1,
                                    fobla: 0.0000,
                                    fobcn: 0.0000,
                                    username: localStorage.getItem('username')
                                }])}>+</button>
                                <button className="btn btn-danger" onClick={() => (fob.length > 1) ? setFOB(fob.slice(0, -1)) : null}>-</button>
                            </div>
                        </div>
                        <div className="col-xs-6 col-xs-offset-2 col-sm-4 col-sm-offset-3 row">
                            <button className="btn btn-success btn-lg col-xs-12" onClick={handleFOBSubmit}>Confirm!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UploadProductBtn() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <a href="/products/upload/" className="btn btn-lg btn-primary">Upload Product</a>
            </div>
        </div>
    );
}

export { renderProductList, ProductListTable };
