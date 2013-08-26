instagram = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

var tag = 'leithartwedding2013';
var min = '';

function loadInstagrams() {

    $.ajax({
        type: "GET",
        url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent",
        data: {'client_id': instagram.clientID, 'max_tag_id': min},
        dataType: "jsonp",
        beforeSend: function() {
            $('.header').hide();
        },
        complete: function(){
            $('.header').fadeIn(1000);
            $('.feed li a img').fadeIn(1000);
        }
    }).success(function(photos){
        console.log(photos);
        for(i=0;i<photos.data.length;i++){
            var img = photos.data[i].images.standard_resolution.url;
            var link = photos.data[i].link;
            var likes = photos.data[i].likes.count;
            var photo = "<li><a target='_blank' href='"+link+"'><img src='"+img+"'><span class='overlay'><span class='overlay-inner'><h3 class='likes'><i class='icon-heart'></i>"+likes+"</h3></span></span></a></li>";
            $('ul').append(photo);
            $('.paginate').css('display', 'inline-block');
        }

        min = photos.pagination.next_max_tag_id;

    });

    event.preventDefault();

}

function changeView() {

    $('ul.feed li').toggleClass('two');
    $('.view-toggle i').toggleClass('icon-th-large');
    $('.view-toggle i').toggleClass('icon-th');
}

$(document).ready(function(){

    loadInstagrams();

    $('body').on('click', '.paginate', loadInstagrams);
    $('.header').on('click', '.view-toggle', changeView);

});

