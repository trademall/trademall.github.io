import { createProduct } from "./product_api.js";
import * as PTemplate from "./ptemplate_api.js";
import { InputBox, ImageBox } from "./InputBox.js";
import { uploadFile } from "./uploadFile.js";

function renderCategorySelect() {
  const container = $("#upload-product");
  PTemplate.getPTemplateList(1, 10, (ptemplates) => {
    const categories = ptemplates.list.map((ptemplate) => ({
      id: ptemplate.id,
      name: ptemplate.category,
    }));
    const childcategories = ptemplates.list.map((ptemplate) => ({
      id: ptemplate.id,
      name: ptemplate.childcategory,
    }));

    if (container.length) {
      ReactDOM.render(
        <CategorySelect categories={categories} childcategories={childcategories} />,
        container[0],
        () => {
          $("#confirm").click(() => {
            const category = $("#category").text();
            const childcategory = $("#childcategory").text();
            console.log(category, childcategory);
            if (category !== "Category" && childcategory !== "Child Category") {
              // $("#upload-product").empty();
              renderUploadProduct();
            }
          });
        }
      );

      $('.dropdown').on('click', '.dropdown-menu li a', function () {
        var target = $(this).html();

        //Adds active class to selected item
        $(this).parents('.dropdown-menu').find('li').removeClass('active');
        $(this).parent('li').addClass('active');

        //Displays selected text on dropdown-toggle button
        $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
      });
    }
  });
}

function renderUploadProduct() {
  const container = $("#upload-product");
  if (container.length) {
    ReactDOM.render(
      <UploadProduct />,
      container[0]
    );
  }
}

function CategorySelect(props) {
  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Select Category</h3>
        </div>
        <div className="col-xs-12 col-sm-5 col-sm-offset-1">
          <SelectBtn name="category" options={props.categories} />
        </div>
        <div className="col-xs-12 col-sm-5">
          <SelectBtn name="childcategory" options={props.childcategories} />
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
          <li key={option.id}><a>{option.name}</a></li>
        ))}
      </ul>
    </div>
  );
}

function UploadProduct() {
  let [image, setImage] = React.useState(null);
  let [fileUploaded, setFileUploaded] = React.useState(false);

  React.useEffect(() => {
    if (fileUploaded) {
      setImage(null);
      setFileUploaded(false);
    }
  }, [fileUploaded]);

  return (
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="heading">
          <h3>Upload Product</h3>
        </div>
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <ImageBox size={100} text="upload image" src={image} onChange={(e) => setImage(e.target.value)} />
          <InputBox id="pname" type="text" name="pname" label="Product Name" required={true} />
          <InputBox id="price" type="number" name="price" label="Price" required={true} />
          <InputBox name="description" type="text" label="Description" required={true} />
          <InputBox id="quantity" type="number" name="quantity" label="Quantity" required={true} />
        </div>
        <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 row">
          <button className="btn btn-primary btn-lg col-xs-12" onClick={createProduct}>Upload</button>
        </div>
      </div>
    </div>
  );
}

renderCategorySelect();
// renderUploadProduct();

export { renderCategorySelect, renderUploadProduct };
