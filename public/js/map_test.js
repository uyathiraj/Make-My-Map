/*function initMap() {
        var uluru = {lat: 12.57038129, lng: 76.91999711};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
*/

var selectedmarkers;
function getSelectedMarkers(){
  var markers = localStorage.getItem("markers");
  selectedmarkers = markers;
}

$(document).ready(function(){
    

});



function initMapTest(){
     var latLng = new google.maps.LatLng(49.47805, -123.84716);
     var homeLatLng = new google.maps.LatLng(49.47805, -123.84716);
     var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 12,
       center: latLng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
     var marker1 = new MarkerWithLabel({
       position: homeLatLng,
       draggable: true,
       raiseOnDrag: true,
       map: map,
       labelContent: "$425K",
       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels", // the CSS class for the label
       labelStyle: {opacity: 0.75}
     });
     var marker2 = new MarkerWithLabel({
       position: new google.maps.LatLng(49.475, -123.84),
       draggable: true,
       raiseOnDrag: true,
       map: map,
       labelContent: "$395K",
       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels", // the CSS class for the label
       labelStyle: {opacity: 1.0}
     });
     var iw1 = new google.maps.InfoWindow({
       content: "Home For Sale"
     });
     var iw2 = new google.maps.InfoWindow({
       content: "Another Home For Sale"
     });
     google.maps.event.addListener(marker1, "click", function (e) { iw1.open(map, this); });
     google.maps.event.addListener(marker2, "click", function (e) { iw2.open(map, this); });
}




function initMap(){

  //console.log(localStorage.getItem('markers'));
   var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

  var markers = localStorage.getItem("markers");


  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(26.749980900000001, 76.780005650000007),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

     /*for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });*/
    markersJSON = $.parseJSON(markers);
    markersJSON.forEach(function(val){
      console.log(val.state_id);
      if(val.state_id){
        var mark = $.parseJSON(val["state_id"]);
      
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(mark.Lat,mark.Lng),
        map: map,
        label: "Hello",
        animation: google.maps.Animation.DROP,
        //icon: 
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(val["Text to Display"]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      }
      
    });
    }
