$(function () {

    AOS.init({
        once: true
    });

    $(".home-slider__slick").slick({
        dots: true,
        // autoplay: true,
        autoplaySpeed: 5000
    })

    $(".slider-fade").slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    })

    $(".menu-toggle").on("click", function (e) {
        $(".header nav").slideToggle();
        e.preventDefault()
    });

    $('.counter').counterUp({
        delay: 10,
        time: 1500
    });

    if ($(".about-slick").length) {
        $(".about-slick").slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        variableWidth: false,
                    }
                }
            ]
        })
    }

    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none',
            nextEffect: 'none',
            prevEffect: 'none',
            padding: 15
        });
    }

    var findMap = document.getElementsByClassName('gmap');
    var scriptUrl = "https://maps.google.com/maps/api/js" + "?key=AIzaSyB2WlL5AOC7X-uLwvBaqJzNKN5HDbRHttU";

    var loadMap = function(){
        for (var i = findMap.length - 1; i >= 0; i--) {
            var myMap = findMap[i];

            var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'));
            var zoom  = parseInt(myMap.getAttribute('data-zoom')) || 16;

            var map = new google.maps.Map(myMap, {
                zoom: zoom,
                center: center,
                disableDefaultUI: false,
                scrollwheel: false
            });

            var markers = document.getElementsByClassName('gmap-marker');

            if (markers.length) {
                for (var z = markers.length - 1; z >= 0; z--) {
                    var marker_item = markers[z];
                    var markerOptions = {
                        map: map,
                        icon: marker_item.getAttribute('data-icon'),
                        position: new google.maps.LatLng(marker_item.getAttribute('data-lat'), marker_item.getAttribute('data-lon'))
                    };
                    var markerw = new google.maps.Marker(markerOptions);
                }
            }


        }
    };
    if (findMap.length) {
        var s = document.createElement( 'script' );
        s.setAttribute( 'src', scriptUrl );
        s.onload=loadMap;
        document.body.appendChild( s );
    }
});