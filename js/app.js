// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function(){
    var mapElem = document.getElementById('map');

    var point;
    var i = 0;
    var lat;
    var lng;
    var list;
    var markers = [];
    var infoWindow =null;
    var text




    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };
        var map =new google.maps.Map(mapElem,{
            center: center,
            zoom: 12
        });

    var markerBounds = new google.maps.LatLngBounds();

    var infoWindow = new  google.maps.InfoWindow();

        $.getJSON("http://data.seattle.gov/resource/65fc-btcc.json")
            .done(function(data){
                list =data;


                data.forEach(function(list,itemIdex){
                    var point = new google.maps.LatLng(Number(list.location.latitude),Number(list.location.longitude));
                    var marker = new google.maps.Marker({
                        position:point,
                map: map,
                title: list.cameralabel,
                animation: google.maps.Animation.DROP
            });

            markerBounds.extend(point)

            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                var html  = '<h2>' + list.cameralabel + '</h2>';
                    html += '<img src="' + list.imageurl.url + '">';


                infoWindow.setContent(html);
                infoWindow.open(map, this);

                map.panTo(marker.getPosition())
                });
            })
})

            .fail(function(error){
                console.log(error)
            })
            .always(function(){
                $('#ajax-loafer').fadeOut()
            });

    $("#search").bind('search keyup',function(){
        //var searchString = $('#search').val().toLowerCase();
        var input = document.getElementById('search').value;
        input = input.toLowerCase();
        var idx;
        for (idx = 0; idx < markers.length; idx++) {
            var tempMarker = markers[idx];
            var trafficCamName = tempMarker.name.toLowerCase();
            if (!trafficCamName.contains(searchString)) {
                tempMarker.setMap(null);
            } else { //if the input text from the search box does match the name of a camera
                tempMarker.setMap(map);
            }
        }



        //var inputName =$(this).inputName().toLowerCase();
        //
        //$(markers).setMap(null);
        //
        //$(markers).each(function(){
        //    var text = $(this).text().toLowerCase();
        //    if(text.indexOf(inputName) != -1){
        //        $(this).setMap();
        //    }
        //})


    })

})



        //
        //    for (var i = 0; i < data.length; i++) {
        //        infoWindow.setContent("<h2>"+i+"</h2>");
        //
        //        lat = parseFloat(data[i].location.latitude);
        //        lng = parseFloat(data[i].location.longitude);
        //
        //        point = new google.maps.LatLng(lat,lng);
        //        markers[i] = new google.maps.Marker({
        //            position: point,
        //            map: map,
        //            animation: google.maps.Animation.DROP,
        //            title: data[i].cameralabel,
        //            url: data[i].umageurl
        //        });
        //        var marker = markers[i];
        //         //infoWindow = new google.maps.InfoWindow({
        //         //    content:
        //         //   })
        //    }
        //
        //})
        //google.maps.event.addListener(marker, 'click', function() {
        //    infoWindow.open(map, this)
        //    consoles.log("asdf")
        //})

        //google.maps.event.addListener(marker, 'click', function() {
        //    console.log("maroc")
        //})
        //}
        //    infoWindow.open(map, marker);
        //    console.log(lat + " and " + lng);
        //});









