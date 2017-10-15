$(document).ready(function () {

    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });


    starMarkers = [];
    userMarkers = [];


    var greenIcon = L.icon({
        iconUrl: 'images/leaf-green.png',

        iconSize: [38, 95], // size of the icon
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


        var datum = ($('#myForm').serialize()) //this produces: "foo=1&bar=xxx&this=hi"
        console.log(datum)
        console.log(loc._lastCenter.lat)
        console.log(loc._lastCenter.lng)

        requestString = "options?" + "lat=" + loc._lastCenter.lat + "&long=" + loc._lastCenter.lng + datum
        console.log(requestString)

        var root = 'https://jsonplaceholder.typicode.com/posts/1';

        var ourApi = 'http://localhost:8080/options?lat=40.7143528&long=-74.0059731&date=2017-12-05';

        $.ajax({
            url: root,
            method: 'GET'
        }).then(function (data) {
            console.log(data);


            var test_locations =
                {
                    "results": [
                        {
                            "long": -74.0059731,
                            "lat": 75.0059731,
                            "date": "2017-12-01"
                        },
                        {
                            "long": 11.8166,
                            "lat": 122.0942,
                            "date": "2017-12-03"
                        }
                    ]
                }


            var test_locations2 =
                {
                    "results": [
                        {
                            "long": 11.206051,
                            "lat": 90.447886,
                            "date": "2017-11-07"
                        }
                    ]
                }

            if (datum == "date=2017-10-10") {


                console.log("test_locations.results.length = " + test_locations.results.length)
                for (var i = 0; i < test_locations.results.length; i++) {
                    marker = new L.marker([test_locations.results[i].long, test_locations.results[i].lat], {icon: greenIcon})
                        .bindPopup(test_locations.results[i].date)
                        .addTo(map);
                    starMarkers.push(marker);

                    //console.log("[test_locations.results[i].long,test_locations.results[i].lat] = " + [test_locations.results[i].long,test_locations.results[i].lat])
                    //console.log("test_locations.results[i].date = " + test_locations.results[i].date)
                }

            } else {

                console.log("test_locations2.results.length = " + test_locations2.results.length)
                for (var i = 0; i < test_locations2.results.length; i++) {
                    marker = new L.marker([test_locations2.results[i].long, test_locations2.results[i].lat], {icon: greenIcon})
                        .bindPopup(test_locations2.results[i].date)
                        .addTo(map);

                    starMarkers.push(marker);

                    //console.log("[test_locations2.results[i].long,test_locations2.results[i].lat] = " + [test_locations2.results[i].long,test_locations2.results[i].lat])
                    //console.log("test_locations2.results[i].date = " + test_locations2.results[i].date)
                }

            }

        });

        return true;


    }
    //$("#formid").submit();


    /*     $( "myForm" ).on( "submit", function( event ) {
           event.preventDefault();
           console.log( $( this ).serialize() );
          });*/


    // var finalData = datum + currentLocation.latitude;
    // console.log(finalData);

    // bind 'myForm' and provide a simple callback function
    // bind 'myForm' and provide a simple callback function
    //   $('#myForm').ajaxForm(function() {
    //var root = 'https://jsonplaceholder.typicode.com';


    //   });


    // sticky header

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
