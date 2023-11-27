import { uploadFile } from "./uploadFile.js";

function InputBox(props) {
    return (
        <div className="col-md-10 col-md-offset-1">
            <div className="form-group">
                <label htmlFor={props.id}>{props.label + ( props.required ? "*" : "" )}</label>
                <input type={props.type} className="form-control" name={props.name} id={props.id} required={props.required} {...props} />
            </div>
        </div>
    );
}

function ImageBox(props) {
    const size = props.size || 200;
    const text = props.text || 'select image';
    const src = props.src || 'http://iph.href.lu/' + size + 'x' + size + '?text=' + text;
    const alt = props.alt || 'upload file';

    const FileBox = (
        <label className="btn btn-default btn-file">
            <img src={src} alt={alt} className="img-thumbnail" />
            <input type="file" id={props.id} style={{ display: 'none' }} onChange={(ev) => {
                let file = ev.target.files[0];
                let reader = new FileReader();
                reader.onload = (e) => {
                    ev.target.previousSibling.src = e.target.result;
                    ev.target.classList.add('uploaded');
                }
                reader.readAsDataURL(file);
                ev.target.nextSibling.nodeValue = file.name;
                console.log(ev.target.nextSibling.nodeValue);
            }} />
            <p className="text-center"></p>
        </label>
    );

    return (
        <div className=" col-md-10 col-md-offset-1">
            <label htmlFor="image-upload">Product Image*</label>
            <div className="image-upload">
                <div className="file-upload thumbnail" id="image-upload">
                    {FileBox}
                    {FileBox}
                    {FileBox}
                    {FileBox}
                </div>
                <div className="caption text-center">
                    <button className="btn btn-primary" id="upload" onClick={
                        () => {
                            let files = document.querySelectorAll('#image-upload input[type="file"].uploaded');
                            let fileNames = document.querySelectorAll('#file-upload p');
                            let formData = new FormData();
                            for (let i = 0; i < files.length; i++) {
                                if (files[i].files.length > 0) {
                                    formData.append('file', files[i].files[0], '<file>');
                                    console.log(fileNames[i]);
                                }
                            }
                            uploadFile(formData, (data) => {
                                console.log(data);
                            });
                        }
                    }>Upload</button>
                    <p className="text-center">The first picture is the main picture of the product</p>
                </div>
            </div>
        </div>
    );
}

export { InputBox, ImageBox };