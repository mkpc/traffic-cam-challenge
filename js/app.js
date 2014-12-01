// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";


$(document).ready(function(){
    var mapElem = document.getElementById('map');

    var point;
    var i = 0;
    var lat;
    var lng;
    var list;
    var markers = [];
    var text;
    var cameraIcon = 'CamIcon.png';

        var map =new google.maps.Map(mapElem,{
            center: {
                lat: 47.6,
                lng: -122.3
            },
            zoom: 12
        });

    var markerBounds = new google.maps.LatLngBounds();
    var infoWindow = new  google.maps.InfoWindow();

        $.getJSON("http://data.seattle.gov/resource/65fc-btcc.json")
            .done(function(data){
                list = data;


                data.forEach(function(camera){
                    var point = new google.maps.LatLng(Number(camera.location.latitude),Number(camera.location.longitude));
                    var marker = new google.maps.Marker({
                        position:point,
                        map: map,
                        title: camera.cameralabel,
                        animation: google.maps.Animation.DROP,
                        icon: cameraIcon

                    });

            markerBounds.extend(point);

            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                var html  = '<h2>' + camera.cameralabel + '</h2>';
                    html += '<img src="' + camera.imageurl.url + '">';


                infoWindow.setContent(html);
                infoWindow.open(map, this);

                map.panTo(marker.getPosition())
            });

                $('#search').bind('search keyup', function(){
                  var searchString = $(this).val().toLowerCase();
                      if(camera.cameralabel.toLowerCase().indexOf(searchString) < 0){
                          marker.setMap(null);
                      }else{
                          marker.setMap(map);
                      }
                });
            });

            google.maps.event.addListener(map, 'click', function(){
                infoWindow.close();
            });
})

            .fail(function(error){
                console.log(error)
            })
            .always(function(){
                $('#ajax-loafer').fadeOut()
            });
});

