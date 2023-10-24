// send request to get products list
// get the token from the cookie
// send the request to the server
// get the response
// apend items to the page
// if the response is not 200, show the error message
// if the response is 200, show the products list
// if the response is 401, redirect to login page
// if the response is 403, redirect to login page
// if the response is 404, redirect to 404 page

// using jquery and react and ajax

// example of the products list:
// <div class="row commodities">
// {{ range .Site.Data.products.data.list }}
// <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
//     <div class="commodity">
//         <div class="image">
//             <a href="details?id={{.id}}">
//                 <img src="{{ .image | relURL }}" alt="{{ .name }}" class="img-responsive">
//             </a>
//         </div>
//         <!-- /.image -->
//         <div class="text">
//             <h4><a href="details?id={{.id}}">{{ .name }}</a></h4>
//             <h4 class="price" id="price"><span class="price-symbol">$</span>{{ .price }}</h4>
//         </div>
//         <!-- /.text -->
//     </div>
//     <!-- /.commodity -->
// </div>
// <!-- /.col-md-3 -->
// {{ end }}
// </div>

var products = {
    init: function () {
        this.initData();
        this.initEvent();
    },
    initData: function () {
        var self = this;
        var url = "/productlist/4";
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                self.render(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    initEvent: function () {
        var self = this;
        var $commodities = $(".commodities");
        $commodities.on("click", ".commodity", function () {
            var $this = $(this);
            var id = $this.data("id");
            window.location.href = "/details?id=" + id;
        });
    },
    render: function (data) {
        var $commodities = $(".commodities");
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            html += '<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">';
            html += '<div class="commodity" data-id="' + item.id + '">';
            html += '<div class="image">';
            html += '<a href="details?id=' + item.id + '">';
            html += '<img src="' + item.image + '" alt="' + item.name + '" class="img-responsive">';
            html += '</a>';
            html += '</div>';
            html += '<div class="text">';
            html += '<h4><a href="details?id=' + item.id + '">' + item.name + '</a></h4>';
            html += '<h4 class="price" id="price"><span class="price-symbol">$</span>' + item.price + '</h4>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        $commodities.html(html);
    }
};
