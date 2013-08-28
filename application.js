// Object for instagram configuration data
instagram = {
    clientID: '011bdf869056482d849f53ca51875ced',
    apiHost: 'https://api.instagram.com'
};

// Varirables for the tag to pull and min tag id
var tag = 'leithartwedding2013',
    min = '';

// Function to load the Instagrams
function loadInstagrams() {

    // Pull in the data from Instagram
    $.ajax({
        type: "GET",
        url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent",
        data: {'client_id': instagram.clientID, 'max_tag_id': min},
        dataType: "jsonp",
        beforeSend: function() {
            $('.paginate .view-more').text('Loading more photos...');
            $('.header .title').text('Loading...');
        },
        // Now that it's loaded, fade everything in
        complete: function(){
            $('.paginate .view-more').text('View More');
            $('.container').fadeIn(1000);
            $('.feed li a img').fadeIn(1000);
            $('.header .title').text('#' + tag);
        }

    // Upon success - display the photos
    }).success(function(photos){
        for(i=0;i<photos.data.length;i++){
            // Variables that hold the instagram data, the image, link, how many likes, and id of the photo
            var img = photos.data[i].images.standard_resolution.url,
                link = photos.data[i].link,
                likes = photos.data[i].likes.count,
                id = photos.data[i].id,
                photo_content = "<a target='_blank' href='"+link+"'><img src='"+img+"'><span class='overlay'><span class='overlay-inner'><h3 class='likes'><i class='icon-heart'></i>"+likes+"</h3></span></span></a>";
            // If the view toggle is displaying two by two, load the new photos accordingly
            if ($('.feed li').hasClass('two')) {
                var photo = "<li class='two'>"+photo_content+"</li>";
            } else /* Or display them three by three if it's not toggled */ {
                var photo = "<li>"+photo_content+"</li>";
            }
            // Attach the photos to the unordered list
            $('ul').append(photo);
            // Display the view more button to load more photos
            $('.paginate').show();
        }
        // If it's the last photo in the #hashtag series, then don't display the view more button
        if (id === "521245327278927357_255379794") {
            min = '';
            $('.paginate').hide();
            $('.to-top').show();
        } else {
            min = photos.pagination.next_max_tag_id;
        }
    });

}

// Function to toggle between two by two or three by three
function changeView() {

    // If the toggle is on, remove the toggle
    if ($('ul.feed li').hasClass('two')) {
        $('ul.feed li').removeClass('two');
    } else /* Or if it's not then turn it on */ {
        $('ul.feed li').addClass('two');
    }

    // Change the icon to show if it's two by two or three by three
    $('.view-toggle i').toggleClass('icon-th-large icon-th');
}

$(document).ready(function(){

    loadInstagrams();

    $('body').on('click', '.paginate', loadInstagrams);
    $('.header').on('click', '.view-toggle', changeView);
    $('body').on('click', '.to-top', function(){
        //1 second of animation time
        //html works for FFX but not Chrome
        //body works for Chrome but not FFX
        //This strange selector seems to work universally
        $("html, body").animate({scrollTop: 0}, 1000);
    });

});

