import { Sidebar } from "./renderAdmin.js";

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
            <Pagination />
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
        updateProduct(id);
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
            <div className="col-sm-12">
                <table className="table table-striped table-hover table-responsive text-center">
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

function handlePreviousPage() {
    const page = parseInt($('#page').val());
    if (page > 1) {
        $('#page').val(page - 1);
        getProductList();
    }
}

function handleNextPage() {
    const page = parseInt($('#page').val());
    $('#page').val(page + 1);
    getProductList();
}

function getProductList() {
    const page = $('#page').val();
    $.ajax({
        url: '/api/products?page=' + page,
        method: 'GET',
        success: function (data) {
            renderProductList(data);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function deleteProduct(id) {
    $.ajax({
        url: '/api/products/' + id,
        method: 'DELETE',
        success: function (data) {
            getProductList();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function updateProduct(id) {
    $.ajax({
        url: '/api/products/' + id,
        method: 'PUT',
        success: function (data) {
            getProductList();
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

export { renderProductList, ProductList }