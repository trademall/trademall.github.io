import { createProduct } from "./product_api.js";
import * as PTemplate from "./ptemplate_api.js";
import { InputBox, ImageBox } from "./InputBox.js";
import { uploadFile } from "./uploadFile.js";

function renderCategorySelect() {
  const container = $("#upload-product");

  if (container.length) {
    ReactDOM.render(
      <CategorySelectContainer />,
      container[0]
    );
  }

  function initFileInput(id) {
    $(id).fileinput({
      showUpload: true,
      showPreview: true,
      showRemove: true,
      multiple: true,
      async: false,
      minFileCount: 1,
      maxFileCount: 4,
      // uploadUrl: "http://54.79.139.73:80/v1/upload",
      uploadExtraData: {
        token: localStorage.getItem("token"),
      },
      allowedFileExtensions: ['jpg', 'png', 'gif'],
      browseClass: "btn btn-primary btn-lg",
      browseLabel: "Select Image",
      browseIcon: '<i class="glyphicon glyphicon-picture"></i> ',
      removeClass: "btn btn-danger btn-lg",
      removeLabel: "Delete",
      removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
      uploadClass: "btn btn-info btn-lg",
      uploadLabel: "Upload",
      uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
    }).on('fileuploaded', function (event, data, previewId, index) {
      if (data.response) {
        const image = data.response;
        console.log(image);
      }
    });
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
    const categories = ptemplates.list.map((ptemplate) => ({
      id: ptemplate.id,
      name: ptemplate.category,
    }));
    setCategory(categories);

    $('.dropdown').on('click', '.dropdown-menu li.able a', function () {
      let target = $(this).html();

      $(this).parents('.dropdown-menu').find('li').removeClass('active');
      $(this).parent('li').addClass('active');
      $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');

      if (target !== "category") {
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
      console.log(category, childcategory);
      if (category !== "category" && childcategory !== "childcategory") {
        const ptemplate = ptemplates.list.filter((ptemplate) => ptemplate.category === category && ptemplate.childcategory === childcategory)[0];
        console.log(ptemplate);
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

function UploadProduct(props) {
  let [image, setImage] = React.useState('');
  let [fileUploaded, setFileUploaded] = React.useState(false);

  React.useEffect(() => {
    if (fileUploaded) {
      setImage(null);
      setFileUploaded(false);
    }
  }, [fileUploaded]);

  const createProduct = () => {
  }

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Upload Product</h3>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <ImageBox size={100} text="upload image" src={image} id="uploadImg" min={3} max={6} />
          <InputBox id="pname" type="text" name="pname" label="Product Name" required={true} />
          <InputBox id="price" type="number" name="price" label="Price" required={true} />
          <InputBox id="description" name="description" type="text" label="Description" required={true} />
          <InputBox id="profit" label="Profit" type="number" required={true} />
          <InputBox id="volume" label="Volume" type="number" required={true} />
          <InputBox id="weight" label="Weight" type="number" required={true} />
          <InputBox id="price" label="Price" type="number" required={true} />
          <InputBox id="quantity" type="number" name="quantity" label="Quantity" required={true} />
          <InputBox id="include" type="text" name="include" label="Include" required={false} />
          <InputBox id="exclude" type="text" name="exclude" label="Exclude" required={false} />
          <div className="form-group col-sm-10 col-sm-offset-1" id="statusWrapper">
            <label htmlFor="status">Status</label>
            <select className="form-control" id="status" defaultValue={1}>
              <option value="2">Inactive</option>
              <option value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>
        </div>
        <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row">
          <button className="btn btn-primary btn-lg col-xs-12" onClick={createProduct}>Create</button>
        </div>
      </div>
    </div>
  );
}

renderCategorySelect();
// renderUploadProduct();

export { renderCategorySelect };
