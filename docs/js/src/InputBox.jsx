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
    return (
        <div className=" col-md-10 col-md-offset-1">
            <label htmlFor="image-upload">Product Image*</label>
            <div className="image-upload">
                <div className="file-upload thumbnail">
                    <label className="btn btn-default btn-file">
                        <img src={src} alt={alt} className="img-thumbnail" />
                        <input type="file" style={{ display: 'none' }} />
                    </label>

                    <label className="btn btn-default btn-file">
                        <img src={src} alt={alt} className="img-thumbnail" />
                        <input type="file" style={{ display: 'none' }} />
                    </label>

                    <label className="btn btn-default btn-file">
                        <img src={src} alt={alt} className="img-thumbnail" />
                        <input type="file" style={{ display: 'none' }} />
                    </label>
                </div>
                <div className="caption">
                    <p className="text-center">The first picture is the main picture of the product</p>
                </div>
            </div>
        </div>
    );
}

export { InputBox, ImageBox };