import { ImgDiv } from "./renderList.js";
import { getCatalog } from "./catalog.js";

function RenderCatalog(data) {
    const catalog = $('.content')[0];
    ReactDOM.render(<ProductCatalog catalog={data} />, catalog);
}

function TextDiv(props) {
    return (
        <div className="textDiv">
            <h4><a href={"/products/details/?id=" + props.id}>{props.name}</a></h4>
            <p><span>{Object.values(props.attributes).join(', ')}</span>
            <span className="number pull-right text-large text-primary" id="number">× {props.num}</span></p>
            <h4 className="price" id="price"><span className="price-symbol">$</span>{props.price}</h4>
        </div >
    );
}

function FootBtns(props) {
    function confirmDelete() {
        $('#' + props.cid + ' .deleteBtn').removeClass('hidden');
        $('#' + props.cid + ' .operateBtn').addClass('hidden');
    }

    function cancelDelete() {
        $('#' + props.cid + ' .deleteBtn').addClass('hidden');
        $('#' + props.cid + ' .operateBtn').removeClass('hidden');
    }

    function deleteCatalog() {
        const url = 'http://47.89.209.202:80/v1/catalog/' + props.cid;
        $.ajax({
            url: url,
            type: 'DELETE',
            headers: {
                'token': localStorage.getItem('token')
            },
            success: function (res) {
                $('#' + props.cid + ' .deletePrompt').removeClass('hidden');
                $('#' + props.cid + ' .deleteBtn').addClass('hidden');
                if (res.code == 200) {
                    alert('Delete Success!');
                    window.location.reload();
                } else {
                    // alert('Delete Failed!');
                    cancelDelete();
                }
            },
            error: function (result) {
                // alert('Delete Failed!');
                cancelDelete();
            }
        });
    }

    return (
        <div className="footDiv">
            <div className="footBtn text-center operateBtn">
                <button className="btn btn-template-main"><a href={"/products/details/?id=" + props.id + "&edit=true&cid=" + props.cid}>Edit</a></button>
                <button className="btn btn-default"><a href={"/products/details/?id=" + props.id}>Details</a></button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
            <div className="footBtn text-center deleteBtn hidden">
                <button className="btn btn-danger" onClick={deleteCatalog}>Confirm</button>
                <button className="btn btn-default" onClick={cancelDelete}>Cancel</button>
            </div>
            <div className="text-center deletePrompt hidden">
                <h5>This product has been deleted.</h5>
            </div>
        </div>
    );
}

function ProductDiv(props) {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" id={props.cid}>
            <div className="commodity">
                <ImgDiv image={props.image} name={props.name} id={props.pid} disableCache={false} />
                <TextDiv name={props.name} price={props.price} id={props.pid} attributes={props.attributes} num={props.num} />
                <FootBtns cid={props.cid} id={props.pid} />
            </div>
        </div>
    );
}

function ProductCatalog(props) {
    const catalog = props.catalog;
    const catalogItems = catalog.map((product) =>
        <ProductDiv key={product.id} cid={product.id} image={product.attributes.image} name={product.attributes.name} price={product.attributes.price} pid={product.attributes.pid} attributes={ product.attributes.attributes } num={product.attributes.num} />
    );
    return (
        <div className="commodities">
            {catalogItems}
            <button className="btn btn-template-main btn-circle btn-lg" id="printBtn" onClick={handlePrint}><i className="fa fa-print"></i></button>
        </div>
    );
}

function handlePrint() {
    generatePDF();
}

function generatePDF() {
    $('#printBtn').html('<i class="fa fa-spinner fa-spin"></i>');
    $('#printBtn').attr('disabled', true);
    const uid = localStorage.getItem('id');
    getCatalog(uid, function (data) {
        const catalog = data.map((product) => {
            const attributes = Object.keys(product.attributes.attributes).map((key) => {
                return key === 'Shipping' ? '' : product.attributes.attributes[key];
            }).join(', ');
            return [product.attributes.name, attributes, product.attributes.attributes.Shipping[0], product.attributes.num, '$'+product.attributes.price];
        });
        try {

            const doc = new jsPDF();
            const header = function (data) {
                doc.setFontSize(24);
                doc.setTextColor(40);
                doc.setFontStyle('bold');
                doc.text("Catalog", data.settings.margin.left, 20);
            };
            const options = {
                beforePageContent: header,
                margin: {
                    top: 30
                },
                // startY: doc.autoTableEndPosY() + 20
            };
            doc.autoTable(['Name', 'Attributes', 'Shipping', 'Number', 'Price'], catalog, options);
            doc.save('catalog.pdf');
        } catch (error) {
            console.log(error);
            alert('Failed to generate catalog!');
        }

        $('#printBtn').html('<i class="fa fa-print"></i>');
        $('#printBtn').attr('disabled', false);
    }, function () {
        $('#printBtn').html('<i class="fa fa-print"></i>');
        $('#printBtn').attr('disabled', false);
        alert('Failed to get catalog!');
    });
}

// function printCatalog() {
//     const scrollHeight = $(document).height();
//     // scroll to top
//     window.scrollTo(0, 0);
//     const catalog = $('#content')[0];
//     const width = catalog.clientWidth;
//     const height = catalog.clientHeight;
//     const offsetTop = catalog.offsetTop;
//     const offsetLeft = catalog.offsetLeft;
//     const scale = 2;

//     const canvas = document.createElement('canvas');
//     canvas.width = width * scale;
//     canvas.height = height * scale;
//     canvas.getContext('2d').scale(scale, scale);
//     canvas.getContext('2d').translate(-offsetLeft, -offsetTop);
//     const options = {
//         background: '#fff',
//         scale: scale,
//         canvas: canvas,
//         width: width,
//         height: height,
//         dpi: 172,
//         onrendered: function (canvas) {
//             const contentWidth = canvas.width;
//             const contentHeight = canvas.height;
//             const pageHeight = contentWidth / 592.28 * 841.89;
//             let leftHeight = contentHeight;
//             let position = 0;
//             const imgWidth = 595.28;
//             const imgHeight = 592.28 / contentWidth * contentHeight;
//             const pageData = canvas.toDataURL('image/jpeg', 1.0);
//             const pdf = new jsPDF('', 'pt', 'a4');
//             if (leftHeight < pageHeight) {
//                 pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
//             } else {
//                 while (leftHeight > 0) {
//                     pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
//                     leftHeight -= pageHeight;
//                     position -= 841.89;
//                     if (leftHeight > 0) {
//                         pdf.addPage();
//                     }
//                 }
//             }
//             pdf.save('catalog.pdf');
//             // scroll back
//             window.scrollTo(0, scrollHeight);
//         }
//     };

//     html2canvas(catalog, options);

// }

export { RenderCatalog };
