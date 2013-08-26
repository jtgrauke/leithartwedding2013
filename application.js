// Create an empty object.
var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

var config = Instagram.Config;
var max = '';
var tag = 'leithartwedding2013';



function generateURL(){

  url = config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?&client_id=" + config.clientID;

  return function(max_id) {

    if(typeof max_id === 'string' && max_id.trim() !== '') {
      url += "&max_tag_id=" + max_id;
    }
    return url;
  };

} generateURL();



function loadInstagrams(max_id) {

    $.ajax({
        type: "GET",
        url: url,
        data: {'client_id': config.clientID, 'max_tag_id': max},
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

        max = data.pagination.next_max_tag_id;
    });
}


function showMore(){

    $('body').on('click', '.paginate', function(e) {
        e.preventDefault();
        loadInstagrams();
    });
}


$(document).ready(function(){

    loadInstagrams();
    showMore();

});

