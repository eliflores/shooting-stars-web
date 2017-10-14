// Animations
var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(function (direction) {

        if (direction === 'down' && !$(this.element).hasClass('animated')) {

            i++;

            $(this.element).addClass('item-animate');
            setTimeout(function () {

                $('body .animate-box.item-animate').each(function (k) {
                    var el = $(this);
                    setTimeout(function () {
                        el.addClass('fadeInUp animated');
                        el.removeClass('item-animate');
                    }, k * 200, 'easeInOutExpo');
                });

            }, 100);

        }

    }, {offset: '85%'});
};

$(document).ready(function () {

    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });

    var loc = $('#us3').locationpicker({
        onchanged: function (currentLocation, radius, isMarkerDropped) {
            console.log("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude + ")");
        }
    });

    beforeSubmit = function () {

        var datum = ($('#myForm').serialize()) //this produces: "foo=1&bar=xxx&this=hi"
        console.log(datum)
        console.log(loc.locationpicker.defaults.location.latitude)
        console.log(loc.locationpicker.defaults.location.longitude)

        requestString = "options?" + "lat=" + loc.locationpicker.defaults.location.latitude + "&long=" + loc.locationpicker.defaults.location.longitude + datum
        console.log(requestString)

        var root = 'https://jsonplaceholder.typicode.com';

        var ourApi = 'http://localhost:8080/options?lat=40.7143528&long=-74.0059731&date=2017-12-05';

        $.ajax({
            url: ourApi,
            method: 'GET'
        }).then(function (data) {
            console.log(data);
        });

        return true


    };

    // sticky header

    $(window).bind('scroll', function () {
        var navHeight = $(window).height() - 70;
        if ($(window).scrollTop() > navHeight) {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    });
});

// Add smooth scrolling to all links
$("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});
	