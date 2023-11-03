function InputBox(props) {
    return (
        <div className="col-md-10 col-md-offset-1">
            <div className="form-group">
                <label htmlFor={props.id}>{props.label + ( props.required ? "*" : "" )}</label>
                <input type={props.type} className="form-control" name={props.name} id={props.id} required={props.required} />
            </div>
        </div>
    );
}

export { InputBox };