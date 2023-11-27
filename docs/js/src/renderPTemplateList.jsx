import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { createPTemplate, deletePTemplate, updatePTemplate } from "./ptemplate_api.js";

function renderPTemplateList(props) {
    const templateList = $('#ptemplate-list');
    if (templateList.length) {
        ReactDOM.render(
            <div className="row">
                <Sidebar />
                <div className="col-sm-10">
                    <PTemplateList templates={props.list} />
                </div>
            </div>,
            templateList[0]
        );
    }
}

function PTemplateList(props) {
    return (
        <div>
            <Heading />
            <PTemplateListTable templates={props.templates} />
            {/* <Pagination /> */}
            <NewPTemplateModal />
            <CreatePTmplateBtn />
        </div>
    );
}

function Heading() {
    return (
        <div className="row">
            <div className="col-sm-12 heading">
                <h3 className="text-uppercase">Product Templates</h3>
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

function PTemplateListTable(props) {
    const templates = props.templates;

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deletePTemplate(id);
    }
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        updatePTemplate(id);
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Profit</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => {
                            return (
                                <tr key={template.id}>
                                    <td>{template.templatename}</td>
                                    <td>{template.category}</td>
                                    <td>{template.profit}</td>
                                    <td>{template.isactive? 'Active': 'Inactive'}</td>
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

function NewPTemplateModal() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const templateName = $('#template-name').val();
        const category = $('#category').val();
        const childCategory = $('#child-category').val();
        const profit = Number($('#profit').val());
        const status = $('#status').val() === 'on' ? 1 : 0;
        const include = $('#include').val();
        const exclude = $('#exclude').val();
        const data = {
            templatename: templateName,
            category: category,
            childcategory: childCategory,
            profit: profit,
            isactive: status,
            include: include,
            exclude: exclude
        }
        createPTemplate(data, () => {
            $('#info').html('<p class="text-success">New Product Template Created Successfully!</p>');
            setTimeout(() => {
                $('#info').html('');
                $('#newPTemplateModal').modal('hide');
                window.location.reload();
            }, 1000);
        }, (res) => {
            $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
        });
    }
    return (
        <div className="modal fade" id="newPTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="newPTemplateModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
                        <h4 className="modal-title" id="newPTemplateModalLabel">New Product Template</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <InputBox label="Template Name" id="template-name" type="text" required={true} />
                            <InputBox label="Category" id="category" type="text" required={true} />
                            <InputBox label="Child Category" id="child-category" type="text" required={true} />
                            <InputBox label="Profit" id="profit" type="number" required={true} />
                            <InputBox label="Active" id="status" type="checkbox" />
                            <InputBox label="Include" id="include" type="text" required={false} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} />
                            <InputBox label="Description" id="description" type="text" required={false} />
                            <div className="info" id="info">
                            </div>
                            <div className="modal-foot text-center">
                                <button type="submit" className="btn btn-lg btn-primary" onClick={handleSubmit}>Submit</button>
                                <button type="button" className="btn btn-lg btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

function CreatePTmplateBtn() {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target="#newPTemplateModal">Create New</button>
            </div>
        </div>
    );
}

export { renderPTemplateList, PTemplateListTable }
