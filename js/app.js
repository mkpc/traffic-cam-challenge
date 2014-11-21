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


    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };
        var map =new google.maps.Map(mapElem,{
            center: center,
            zoom: 12
        });

        var infoWindow = new  google.maps.InfoWindow();

        $.getJSON("http://data.seattle.gov/resource/65fc-btcc.json")
            .done(function(data){
                list =data;
                data.forEach(function(list,itemIdex){
                    var marker = new google.maps.Marker({
                        position:{
                            lat: Number(list.location.latitude),
                            lng: Number(list.location.longitude)
                },
                map: map
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                var html  = '<h2>' + list.cameralabel + '</h2>';
                    html += '<img src="' + list.imageurl.url + '">'

                infoWindow.setContent(html);
                infoWindow.open(map, this);
                });
            })
})

            .fail(function(error){
                console.log(error)
            })
            .always(function(){
                $('#ajax-loafer').fadeOut()
            });

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









