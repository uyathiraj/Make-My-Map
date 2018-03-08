
var i=1;
function getOptions(sucess,failure){
	$.ajax({
	            url: '/options',
	            type: 'get',
	            contentType: "application/json; charset=utf-8",
	            success: function (data) {
	                //$('#target').html(data.msg);
	                sucess(data);
	            },
	            error: function(data){
	            	failure(data);
	            }
	            
	        });
}

function tabletoJson(){
	var heads = [];
	$("thead").find("th").each(function () {
  		heads.push($(this).text().trim());
	});
	//heads.push("_id");
	var rows = [];
	$("tbody tr").each(function () {
	  	cur = {};
	  	$(this).find("td").each(function(i, v) {
	  		if($(this))
	    	cur[heads[i]] = $(this).text().trim();
	  	});
	  	rows.push(cur);
	  	cur = {};
	});
	//console.log(rows);
	return rows;
}



function validateInput(){
	var stateIdSelected = $("#countrySelecter").val();
	var stateSelected = $("#countrySelecter").find(":selected").text();
	var textToDisplay = $("#textToDisplayId").val();

	if(stateSelected  == "" | textToDisplay == ""){
		
		return false;
	}
	return true;
}




/*var fileUpload = function(){
	console.log("submitted");
	var filename = $('input[type=file]').val().split('\\').pop();
	console.log(filename);
	var file_data = $("#fileBrowseBtn").prop("files")[0];
	console.log(file_data);
	var form_data = new FormData();
	form_data.append("file", file_data);
	$.ajax({
		url:"/",

	});
}*/

var excelFileUploaded;


function getExcelFile(e){
	var files = e.target.files;
    var i, f;
    console.log(files);
 	//Loop through files
    //for (i = 0, f = files[i]; i != files.length; ++i) {
    f = files[0];
    $('#selectedFile').val(f.name);
    excelFileUploaded=f;
    console.log("Enabling upload");
   	$('#uploadFileBtn').prop('disabled',false);
    return f;
}

function parseExcel(){
	//Get the files from Upload control
    /*var files = e.target.files;
    var i, f;
    console.log(files);
 	//Loop through files
    //for (i = 0, f = files[i]; i != files.length; ++i) {
    	f = files[0];*/
    	f= excelFileUploaded;
    	//$('#selectedFile').val(f.name);
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            var result;
            var workbook = XLSX.read(data, { type: 'binary' });
            
            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (roa.length > 0) {
                    result = roa;
                }
            });
           //Get the first column first cell value
           //alert(JSON.stringify(result));
            
            addRowsFromJSON(result);
            
        };
        
        reader.readAsArrayBuffer(f);
    //}
    

}

function addRow(i,jsonObj){
	/*var stateSelected = $("#countrySelecter").find(":selected").text();
	var stateIdSelected = $("#countrySelecter").val();
	var textToDisplay = $("#textToDisplayId").val();*/
	var stateSelected="",stateIdSelected="",valueToDisplay='',textToDisplay='';
	if(jsonObj.Name){
		stateSelected = jsonObj.Name;
		
	}
	if(jsonObj.Text){
		textToDisplay = jsonObj.Text;
	}
	if(jsonObj.Value){
		valueToDisplay = jsonObj.Value;
	}
	if(jsonObj._id){
		stateIdSelected = jsonObj._id;
	}
	$("#addr"+i).html("<td>"
				+stateSelected+"</td><td style='display:none'>"
				+stateIdSelected+"</td><td>"
				+textToDisplay+"</td><td>"
				+valueToDisplay+"</td><td><button type='submit' class='btn btn-danger' name='deleteBtn'>Delete</button></td>");
	$('#Statetable').append('<tr id="addr'+(i+1)+'"></tr>');
}

function addRowsFromJSON(jsonData){
	jsonData.forEach(function(val){
		
		//val.Id=`{"Lat": "11.66702557","Lng": "92.735982620000001"}`;
		var localMarkers = $.parseJSON(localStorage.getItem("markers"));

		localMarkers.forEach(function(marker){
			if(marker.Name == val.Name){
				val._id = marker._id;
				console.log(val);
				addRow(i,val);
				i++;
			}
			
		});
		
	});
}


$(document).ready(function(){

	console.log("On ready");
	$('#uploadFileBtn').prop('disabled',true);
	$("#uploadFileBtn").click(function(){
		console.log("clicked");

		parseExcel();

	});

	$('#files').change(getExcelFile);

	getOptions(function(data){

		//console.log(data);
		var div_data=""
		data.forEach(function(val){
			//console.log(val);
			localStorage.setItem("markers",JSON.stringify(data));
			//var latlng ={Lat: val.Lat,Lng: val.Lng};
			//console.log(latlng);
			div_data= div_data+"<option value=" + val._id + ">" + val.Name + "</option>";
		});
		$(div_data).appendTo('#countrySelecter');

	},function(err){

	});


	$('#ClearRowsbtn').click(function(){
		console.log("reset clicked");
		$('#Statetable').html('');
		i=1;
	});
	
	$("#Submitbtn").click(function(){
		var res = tabletoJson();
		//console.log(res)
		//localStorage.setItem('markers',res);
		//console.log("result "+v);
		var onMarkerRecieve = function(data){
			//console.log(data);
			var completed = 0;
			var markers = [];
			for (var i = 0; i < data.length; i++) {
				var val = data[i];
				if(val){
					for (var j = 0; j < res.length; j++) {
						var r = res[j];
						if(r){
							console.log("Val id "+val._id);
							console.log("R id :"+r._id);
							if(r._id == val._id){

								r.Lat = val.Lat;
								r.Lng = val.Lng;
								//markers.push(r);
								console.log("match found");
								//console.log(val);
								//res[i] = r;
							}
						}
					}
				
				}
			}
			console.log("Store values ")
			console.log(res);
			localStorage.setItem('markers',JSON.stringify(res));
			window.location = "./map.html";

			/*data.forEach(function(val){
				//console.log(val);
				if(val){
					//console.log(val);
					res.forEach(function(r){
					//console.log(r);
					//console.log(val);
					if(r){
						//console.log(r);
						if(r._id == val._id){
						r.Lat = val.Lat;
						r.Lng = val.Lng;
						console.log("hello");
						console.log(val);
					}
					if(++completed == data.length){
						localStorage.setItem('markers',JSON.stringify(res));
						//window.location = "./map.html";
					}
					}
					
				});
				}
				
			});*/

            
		}
		$.ajax({
            url: '/markers',
            type: 'post',
            data: JSON.stringify(res),
            contentType: "application/json; charset=utf-8",
            success: onMarkerRecieve
            
        });
	});




	$("#AddRowbtn").click(function(){

		if(validateInput())
		{
			var stateSelected = $("#countrySelecter").find(":selected").text();
			var stateIdSelected = $("#countrySelecter").val();
			var textToDisplay = $("#textToDisplayId").val();
			var value = $("#valueId").val();
			//console.log(stateSelected);
			console.log("Button clicked "+i);
			$("#addr"+i).html("<td>"
				+stateSelected+"</td><td style='display:none'>"
				+stateIdSelected+"</td><td>"
				+textToDisplay+"</td><td>"
				+value+"</td><td><button type='submit' class='btn btn-danger' name='deleteBtn'>Delete</button></td>");
			$('#Statetable').append('<tr id="addr'+(i+1)+'"></tr>');
      		i++;
      		$("#textToDisplayId").val("");
      		$("#valueId").val("");
      		$("#countrySelecter").val("default")
		}else{
			alert("Invalid Entries");
		}
		
	});


	


	$('#Statetable').on('click',".btn-danger",function(){
		console.log("Button clicked "+i)
		//if(i>1){
			//$("#addr"+(i-1)).html('');
			
			 $(this).closest ('tr').remove ();
			 i--;
		//}
	});


});


