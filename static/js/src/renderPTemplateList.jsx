import { Sidebar } from "./sidebar.js";
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

function emptyTemplate() {
    return {
        "id": "",
        "templatename": "",
        "category": "",
        "childcategory": "",
        "Profit": 0,
        "isactive": 1,
        "include": [],
        "exclude": [],
        "description": "",
        "attributes": {
            "price": "tier",
            "attrs": [
                {
                    "name": "",
                    "type": "multiple",
                    "required": false,
                    "example": ""
                }
            ]
        }
    };
}

function PTemplateListTable(props) {
    const templates = props.templates;
    const [template, setTemplate] = React.useState(emptyTemplate);

    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deletePTemplate(id, () => {
            window.location.reload();
        });
    }
    const handleActive = (e) => {
        const id = Number(e.target.dataset.id);
        const targetTemplate = templates.find((template) => {
            return template.id === id;
        });
        const status = targetTemplate.isactive;
        // console.log(id, status);
        deletePTemplate(id, () => {
            createPTemplate(JSON.stringify({ ...targetTemplate, isactive: 1-status }), () => {
                window.location.reload();
            });
        });
    }
    const handleUpdate = (e) => {
        const id = Number(e.target.dataset.id);
        const targetTemplate = templates.find((template) => {
            return template.id === id;
        });
        setTemplate(targetTemplate);
        $('#editPTemplateModal').modal('show');
    }

    return (
        <div className="row">
            <PopupEdit ptemlate={template} />
            <div className="col-sm-12 table-responsive">
                <table className="table table-striped table-hover col-sm-12 table-condensed text-center">
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
    const ptemplate = props.ptemlate;

    const getAttributes = () => {
        const attrs = {};
        const price = "tier";
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
            // attr['required'] = (required[i].checked === "on");
            attr['required'] = required[i].checked;
            attr['example'] = example[i].value;
            attrs['attrs'].push(attr);
        }
        return attrs;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        const templateName = $('#template-name').val();
        const category = $('#category').val();
        const childCategory = $('#child-category').val();
        const profit = Number($('#profit').val());
        const status = 1;
        const include = $('#include').val() ? $('#include').val().split(',').map((item) => { return Number(item.trim()); }) : [];
        const exclude = $('#exclude').val() ? $('#exclude').val().split(',').map((item) => { return Number(item.trim()); }) : [];
        const description = $('#description').val() || '';
        const attributes = getAttributes();
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
        // console.log(data);
        deletePTemplate(id, () => {
            createPTemplate(JSON.stringify(data), () => {
                $('#info').html('<p class="text-success">Product Template Updated Successfully!</p>');
                setTimeout(() => {
                    $('#info').html('');
                    $('#editPTemplateModal').modal('hide');
                    window.location.reload();
                }, 1000);
            }, (res) => {
                $('#info').html('<p class="text-danger">Error: ' + res.responseText + '</p>');
            });
        });
    }

    const handleClick = (e) => {
        const sel = e.target.dataset.title;
        const tog = e.target.dataset.toggle;
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active btn-success').addClass('notActive btn-default');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-success');
    }

    console.log(ptemplate.attributes.attrs);
    const [attributes, setAttributes] = React.useState((ptemplate.attributes.attrs || []).map((attr) => {
        return <Attributes items={attr} />;
    }));

    React.useEffect(() => {
        setAttributes((ptemplate.attributes.attrs || []).map((attr) => {
            return <Attributes items={attr} />;
        }));
    }, [ptemplate]);

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
                    <form data-id={ptemplate.id} onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="editPTemplateModalLabel">Edit Product Template</h4>
                        </div>
                        <div className="modal-body row">
                            <InputBox label="Template Name" id="template-name" type="text" required={true} defaultValue={ptemplate.templatename} />
                            <InputBox label="Category" id="category" type="text" required={true} defaultValue={ptemplate.category} />
                            <InputBox label="Child Category" id="child-category" type="text" required={true} defaultValue={ptemplate.childcategory} />
                            <InputBox label="Profit" id="profit" type="number" required={true} defaultValue={ptemplate.profit} />
                            {/* <InputBox label="Include" id="include" type="text" required={false} value={include} onChange={handleIncludeChange} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} value={exclude} onChange={handleExcludeChange} /> */}
                            <InputBox label="Description" id="description" type="text" required={false} defaultValue={ptemplate.description} />
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
                            <InputBox label="Include" id="include" type="text" required={false} defaultValue={ptemplate.include.join(',')} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} defaultValue={ptemplate.exclude.join(',')} />
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
        const templateName = $('#new-template-name').val();
        const category = $('#new-category').val();
        const childCategory = $('#new-child-category').val();
        const profit = Number($('#new-profit').val());
        const status = 1;
        const include = $('#new-include').val() || [];
        const exclude = $('#new-exclude').val() || [];
        const description = $('#new-description').val() || '';
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
        // console.log(data);
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
        const modal = document.querySelector('#newPTemplateModal');
        const attrs = {};
        const price = $('#new-price-model').val();
        attrs['price'] = price;
        const attrName = modal.querySelectorAll('#attr-name');
        const type = modal.querySelectorAll('#type');
        const required = modal.querySelectorAll('#required');
        const example = modal.querySelectorAll('#example');
        attrs['attrs'] = [];
        for (let i = 0; i < attrName.length; i++) {
            if (attrName[i].value === '') {
                continue;
            }
            const attr = {};
            attr['name'] = attrName[i].value;
            attr['type'] = type[i].value;
            // attr['required'] = (required[i].checked === "on");
            attr['required'] = required[i].checked;
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
                    <div className="modal-body row">
                        <form>
                            <InputBox label="Template Name" id="new-template-name" type="text" required={true} />
                            <InputBox label="Category" id="new-category" type="text" required={true} />
                            <InputBox label="Child Category" id="new-child-category" type="text" required={true} />
                            <InputBox label="Profit" id="new-profit" type="number" required={true} />
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
                                        <input type="hidden" id="new-price-model" name="price-model" value="tier" />
                                    </div>
                                </div>
                            </div>
                            {/* <InputBox label="Include" id="include" type="text" required={false} />
                            <InputBox label="Exclude" id="exclude" type="text" required={false} /> */}
                            <InputBox label="Description" id="new-description" type="text" required={false} />
                            <div className="col-md-10 col-md-offset-1">
                                <label htmlFor="attributes">Attributes</label>
                                <div className="vertical-center">
                                    <div className="col-xs-11" id="new-attributes">
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
                            <InputBox label="Include" id="new-include" type="text" required={false} />
                            <InputBox label="Exclude" id="new-exclude" type="text" required={false} />
                            <div className="info col-md-10 col-md-offset-1" id="new-info">
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
                    <input type="text" className="form-control" id="attr-name" placeholder="Attribute Name" defaultValue={items.name} />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="type">Type</label>
                    <select className="form-control" id="type" defaultValue={items.type}>
                        <option value="multiple">Multiple</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="col-sm-4">
                    <InputBox label="Required" id="required" type="checkbox" checked={items.required} />
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="example" placeholder="Attribute Value" defaultValue={items.example} />
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
