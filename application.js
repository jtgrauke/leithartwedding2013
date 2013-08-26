// Create an empty object.
var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

var config = Instagram.Config;
var min = '';
var tag = 'leithartwedding2013';


function loadInstagrams(min_id) {

    $.ajax({
        type: "GET",
        url: config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?",
        data: {'client_id': config.clientID, 'max_tag_id': min},
        dataType: "jsonp",
        complete: function(){
            $('.feed li a img').fadeIn(1000);
        }
    }).success(function(data){
        console.log(data);
        for(i=0;i<data.data.length;i++){
            var img = data.data[i].images.low_resolution.url;
            var link = data.data[i].link;
            var photo = "<li><a target='_blank' href='"+link+"'><img src='"+img+"'></a></li>";
            $('ul').append(photo);
            $('.paginate').attr('data-max-tag-id', data.pagination.next_max_id).css('display', 'inline-block');
        }

        min = data.pagination.next_max_tag_id;
    });
}


$(document).ready(function(){

    loadInstagrams();

    $('body').on('click', '.paginate', function(e) {
        e.preventDefault();
        loadInstagrams();
    });

});

