import { Sidebar } from "./renderAdmin.js";
import { InputBox } from "./InputBox.js";
import { createPTemplate, deletePTemplate, updatePTemplate, setPTemplateStatus } from "./ptemplate_api.js";

function renderPTemplateList(props) {
    const templateList = $('#ptemplate-list');
    if (templateList.length) {
        ReactDOM.render(
            <div className="row">
                <Sidebar />
                <div className="col-sm-10">
                    {props.list ? <PTemplateList templates={props.list} />: <PTemplateList templates={[]} />}
                </div>
            </div>,
            templateList[0]
        );
    }
}

function PTemplateList(props) {
    const [template, setTemplate] = React.useState({});
    return (
        <div>
            <Heading />
            {props.templates.length?<PTemplateListTable templates={props.templates} />: <h3 className="text-center">No Product Template Found!</h3>}
            {/* <Pagination /> */}
            <NewPTemplateModal />
            {/* <PopupEdit /> */}
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
        deletePTemplate(id, () => {
            window.location.reload();
        });
    }
    const handleActive = (e) => {
        const id = Number(e.target.dataset.id);
        const status = templates.find((template) => {
            return template.id === id;
        }).isactive;
        console.log(id, status);
        setPTemplateStatus(id, 1-status, () => {
            window.location.reload();
        });
    }
    const handleUpdate = (e) => {
        const id = Number(e.target.dataset.id);
        $('#editPTemplateModal').modal('show');
        $('#editPTemplateModal form').attr('data-id', id);
        const template = templates.find((template) => {
            return template.id === id;
        });
        // console.log(template);
        $('#template-name').val(template.templatename);
        $('#category').val(template.category);
        $('#child-category').val(template.childcategory);
        $('#profit').val(template.profit);
        $('#include').val(template.include);
        $('#exclude').val(template.exclude);
        $('#description').val(template.description);
        $('#attributes').val(template.attributes);

    }

    return (
        <div className="row">
            <div className="col-sm-12 table-responsive">
                <table className=" table-striped table-hover col-sm-12 table-condensed text-center">
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
                                        <button className={template.isactive?"btn btn-warning":"btn btn-success"} data-id={template.id} onClick={handleActive}>{template.isactive? 'Deactivate': 'Activate'}</button>
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        const templateName = $('#template-name').val();
        const category = $('#category').val();
        const childCategory = $('#child-category').val();
        const profit = Number($('#profit').val());
        const status = 1;
        const include = $('#include').val() || [];
        const exclude = $('#exclude').val() || [];
        const description = $('#description').val() || '';
        const attributes = $('#attributes').val() || {};
        const data = {
            "id": id,
            "templatename": templateName,
            "category": category,
            "childcategory": childCategory,
            "Profit": profit,
            "isactive": status,
            "include": include,
            "exclude": exclude,
            "description": description,
            "attributes": attributes
        }
        console.log(data);
        updatePTemplate(data, () => {
            $('#info').html('<p class="text-success">Product Template Updated Successfully!</p>');
            setTimeout(() => {
                $('#info').html('');
                $('#editPTemplateModal').modal('hide');
                // window.location.reload();
            }, 1000);
        }, (res) => {
            $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
        });
    }

    const handleClick = (e) => {
        const sel = e.target.dataset.title;
        const tog = e.target.dataset.toggle;
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active btn-success').addClass('notActive btn-default');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-success');
    }

    const [attributes, setAttributes] = React.useState([<Attributes items={props.attributes} />]);

    const handleNewAttribute = (e) => {
        e.preventDefault();
        const newAttribute = <EmptyAttribute />;
        setAttributes([...attributes, newAttribute]);
    }

    const handleDeleteAttribute = (e) => {
        e.preventDefault();
        if (attributes.length === 1) {
            return;
        }
        const newAttributes = attributes.slice(0, attributes.length - 1);
        setAttributes(newAttributes);
    }

    const handleCancel = (e) => {
        // hide modal
        $('#editPTemplateModal').modal('hide');
    }

    return (
        <div className="modal fade" id="editPTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="editPTemplateModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form data-id={props.id} onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="editPTemplateModalLabel">Edit Product Template</h4>
                        </div>
                        <div className="modal-body">
                            <InputBox label="Template Name" id="template-name" type="text" required={true} value={props.name} />
                            <InputBox label="Category" id="category" type="text" required={true} value={props.category} />
                            <InputBox label="Child Category" id="child-category" type="text" required={true} value={props.childCategory} />
                            <InputBox label="Profit" id="profit" type="number" required={true} value={props.profit} />
                            {/* <InputBox label="Include" id="include" type="text" required={false} value={include} onChange={handleIncludeChange} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} value={exclude} onChange={handleExcludeChange} /> */}
                            <InputBox label="Description" id="description" type="text" required={false} value={props.description} onChange={handleDescriptionChange} />
                            <div className="col-md-10 col-md-offset-1">
                                <label htmlFor="attributes">Attributes</label>
                                <div className="vertical-center">
                                    <div className="col-xs-11" id="attributes">
                                        {attributes.map((attribute) => {
                                            return attribute;
                                        })}
                                    </div>
                                    <div className="col-xs-1 text-center">
                                        <button type="button" className="btn btn-primary" onClick={handleNewAttribute}>+</button>
                                        <button type="button" className="btn btn-danger" onClick={handleDeleteAttribute}>-</button>
                                    </div>
                                </div>
                            </div>
                            <div className="info col-md-10 col-md-offset-1" id="info">
                            </div>
                            <div className="modal-foot text-center">
                                <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                                <button type="button" className="btn btn-lg btn-default" data-dismiss="modal" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
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
        const status = 1;
        const include = $('#include').val() || [];
        const exclude = $('#exclude').val() || [];
        const description = $('#description').val() || '';
        const attributes = getAttributes();
        const data = {
            "templatename": templateName,
            "category": category,
            "childcategory": childCategory,
            "Profit": profit,
            "isactive": status,
            "include": include,
            "exclude": exclude,
            "description": description,
            "attributes": attributes,
            "creator_id": Number(localStorage.getItem('id'))
        }
        console.log(data);
        createPTemplate(JSON.stringify(data), () => {
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

    const getAttributes = () => {
        const attrs = {};
        const price = $('#price-model').val();
        attrs['price'] = price;
        const attrName = document.querySelectorAll('#attr-name');
        const type = document.querySelectorAll('#type');
        const required = document.querySelectorAll('#required');
        const example = document.querySelectorAll('#example');
        attrs['attrs'] = [];
        for (let i = 0; i < attrName.length; i++) {
            if (attrName[i].value === '') {
                continue;
            }
            const attr = {};
            attr['name'] = attrName[i].value;
            attr['type'] = type[i].value;
            attr['required'] = (required[i].checked === "on");
            attr['example'] = example[i].value;
            attrs['attrs'].push(attr);
        }
        return attrs;
    }

    const handleClick = (e) => {
        if (e.target.parentElement.parentElement.classList.contains('disabled')) {
            return;
        }
        const sel = e.target.dataset.title;
        const tog = e.target.dataset.toggle;
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active btn-success').addClass('notActive btn-default');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-success');
    }

    const [attributes, setAttributes] = React.useState([<EmptyAttribute />]);

    const handleNewAttribute = (e) => {
        e.preventDefault();
        const newAttribute = <EmptyAttribute />;
        setAttributes([...attributes, newAttribute]);
    }

    const handleDeleteAttribute = (e) => {
        e.preventDefault();
        if (attributes.length === 1) {
            return;
        }
        const newAttributes = attributes.slice(0, attributes.length - 1);
        setAttributes(newAttributes);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setAttributes([<EmptyAttribute />]);
    }

    return (
        <div className="modal fade" id="newPTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="newPTemplateModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="newPTemplateModalLabel">New Product Template</h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <InputBox label="Template Name" id="template-name" type="text" required={true} />
                            <InputBox label="Category" id="category" type="text" required={true} />
                            <InputBox label="Child Category" id="child-category" type="text" required={true} />
                            <InputBox label="Profit" id="profit" type="number" required={true} />
                            <div className="col-md-10 col-md-offset-1">
                                <div className="form-group">
                                    <label htmlFor="price-model">Price Model*</label>
                                    <div className="input-group">
                                        <div className="btn-group disabled" id="radioBtn" onClick={handleClick}>
                                            <div className="btn-group">
                                                <a type="button" className="btn btn-default btn-lg notActive" data-toggle="price-model" data-title="flat">Flat</a>
                                            </div>
                                            <div className="btn-group">
                                                <a type="button" className="btn btn-success btn-lg active" data-toggle="price-model" data-title="tier">Tier</a>
                                            </div>
                                        </div>
                                        <input type="hidden" id="price-model" name="price-model" value="tier" />
                                    </div>
                                </div>
                            </div>
                            {/* <InputBox label="Include" id="include" type="text" required={false} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} /> */}
                            <InputBox label="Description" id="description" type="text" required={false} />
                            <div className="col-md-10 col-md-offset-1">
                                <label htmlFor="attributes">Attributes</label>
                                <div className="vertical-center">
                                <div className="col-xs-11" id="attributes">
                                    {attributes.map((attribute) => {
                                        return attribute;
                                    })}
                                </div>
                                <div className="col-xs-1 text-center">
                                        <button type="button" className="btn btn-primary" onClick={handleNewAttribute}>+</button>
                                        <button type="button" className="btn btn-danger" onClick={handleDeleteAttribute}>-</button>
                                </div>
                                </div>
                            </div>
                            <div className="info col-md-10 col-md-offset-1" id="info">
                            </div>
                            <div className="modal-foot text-center">
                                <button type="submit" className="btn btn-lg btn-primary" onClick={handleSubmit}>Submit</button>
                                <button type="button" className="btn btn-lg btn-default" data-dismiss="modal" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyAttribute() {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-sm-4">
                    <label htmlFor="attr-name">Name</label>
                    <input type="text" className="form-control" id="attr-name" placeholder="Attribute Name" />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="type">Type</label>
                    <select className="form-control" id="type">
                        <option value="multiple">Multiple</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <InputBox label="Required" id="required" type="checkbox" />
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="example" placeholder="Attribute Value" />
                </div>
            </div>
        </div>
    );
}

function Attributes(props) {
    const items = props.items;
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-sm-4">
                    <label htmlFor="attr-name">Name</label>
                    <input type="text" className="form-control" id="attr-name" placeholder="Attribute Name" value={items.name} />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="type">Type</label>
                    <select className="form-control" id="type" value={items.type}>
                        <option value="multiple">Multiple</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <InputBox label="Required" id="required" type="checkbox" value={items.required} />
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
