function getbathvalue(){
    var uibath = document.getElementsByName('uibath');
    for(var i in uibath){
        if(uibath[i].checked){
            return parseInt(i)+1
        }
    }
    return -1;
}
function getbhkvalue(){
    var uibhk = document.getElementsByName('uibhk');
    for(var i in uibhk){
        if(uibhk[i].checked){
            return parseInt(i)+1
        }
    }
    return -1;
}
function onClickpriceestimate(){
    var sqft = document.getElementById('uisqft');
    var bhk =  getbhkvalue();
    var bathrooms = getbathvalue();
    var location = document.getElementById('uilocation')
    var estprice = document.getElementById('uiEstimatedPrice')
      
    var url ="http://127.0.0.1:5000/predicted_home_price";
    $.post(url, {
            total_sqft: parseFloat(sqft.value),
            bhk:bhk,
            bath:bathrooms,
            location:location.value
    }, function(data,status){
        
        estprice.innerHTML = "<h2>" + data.estimated_price.toString()+ "Lakh</h2>";

    })
}
function onPageLoad(){
    var url= "http://127.0.0.1:5000/get_location_names" ;
    $.get(url,function(data,status){
        if(data){
            var locations = data.locations;
            var uilocation = document.getElementById("uilocation");
            $("#uilocation").empty();
            for( var i in locations){
                var opt =new Option(locations[i]);
                $('#uilocation').append(opt);
            }
        }
    });
}
window.onload = onPageLoad;