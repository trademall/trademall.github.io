import { Sidebar } from "./sidebar.js";
import { InputBox, SingleImageBox } from "./InputBox.js";
import { deleteCTemplate, updateCTemplate, createCTemplate } from "./ctemplate.js";
import { handleNextPage, handlePreviousPage } from "./template_manage.js";
import { uploadFile } from "./uploadFile.js";

function renderCTemplateList(props) {
    const templateList = $('#template-list');
    if (templateList.length) {
        ReactDOM.render(
            <div className="row">
                <Sidebar />
                <div className="col-sm-10">
                    <TemplateList templates={props.list} />
                </div>
            </div>,
            templateList[0]
        );
    }
}

function TemplateList(props) {
    return (
        <div>
            <Heading />
            <TemplateListTable templates={props.templates} />
            {/* <Pagination /> */}
            <NewCTemplateModal />
            <CreateCTemplateBtn />
        </div>
    );
}

function Heading() {
    return (
        <div className="row">
            <div className="col-sm-12 heading">
                <h3 className="text-uppercase">Template List</h3>
            </div>
        </div>
    );
}

function Pagination() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button className="btn btn-default" onClick={handlePreviousPage}>&lt;&nbsp;Prev</button>
                <button className="btn btn-default" onClick={handleNextPage}>Next&nbsp;&gt;</button>
            </div>
        </div>
    );
}

const emptyCTemplate = {
    id: 0,
    logo: '',
    mname: '',
    cname: '',
    maddress: '',
    caddress: '',
    mtitle: '',
    ctitle: '',
    profit: 0,
    create: '',
    expire: ''
};

function TemplateListTable(props) {
    const templates = props.templates;
    const [ctemplate, setCTemplate] = React.useState(emptyCTemplate);

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        if (confirm('Are you sure to delete this template?')) {
            deleteCTemplate(id, (data) => {
                alert('Delete Success!');
                window.location.reload();
            }, (data) => {
                alert('Delete Failed: ' + data.message);
            });
        }
    }
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        const template = templates.find((template) => {
            return template.id == id;
        });
        setCTemplate(template);
        $('#editCTemplateModal').modal('show');
    }

    return (
        <div className="row">
            <PopupEdit ctemplate={ctemplate} setCTemplate={setCTemplate} />
            <div className="col-sm-12 table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Merchant</th>
                            <th>Customer</th>
                            <th>Expire At</th>
                            <th>Profit</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => {
                            return (
                                <tr key={template.id}>
                                    <td>{template.mname}</td>
                                    <td>{template.cname}</td>
                                    <td>{template.expire.slice(0, 16).replace('T', ' ')}</td>
                                    <td>{template.profit}</td>
                                    <td>
                                        <button className="btn btn-default" data-id={template.id} onClick={handleUpdate}>Update</button>
                                        <button className="btn btn-danger" data-id={template.id} onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PopupEdit(props) {
    const ctemplate = props.ctemplate;

    return (
        <div className="modal fade" id="editCTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="editCTemplateModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <EditCTemplateModalHeader />
                    <EditCTemplateModalBody ctemplate={ctemplate} />
                    <EditCTemplateModalFooter ctemplate={ctemplate} />
                </div>
            </div>
        </div>
    );
}

function EditCTemplateModalHeader() {
    return (
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="editCTemplateModalLabel">Edit Template</h4>
        </div>
    );
}

function EditCTemplateModalBody(props) {
    const ctemplate = props.ctemplate;
    React.useEffect(() => {
        // $('#editCTemplateModal #new-logo').val(ctemplate.logo);
        $('#editCTemplateModal #merchant').val(ctemplate.mname);
        $('#editCTemplateModal #customer').val(ctemplate.cname);
        $('#editCTemplateModal #merchant-address').val(ctemplate.maddress);
        $('#editCTemplateModal #customer-address').val(ctemplate.caddress);
        $('#editCTemplateModal #merchant-title').val(ctemplate.mtitle);
        $('#editCTemplateModal #customer-title').val(ctemplate.ctitle);
        $('#editCTemplateModal #profit').val(ctemplate.profit);
        $('#editCTemplateModal #expire').val(ctemplate.expire.substr(0, 16));
    }, [ctemplate]);

    return (
        <div className="modal-body row">
            <div className="col-md-10 col-md-offset-1">
                <label htmlFor="image-upload">Logo*</label>
                <div className="image-upload">
                    <div className="file-upload thumbnail text-hide text-center" id="image-upload">
                        <label>
                            <img src={ctemplate.logo} className="img-thumbnail" draggable="false" />
                            <p></p>
                        </label>
                        <SingleImageBox label="New Logo" id="new-logo" required={true} text="upload new logo" />
                    </div>
                <div className="alert alert-info" role="alert">
                    <p>Select a new logo if you want to change.</p>
                </div>
                </div>
            </div>
            <InputBox label="Merchant" id="merchant" required={true} defalutValue={ctemplate.mname} />
            <InputBox label="Customer" id="customer" required={true} defalutValue={ctemplate.cname} />
            <InputBox label="Merchant Address" id="merchant-address" type="text" required={true} defalutValue={ctemplate.maddress} />
            <InputBox label="Customer Address" id="customer-address" type="text" required={true} defalutValue={ctemplate.caddress} />
            <InputBox label="Merchant Title" id="merchant-title" type="text" required={true} defalutValue={ctemplate.mtitle} />
            <InputBox label="Customer Title" id="customer-title" type="text" required={true} defalutValue={ctemplate.ctitle} />
            <InputBox label="Profit" id="profit" type="number" required={true} defalutValue={ctemplate.profit} />
            <InputBox label="Expire" id="expire" type="datetime-local" required={true} defalutValue={ctemplate.expire} />
        </div>
    );
}


function EditCTemplateModalFooter(props) {
    const handleUpdateCTemplate = (e) => {
        $('#editCTemplateModal .modal-foot .btn').attr('disabled', true);
        $('#editCTemplateModal #updateCTemplateBtn').html('<i class="fa fa-spinner fa-spin"></i> Updating...');

        const id = Number(e.target.dataset.id);
        const logo = $('#editCTemplateModal p#new-logo').text();
        const merchant = $('#editCTemplateModal #merchant').val();
        const customer = $('#editCTemplateModal #customer').val();
        const merchantAddress = $('#editCTemplateModal #merchant-address').val();
        const customerAddress = $('#editCTemplateModal #customer-address').val();
        const merchantTitle = $('#editCTemplateModal #merchant-title').val();
        const customerTitle = $('#editCTemplateModal #customer-title').val();
        const profit = Number($('#editCTemplateModal #profit').val());
        const expire = $('#editCTemplateModal #expire').val() + ':00Z';

        const newdata = {
            id: id,
            logo: props.ctemplate.logo,
            mname: merchant,
            cname: customer,
            maddress: merchantAddress,
            caddress: customerAddress,
            mtitle: merchantTitle,
            ctitle: customerTitle,
            profit: profit,
            create: props.ctemplate.create,
            expire: expire
        };

        if (logo) {
            let logoIcon = document.querySelector('#editCTemplateModal input#new-logo[type="file"].uploaded');
            let logoName = document.querySelector('#editCTemplateModal p#new-logo.img-name.has-file');
            let formData = new FormData();
            formData.append('file', logoIcon.files[0], logoName.innerHTML);
            uploadFile(formData, (data) => {
                $('#editCTemplateModal input#new-logo-url').val(data.data);
                newdata.logo = $('#editCTemplateModal input#new-logo-url').val();

                deleteCTemplate(id, (data) => {
                    createCTemplate(newdata, (data) => {
                        $('#editCTemplateModal .modal-foot').addClass('bg-success');
                        $('#editCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Update Success!</p>');
                        setTimeout(() => {
                            $('#editCTemplateModal').modal('hide');
                            window.location.reload();
                        }, 1500);
                    }, (data) => {
                        $('#editCTemplateModal .modal-foot').addClass('bg-danger');
                        $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>')
                        setTimeout(() => {
                            $('#editCTemplateModal').modal('hide');
                            window.location.reload();
                        }, 1500);
                    });
                }, (data) => {
                    $('#editCTemplateModal .modal-foot').addClass('bg-danger');
                    $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>')
                    setTimeout(() => {
                        $('#editCTemplateModal').modal('hide');
                        window.location.reload();
                    }, 1500);
                });
            }, (err) => {
                $('#editCTemplateModal .modal-foot').addClass('bg-danger');
                $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>')
                setTimeout(() => {
                    $('#editCTemplateModal').modal('hide');
                    window.location.reload();
                }, 1500);
            });
        } else {
            console.log(newdata);

            deleteCTemplate(id, (data) => {
                createCTemplate(newdata, (data) => {
                    $('#editCTemplateModal .modal-foot').addClass('bg-success');
                    $('#editCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Update Success!</p>')
                    setTimeout(() => {
                        $('#editCTemplateModal').modal('hide');
                        window.location.reload();
                    }, 1500);
                }, (data) => {
                    $('#editCTemplateModal .modal-foot').addClass('bg-danger');
                    $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>')
                    setTimeout(() => {
                        $('#editCTemplateModal').modal('hide');
                        window.location.reload();
                    }, 1500);
                });
            }, (data) => {
                $('#editCTemplateModal .modal-foot').addClass('bg-danger');
                $('#editCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Update Failed: ' + data.message + '</p>')
                setTimeout(() => {
                    $('#editCTemplateModal').modal('hide');
                    window.location.reload();
                }, 1500);
            });
        }
    }

    return (
        <div className="modal-foot text-center">
            <button className="btn btn-lg btn-primary" onClick={handleUpdateCTemplate} data-id={props.ctemplate.id} id="updateCTemplateBtn">Update</button>
            <button type="button" className="btn btn-lg btn-default" data-dismiss="modal">Cancel</button>
        </div>
    );
}

function NewCTemplateModal() {
    return (
        <div className="modal fade" id="newCTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="newCTemplateModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <NewCTemplateModalHeader />
                    <NewCTemplateModalBody />
                    <NewCTemplateModalFooter />
                </div>
            </div>
        </div>
    );
}

function NewCTemplateModalHeader() {
    return (
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="newCTemplateModalLabel">Create New Template</h4>
        </div>
    );
}

function NewCTemplateModalBody() {
    return (
        <div className="modal-body row">
            <div className="col-md-10 col-md-offset-1">
                <label htmlFor="image-upload">Logo*</label>
                <div className="image-upload">
                    <div className="file-upload thumbnail text-hide text-center" id="image-upload">
                        <SingleImageBox label="Logo" id="logo" required={true} />
                    </div>
                </div>
            </div>
            <InputBox label="Merchant Name" id="merchant" required={true} />
            <InputBox label="Customer Name" id="customer" required={true} />
            <InputBox label="Merchant Address" id="merchant-address" type="text" required={true} />
            <InputBox label="Customer Address" id="customer-address" type="text" required={true} />
            <InputBox label="Merchant Title" id="merchant-title" type="text" required={true} />
            <InputBox label="Customer Title" id="customer-title" type="text" required={true} />
            <InputBox label="Profit" id="profit" type="number" required={true} />
            <InputBox label="Expire" id="expire" type="datetime-local" required={true} />
        </div>
    );
}

function NewCTemplateModalFooter() {
    const handleCreateCTemplate = () => {
        $('#newCTemplateModal .modal-foot .btn').attr('disabled', true);
        $('#newCTemplateModal #createCTemplateBtn').html('<i class="fa fa-spinner fa-spin"></i> Creating...');
        let logoIcon = document.querySelector('#newCTemplateModal input#logo[type="file"].uploaded');
        if (!logoIcon) {
            alert('Please select a logo');
            $('#newCTemplateModal .modal-foot .btn').attr('disabled', false);
            $('#newCTemplateModal #createCTemplateBtn').html('Create');
            return;
        }
        let logoName = document.querySelector('#newCTemplateModal p#logo.img-name.has-file');
        let formData = new FormData();
        formData.append('file', logoIcon.files[0], logoName.innerHTML);
        uploadFile(formData, (data) => {
            $('#newCTemplateModal input#logo-url').val(data.data);
            const logo = $('#newCTemplateModal input#logo-url').val();
            const merchant = $('#newCTemplateModal #merchant').val();
            const customer = $('#newCTemplateModal #customer').val();
            const merchantAddress = $('#newCTemplateModal #merchant-address').val();
            const customerAddress = $('#newCTemplateModal #customer-address').val();
            const merchantTitle = $('#newCTemplateModal #merchant-title').val();
            const customerTitle = $('#newCTemplateModal #customer-title').val();
            const profit = Number($('#newCTemplateModal #profit').val());
            const expire = $('#newCTemplateModal #expire').val() + ':00Z';

            const cdata = {
                logo: logo,
                mname: merchant,
                cname: customer,
                maddress: merchantAddress,
                caddress: customerAddress,
                mtitle: merchantTitle,
                ctitle: customerTitle,
                profit: profit,
                create: new Date().toISOString(),
                expire: expire
            };

            createCTemplate(cdata, (data) => {
                $('#newCTemplateModal .modal-foot').addClass('bg-success');
                $('#newCTemplateModal .modal-foot').html('<p class="alert alert-success" role="alert">Create Success!</p>')
                setTimeout(() => {
                    $('#newCTemplateModal').modal('hide');
                    window.location.reload();
                }, 1500);
            }, (data) => {
                $('#newCTemplateModal .modal-foot').addClass('bg-danger');
                $('#newCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Create Failed: ' + data.message + '</p>')
                setTimeout(() => {
                    $('#newCTemplateModal').modal('hide');
                    window.location.reload();
                }, 1500);
            });
        }, (err) => {
            $('#newCTemplateModal .modal-foot').addClass('bg-danger');
            $('#newCTemplateModal .modal-foot').html('<p class="alert alert-danger" role="alert">Create Failed: ' + data.message + '</p>')
            setTimeout(() => {
                $('#newCTemplateModal').modal('hide');
                window.location.reload();
            }, 1500);
        });
    }

    return (
        <div className="modal-foot text-center">
            <button className="btn btn-lg btn-primary" onClick={handleCreateCTemplate} id="createCTemplateBtn">Create</button>
            <button type="button" className="btn btn-lg btn-default" data-dismiss="modal">Cancel</button>
        </div>
    );
}

function CreateCTemplateBtn() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#newCTemplateModal">Create New Template</button>
            </div>
        </div>
    );
}

export { renderCTemplateList, TemplateListTable }
