$(document).ready(function () {

    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });

    starMarkers = [];
    userMarkers = [];

    var greenIcon = L.icon({
        iconUrl: 'images/leaf-green.png',

        iconSize: [40, 40], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var map = L.map('map').setView([11.206051, 122.447886], 8);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);

    L.Control.geocoder().addTo(map);


    var loc = map.on('click', function (e) {

        if (userMarkers && userMarkers.length) {
            console.log(userMarkers.length)
            //not empty
            for (var i = 0; i < userMarkers.length; i++) {
                map.removeLayer(userMarkers[i]);
            }
        } else {
            console.log(userMarkers.length)
            //empty
        }

        var marker = new L.marker(e.latlng).addTo(map);
        console.log("Location changed. New location (" + e.latlng.lat + ", " + e.latlng.lng + ")");
        userMarkers.push(marker);

    });

    beforeSubmit = function () {

        for (var i = 0; i < starMarkers.length; i++) {
            map.removeLayer(starMarkers[i]);
        }


        var datum = ($('#myForm').serialize());
        console.log(datum);
        console.log(loc._lastCenter.lat);
        console.log(loc._lastCenter.lng);

        var requestString = "options?" + "lat=" + loc._lastCenter.lat + "&long=" + loc._lastCenter.lng + '&' + datum;
        console.log(requestString);

        var ourApi = 'http://localhost:8080/' + requestString;

        $.ajax({
            url: ourApi,
            data: {
                format: 'json'
            },
            error: function (xhr, status, error) {
                alert("error" + error);
            },
            dataType: 'json',
            success: function (data) {
                console.log("data.results.length = " + data.length)
                for (var i = 0; i < data.length; i++) {
                    console.log("lat=" + data[i].latitude);
                    console.log("lon=" + data[i].longitude);
                    var marker = new L.marker([data[i].latitude, data[i].longitude], {icon: greenIcon})
                        .bindPopup(data[i].date)
                        .addTo(map);

                    starMarkers.push(marker);
                }
            },
            type: 'GET'
        });

        return true;

    };

    $(window).bind('scroll', function () {
        var navHeight = 50;
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