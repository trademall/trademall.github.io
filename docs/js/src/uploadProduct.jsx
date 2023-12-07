import { createProduct } from "./product_api.js";
import { getProduct } from "./getProduct.js"
import * as PTemplate from "./ptemplate_api.js";
import * as PStage from "./pstage_api.js";
import { InputBox, ImageBox } from "./InputBox.js";

renderCategorySelect();

function renderCategorySelect() {
  const container = $("#upload-product");

  if (container.length) {
    ReactDOM.render(
      <CategorySelectContainer />,
      container[0]
    );
  }
}

function CategorySelectContainer() {
  const [category, setCategory] = React.useState([{
    id: 0,
    name: 'Loading...'
  }]);
  const [childcategory, setChildCategory] = React.useState([{
    id: 0,
    name: 'Please select a category'
  }]);

  const getAndSetCategory = (ptemplates) => {
    // deduplicate
    const categories = ptemplates.list.map((ptemplate) => ptemplate.category).filter((category, index, self) => self.indexOf(category) === index).map((category) => ({
      id: category,
      name: category,
    }));
    setCategory(categories);

    $('.dropdown').on('click', '.dropdown-menu li.able a', function () {
      let target = $(this).html();

      $(this).parents('.dropdown-menu').find('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');

      if (target !== "category" && $(this).parents('.dropdown').find('.dropdown-toggle').attr('id') === "category") {
        const childcategories = ptemplates.list.filter((ptemplate) => ptemplate.category === target).map((ptemplate) => ({
          id: ptemplate.id,
          name: ptemplate.childcategory,
        }));
        setChildCategory(childcategories);
      }
    });

    $('#confirm').click(() => {
      const category = $('#category').text().trim();
      const childcategory = $('#childcategory').text().trim();
      if (category !== "category" && childcategory !== "childcategory") {
        const ptemplate = ptemplates.list.filter((ptemplate) => ptemplate.category === category && ptemplate.childcategory === childcategory)[0];
        // console.log(ptemplate);
        if (ptemplate.isactive === 0) {
          alert("This template is inactive");
          return;
        }

        ReactDOM.render(
          <UploadProduct ptemplate={ptemplate} />,
          $("#upload-product")[0]
        );
      } else {
        alert("Please select a category");
      }
    });
  }

  if (category[0].id === 0) {
    PTemplate.getPTemplateList(1, 100, getAndSetCategory);
  }

  return (
    <CategorySelect category={category} childcategory={childcategory} />
  );
}

function CategorySelect(props) {
  const { category, childcategory } = props;

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Select Category</h3>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <h5 className="template-title">1. Please select your product's category and childcategory</h5>
        </div>
        <div className="col-xs-12 col-sm-5 col-sm-offset-1">
          <SelectBtn name="category" options={category} />
        </div>
        <div className="col-xs-12 col-sm-5">
          <SelectBtn name="childcategory" options={childcategory} />
        </div>
        <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row">
          <button className="btn btn-primary btn-lg col-xs-12" id="confirm">Confirm</button>
        </div>
      </div>
    </div>
  );
}

function SelectBtn(props) {
  return (
    <div className="dropdown">
      <button className="btn btn-default btn-lg dropdown-toggle btn-select" type="button" id={props.name} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        {props.name}
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" aria-labelledby={props.name}>
        {props.options.map((option) => (
          <li key={option.id} className={option.id===0?'disabled':'able'}><a>{option.name}</a></li>
        ))}
      </ul>
    </div>
  );
}

//--------------------------------------------------------------

function UploadProduct(props) {
  let [image, setImage] = React.useState('');
  const template = props.ptemplate;

  const newProduct = () => {
    $('upload.btn-upload').click();
    const product = {
      ProductID: Number($('#pid').val().trim()),
      name: $('#pname').val().trim(),
      image: $('#image').val(),
      Price: Number($('#price').val().trim()),
      DetailInfo: $('#description').val().trim(),
      category: template.category,
      childcategory: template.childcategory,
      Profit: Number($('#profit').val().trim()),
      Volume: Number($('#volume').val().trim()),
      Weight: Number($('#weight').val().trim()),
      attributes: getAttributes(),
      // priceModel: $('#price-model').val().trim(),
      // quantity: $('#quantity').val().trim(),
      Include: $('#include').val().trim().split(",").filter((item) => item !== "").map((item) => Number(item)),
      Exclude: $('#exclude').val().trim().split(",").filter((item) => item !== "").map((item) => Number(item)),
      Status: Number($('#status').val().trim()),
      CreatorID: Number(localStorage.getItem('id')),
    };
    console.log(product);
    if (!product.image) {
      alert("Please upload image or wait for image to be uploaded");
      return;
    }
    // set button to loading
    $('#upload.btn-upload').prop('disabled', true);
    $('#upload.btn-upload').html('Creating...');
    createProduct(product, (data) => {
      alert(data.message);
      $('#upload.btn-upload').prop('disabled', false);
      $('#upload.btn-upload').html('Create');
      // window.location.href = "/products/";
      getProduct("list", localStorage.getItem('id'), (data) => {
        const pid = data.list.find((item) => item.productid === product.ProductID && item.creatorid === product.CreatorID && item.name === product.name && item.category === product.category && item.childcategory === product.childcategory && item.detailinfo === product.DetailInfo).id || data.list[data.total - 1].id;
        renderStageSet(pid, product.Price);
      }, (err) => {
        alert(err);
      });
    }, (err) => {
      alert(err);
      $('#upload.btn-upload').prop('disabled', false);
      $('#upload.btn-upload').html('Create');
    });
  }

  const getAttributes = () => {
    let attributes = {};
    $('.attributes input').each(function () {
      let attr = $(this).val().trim();
      let attrName = $(this).attr('name');
      let attrType = $(this).data('type');
      if (attr !== "") {
        attributes[attrName] = attrType === "custom" ? attr : attr.split(',').map((item) => item.trim());
      }
    });
    $('.custom-attributes').each(function () {
      let attrName = $(this).find('.attr-name input').val().trim();
      let attrValue = $(this).find('.attr-value input').val().trim().split(',').map((item) => item.trim());
      if (attrName !== "" && attrValue !== "") {
        attributes[attrName] = attrValue;
      }
    });
    return attributes;
  }

  const [customAttributes, setCustomAttributes] = React.useState([]);

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Upload Product</h3>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <h4 className="template-title">{props.ptemplate.category} &gt; {props.ptemplate.childcategory} : {props.ptemplate.templatename}</h4>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <ImageBox size={100} text="upload image" src={image} id="uploadImg" min={3} max={6} />
          <InputBox id="pid" type="number" name="pid" label="Product ID" required={false} defaultValue={template.id} disabled={false} />
          <InputBox id="pname" type="text" name="pname" label="Product Name" required={true} />
          <InputBox id="price" type="number" name="price" label="Price" required={true} />
          <InputBox id="description" name="description" type="text" label="Description" required={true} />
          <InputBox id="profit" label="Profit" type="number" required={true} value={template.profit} disabled={true} />
          <InputBox id="volume" label="Volume" type="number" required={true} />
          <InputBox id="weight" label="Weight" type="number" required={true} />
          <div className="form-group col-md-10 col-md-offset-1" id="attributesWrapper">
            <label htmlFor="attributes">Attributes</label>
            <Attributes attributes={template.attributes} />
            {customAttributes.map((attribute) => (
              attribute
            ))}
            <div className="col-md-10 col-md-offset-1 text-center">
              <button className="btn btn-primary btn-sm" onClick={() => setCustomAttributes([...customAttributes, <EmptyAttributes key={customAttributes.length} />])}>Add new<span className="hidden-xs"> Attribute</span></button>
              <button className="btn btn-danger btn-sm" onClick={() => setCustomAttributes(customAttributes.slice(0, -1))}>Remove<span className="hidden-xs"> Attribute</span></button>
            </div>
          </div>
          <InputBox id="price-model" label="Price Model" type="text" required={true} value={template.attributes.price} disabled={true} />
          {/* <InputBox id="quantity" type="number" name="quantity" label="Quantity" required={true} /> */}
          <InputBox id="include" type="text" name="include" label="Include" required={false} defaultValue={template.include.join()} disabled={false} />
          <InputBox id="exclude" type="text" name="exclude" label="Exclude" required={false} defaultValue={template.exclude.join()} disabled={false} />
          <div className="form-group col-md-10 col-md-offset-1" id="statusWrapper">
            <label htmlFor="status">Status</label>
            <select className="form-control" id="status" defaultValue={1}>
              <option value="2">Inactive</option>
              <option value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>
        </div>
        <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row">
          <button className="btn btn-primary btn-lg col-xs-12" onClick={newProduct}>Create</button>
        </div>
      </div>
    </div>
  );
}

function Attributes(props) {
  const { attributes } = props;

  return (
    <div className="attributes">
      {attributes.attrs.map((attribute) => (
        <div className="form-group" key={attribute.name}>
          <InputBox type="text" name={attribute.name} label={attribute.name} required={attribute.required} data-type={attribute.type} placeholder={attribute.type === "custom" ? "Input custom attribute" : "Input attributes, separated by comma"} defaultValue={attribute.example} />
        </div>
      ))}
    </div>
  );
}

function EmptyAttributes() {
  return (
    <div className="custom-attributes">
      <div className="form-group">
        <div className="col-md-10 col-md-offset-1">
          <div className="col-md-4 row attr-name">
            <input type="text" className="form-control" name="attr-name" placeholder="Attr Name" />
          </div>
          <div className="attr-value">
            <input type="text" className="form-control" name="attr-value" placeholder="Attr Value" />
          </div>
        </div>
      </div>
    </div>
  );
}

//--------------------------------------------------------------
function renderStageSet(pid, price) {
  const container = $("#upload-product");
  console.log(pid, price);

  if (container.length) {
    ReactDOM.render(
      <StageSet price={price} pid={pid} />,
      container[0]
    );
  }
}

function StageSet(props) {
  const [stage, setStage] = React.useState([
    {
      id: 1,
      start: 1,
      end: 99999,
      price: props.price
    }
  ]);

  const handleStageSubmit = () => {
    const stageNum = stage.length;
    let createdNum = 0;
    stage.forEach((item) => {
      const stage = {
        pid: Number(props.pid),
        start: Number(item.start),
        to: Number(item.end),
        price: Number(item.price),
        username: localStorage.getItem('username')
      };
      PStage.createPStage(stage, (data) => {
        createdNum++;
        if (createdNum === stageNum) {
          alert(data.message);
          window.location.href = "/products/";
        }
      }, (err) => {
        alert(err);
      });
    });
  }

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Stage Set</h3>
        </div>
        <div className="vertical-center">
          <div className="col-xs-10 col-sm-9 col-sm-offset-1">
            <div className="alert alert-info">
              <strong>The start of next stage should be the SAME as the end of previous stage!</strong>
            </div>
          <div className="form-group">
            <label htmlFor="stage">Stage</label>
            {stage.map((item, index) => (
              <div className="row mb-small" key={index}>
                <div className="col-sm-4">
                  <InputBox type="number" name="start" label="Start" required={true} min={1} max={999999} defaultValue={item.start} onChange={(e) => {
                    let newStage = [...stage];
                    newStage[index].start = Number(e.target.value);
                    setStage(newStage);
                  }} />
                </div>
                <div className="col-sm-4">
                  <InputBox type="number" name="end" label="End" required={true} min={1} max={999999} defaultValue={item.end} onChange={(e) => {
                    let newStage = [...stage];
                    newStage[index].end = Number(e.target.value);
                    setStage(newStage);
                  }} />
                </div>
                <div className="col-sm-4">
                  <InputBox type="number" name="price" label="Price" required={true} defaultValue={item.price} onChange={(e) => {
                    let newStage = [...stage];
                    newStage[index].price = Number(e.target.value);
                    setStage(newStage);
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-xs-2 col-sm-1">
          <button className="btn btn-primary" onClick={() => setStage([...stage, {
            id: stage.length + 1,
            start: stage[stage.length - 1].end,
            end: 99999,
            price: props.price
          }])}>+</button>
          <button className="btn btn-danger" onClick={() => (stage.length > 1) ? setStage(stage.slice(0, -1)) : null}>-</button>
          </div>
          </div>
        <div className="col-xs-6 col-xs-offset-2 col-sm-4 col-sm-offset-3 row">
          <button className="btn btn-success btn-lg col-xs-12" onClick={handleStageSubmit}>Confirm!</button>
        </div>
      </div>
    </div>
  );
}

export { renderCategorySelect, Attributes };
