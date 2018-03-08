 methods.getStateListFromExcel = function(cb){
    
    parseXlsx('state_marker.xlsx', function(err, data) {
        if(err) throw err;
        // data is an array of arrays
        var headers = data[0];
        var res =[];
        
        for (var i = 1; i <= data.length - 1; i++) {
            var temp = data[i];
            var i=0;
            cur ={};
           // console.log(temp);
            for (var i = 0; i <= temp.length - 1; i++) {
                    cur[headers[i]] = temp[i];
            }
            res.push(cur);
        }

        /*data.forEach(function(temp){
            var i=0;
            cur ={};
           // console.log(temp);
            for (var i = 0; i <= temp.length - 1; i++) {
                    cur[headers[i]] = temp[i];
            }
            res.push(cur);
            
            

            });*/
        console.log(res);
    //console.log(headers);
      cb(res);
    });
}

module.exports = methods;