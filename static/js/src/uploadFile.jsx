class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isUploading: false,
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const file = event.target.files[0];
        this.setState(() => ({ file }));
        this.handleUpload(file);
    }

    handleUpload(file) {
        const storageRef = firebase.storage().ref(`images/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState(() => ({
                progress: percentage,
                isUploading: true
            }));
        }, (error) => {
            console.log(error.message);
        }, () => {
            this.setState(() => ({
                progress: 100,
                isUploading: false
            }));
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <img src={this.state.file} />
            </div>
        );
    }
}