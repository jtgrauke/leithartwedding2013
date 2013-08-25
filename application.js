// Create an empty object.
var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

var config = Instagram.Config;
var max = '';




function generateURL(){
  var tag = 'leithartwedding2013';
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
        beforeSend: function(){$('.feed li a img').fadeIn();},
        complete: function(){$('.feed li a img').fadeIn(1000);}
    }).done(function(data){
        console.log(data);
        for(i=0;i<data.data.length;i++){
            var img = data.data[i].images.standard_resolution.url;
            var link = data.data[i].link;
            var photo = "<li><a target='_blank' href='"+link+"'><img src='"+img+"'></a></li>";
            $('ul').append(photo);
            $('.paginate a').attr('data-max-tag-id', data.pagination.next_max_id).fadeIn();
        }

        max = data.pagination.next_max_tag_id;
    });
}


function showMore(){

    $('body').on('click', '.paginate a.view-more', function(e) {
        e.preventDefault();
        loadInstagrams();
    });
}


$(document).ready(function(){

    loadInstagrams();
    showMore();

});

