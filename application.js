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
            $('ul.feed li').addClass('loading');
        },
        complete: function(){
            $('ul.feed li').removeClass('loading');
            $('.header').fadeIn(1000);
            $('.feed li a img').fadeIn(1000);
        }
    }).success(function(photos){
        console.log(photos);
        for(i=0;i<photos.data.length;i++){
            var img = photos.data[i].images.standard_resolution.url;
            var link = photos.data[i].link;
            var likes = photos.data[i].likes.count;
            var id = photos.data[i].id;
            var photo_content = "<a target='_blank' href='"+link+"'><img src='"+img+"'><span class='overlay'><span class='overlay-inner'><h3 class='likes'><i class='icon-heart'></i>"+likes+"</h3></span></span></a>";
            if ($('.feed li').hasClass('two')) {
                var photo = "<li class='two'>"+photo_content+"</li>";
            } else {
                var photo = "<li>"+photo_content+"</li>";
            }
            $('ul').append(photo);
            $('.paginate').css('display', 'inline-block');
        }
        if (id === "521245327278927357_255379794") {
            min = '';
            $('.paginate').hide();
        } else {
            min = photos.pagination.next_max_tag_id;
        }
    });

    event.preventDefault();

}

function changeView() {

    if ($('ul.feed li').hasClass('two')) {
        $('ul.feed li').removeClass('two');
    } else {
        $('ul.feed li').addClass('two');
    }

    $('.view-toggle i').toggleClass('icon-th-large icon-th');
}

$(document).ready(function(){

    loadInstagrams();

    $('body').on('click', '.paginate', loadInstagrams);
    $('.header').on('click', '.view-toggle', changeView);

});

