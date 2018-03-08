function getMarkers(){
	$.ajax({
	            url: '/markers',
	            type: 'get',
	            contentType: "application/json; charset=utf-8",
	            success: function (data) {
	                //$('#target').html(data.msg);
	                return data;
	            }
	            
	        });
}
