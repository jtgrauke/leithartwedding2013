// Create an empty object.
var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

var config = Instagram.Config, url;

function loadInstagrams(photos) {

    var tag = 'leithartwedding2013';
    var max = '';

    $.ajax({
            type: "GET",
            url: config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?&client_id=" + config.clientID + max,
            dataType: "jsonp"
        }).done(function(photos){
            console.log(photos);
            for(i=0;i<photos.data.length;i++){
                var img = photos.data[i].images.low_resolution.url;
                var link = photos.data[i].link;
                $('ul').append("<li><a href='"+link+"'><img src='"+img+"'></a></li>");
                $('.paginate a').attr('data-max-tag-id', photos.pagination.next_max_id).fadeIn();
            }
        });

}

function showMore(){
    $('body').on('click', '.paginate a.btn', function(){
        loadInstagrams();
        return false;
    });
}



$(document).ready(function(){

    loadInstagrams();
    showMore();

});

