var map, popup, Popup;


var markers = localStorage.getItem("markers");
//createDiv();
$(document).ready(function(){
	$('#capture').click(function(){
		html2canvas(document.querySelector("#map"), {
            useCORS: true,
//                        allowTaint:true,
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                // Convert and download as image 
                Canvas2Image.saveAsPNG(canvas); 
                //document.body.appendChild(canvas);
                $("#img-out").append(canvas);
                // Clean up 
                //document.body.removeChild(canvas);
            }
        });


		/*html2canvas(document.querySelector("#map")).then(canvas => {
		console.log('Capture called');
    	document.body.appendChild(canvas)*/
	});
	 
	});
	

function captureMap(){

	
}


function createDiv(){

	$('<div id="content1">hello</div>').appendTo('#content');
	$('<div id="content2">hello</div>').appendTo('#content');
	/*var iDiv = document.createElement('div');
	iDiv.id = 'content2';
	iDiv.className = 'block';
	document.getElementsByTagName('body')[0].appendChild(iDiv);*/
}

/** Initializes the map and the custom popup. */
function initMap() {
  	definePopupClass();

  	map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(26.749980900000001, 76.780005650000007),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

	
	var i=1;
	markersJSON = $.parseJSON(markers);
	console.log(markersJSON);
	markersJSON.forEach(function(val){
		console.log("location to be mapped :"+JSON.stringify(val))
	  	console.log(val._id);
	  	if(val._id){
	  		var divContent = '<div id="content'+i+'">'+val["Text to Display"]+'</div>';
	  		console.log(divContent);
	  		$(divContent).appendTo('#content');

	       	//var mark = $.parseJSON(val["_id"]);
			popup = new Popup(new google.maps.LatLng(val.Lat,val.Lng),document.getElementById('content'+i));
			i++;
			popup.setMap(map);
		}

	});
}
/** Defines the Popup class. */
function definePopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  Popup = function(position, content) {
    this.position = position;

    content.classList.add('popup-bubble-content');

    var pixelOffset = document.createElement('div');
    pixelOffset.classList.add('popup-bubble-anchor');
    pixelOffset.appendChild(content);

    this.anchor = document.createElement('div');
    this.anchor.classList.add('popup-tip-anchor');
    this.anchor.appendChild(pixelOffset);

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation();
  };
  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };

  /** Called when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the popup when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.anchor.style.left = divPosition.x + 'px';
      this.anchor.style.top = divPosition.y + 'px';
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  };

  /** Stops clicks/drags from bubbling up to the map. */
  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = 'auto';

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
     'pointerdown']
        .forEach(function(event) {
          anchor.addEventListener(event, function(e) {
            e.stopPropagation();
          });
        });
  };
}