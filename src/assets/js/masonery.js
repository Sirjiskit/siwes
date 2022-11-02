$(function() {
    setTimeout(function() {
        $("#masonry").imagesLoaded().always(function(a) { $("#masonry").masonry({ itemSelector: ".item" }) });
        var $container = $("#masonry");
        $container.masonry({ itemSelector: ".item" }), $(document).ready(function(a) { setTimeout(function() { setTimeout(function() { $("#masonry").animate({ opacity: 1 }) }, 200) }, 300) });
    }, 500);
});