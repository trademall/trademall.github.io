import { Sidebar } from "./sidebar.js";
import { deleteCTemplate, updateCTemplate } from "./ctemplate.js";
import { handleNextPage, handlePreviousPage } from "./template_manage.js";

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

function TemplateListTable(props) {
    const templates = props.templates;

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteCTemplate(id);
    }
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        updateCTemplate(id);
    }

    return (
        <div className="row">
            <div className="col-sm-12 table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Merchant</th>
                            <th>Customer</th>
                            <th>Created At</th>
                            <th>Expire At</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => {
                            return (
                                <tr key={template.id}>
                                    <td>{template.mname}</td>
                                    <td>{template.cname}</td>
                                    <td>{template.creat}</td>
                                    <td>{template.expire}</td>
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

export { renderCTemplateList, TemplateListTable }
