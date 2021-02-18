var arr = [];
var items = {};
try {
    items = JSON.parse(sessionStorage.getItem('id'));
} catch(E){
    console.log(E);
}
typeofvalue = "";
var vegnonvegsdata="both";
var jsondata = {};
var GlobalStatus = "NotloginIN";
var user = "";
var foodType = "both";
function popupclose() {
    document.getElementById("popuplogin").style.display = "none";
}
function popuplogin(){
    document.getElementById("popuplogin").style.display = "block";
}

window.onload = function() {
    try {
        var itemlength = items.data1.length;
            if( itemlength > 0) 
                document.getElementById("cart_items").innerHTML = itemlength;
    } catch (e){
        console.log("No Item is in Basket");
    }
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid: 'getsession'
        },
        success : function(result, status) {
            console.log(result + "==");
            value = $.parseJSON(result);
            if(value.status === "success") {
                GlobalStatus = value.type;
                document.getElementById("loginbtn").style.display = "none";
                document.getElementById("registerbtn").style.display = "none";
                document.getElementById("userlogdbtn").style.display = "block";
                document.getElementById("userlogdbtn").innerText = value.Name[0];
                document.getElementById("nameoflogin").innerText = value.Name;
                document.getElementById("popuplogin").style.display = "none";
                if(sessionStorage.getItem('type') === "restaurant")
                    document.getElementById("addmenu").style.display = "block";
                typeofvalue = value.type;
            }
            else {
                document.getElementById("userlogdbtn").style.display = "none";
                document.getElementById("userlogdbtn").innerText = "";
                document.getElementById("nameoflogin").innerText = "";
            }
            if(value.type === "Restaurant") {
                document.getElementById("addmenu").style.display = "block";
            }
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
    if(document.getElementById("SearchByRestaurant").value === "" && document.getElementById("SearchbyMenu").value === "") {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data: {
                uid : 'getallmenu',
                VegNonveg : vegnonvegsdata
            },
            success :function(result, status) {
                // console.log(result+ "\n");
                value = $.parseJSON(result);
                console.log(value);
                var maindiv = document.getElementById("displayallfood");
                for(var i = 0; i < value.posts.length; i++) {
                    var kk = $.parseJSON(value.posts[i]);
                    //console.log(kk+ " "+kk.MenuName);
                    if(typeofvalue == "Restaurant" || typeofvalue === "restaurant") {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                    }
                    else {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button></div></div>";
                    }
                    maindiv.innerHTML += divrow;
                }
            },
            beforeSend: function() {
                console.log("Asking all Menu details");
            }
        });
    }
    
}

function userloginform() {
    document.getElementById("userloginform").style.display="block";
    document.getElementById("restaurantloginform").style.display="none";
}

function restaurantloginform() {
    document.getElementById("userloginform").style.display="none";
    document.getElementById("restaurantloginform").style.display="block";
}

function Itemselected(id){
    console.log(id);
    if(id === "veg") {
        var itemdisplay = document.getElementById("displayfoodtype");
        itemdisplay.innerText = "Veg";
        itemdisplay.className = "btn btn-success dropdown-toggle";
        vegnonvegsdata = "veg";
        foodType = "veg";
    }
    if(id === "nonveg") {
        var itemdisplay = document.getElementById("displayfoodtype");
        itemdisplay.innerText = "Non-Veg";
        itemdisplay.className = "btn btn-danger dropdown-toggle";
        vegnonvegsdata = "nonveg";
        foodType = "nonveg";
    }
    if(id === "both"){
        var itemdisplay = document.getElementById("displayfoodtype");
        itemdisplay.innerText = "Veg & Non-veg";
        itemdisplay.className = "btn btn-danger dropdown-toggle";
        vegnonvegsdata = "both";
        foodType = "both";
    }
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data: {
            uid : 'getallmenu',
            VegNonveg : vegnonvegsdata
        },
        success :function(result, status) {
            // console.log(result+ "\n");
            value = $.parseJSON(result);
            console.log(value);
            var maindiv = document.getElementById("displayallfood");
            maindiv.innerHTML = "";
            for(var i = 0; i < value.posts.length; i++) {
                var kk = $.parseJSON(value.posts[i]);
                //console.log(kk+ " "+kk.MenuName);
                if(kk.VegNonveg === "veg")
                    var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-success' style='float:left;'>Order</button></div></div>";
                if(kk.VegNonveg === "Nonve")
                    var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-danger' style='float:left;'>Order</button></div></div>";
                maindiv.innerHTML += divrow;
            }
        },
        beforeSend: function() {
            console.log("Asking all Menu details");
        }
    });
}

function register_user() {
    console.log("reg user");
    sessionStorage.setItem("type", "user");
    window.location =  "./register.html";
}

function register_restaurant() {
    console.log("reg rest");
    sessionStorage.setItem("type", "restaurant");
    window.location = "./register.html";
}

function loginuser() {
    document.getElementById("popuplogin").style.display = "block";
    var userid = document.getElementById("useremaillogin").value;
    var password1 = document.getElementById("userpasswordlogin").value;
    if(userid && password1) {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                uid : userid,
                password : password1,
                type : "customer"
            },
            success: function(result, status) {
                data1=$.parseJSON(result);
                console.log(data1.status);
                if(data1.status === "success") {
                    document.getElementById("loginbtn").style.display = "none";
                    document.getElementById("registerbtn").style.display = "none";
                    document.getElementById("userlogdbtn").style.display = "block";
                    document.getElementById("nameoflogin").innerText = data1.Name;
                    document.getElementById("userlogdbtn").innerText = data1.Name[0];
                    document.getElementById("addmenu").style.display = "none";
                    document.getElementById("popuplogin").style.display = "none";
                    typeofvalue = "user";
                }
                if(data1.status === "fail"){
                    document.getElementById("userloginmatch").style.display = "block";
                    document.getElementById("popuplogin").style.display = "block";
                }

            },
            beforeSend: function(){
                console.log("Sending...");
            }
        });
    } else {
        alert("Fill the below details");
    }
}

function loginrestaurant() {
    document.getElementById("popuplogin").style.display = "block";
    var userid = document.getElementById("restaurantemaillogin").value;
    var password1 = document.getElementById("restaurantpasswordlogin").value;
    if(userid && password1) {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                uid : userid,
                password : password1,
                type : "Restaurant"
            },
            success: function(result, status) {
                console.log(result);
                data = $.parseJSON(result);
                console.log(data.status);
                if(data.status === "success") {
                    document.getElementById("loginbtn").style.display = "none";
                    document.getElementById("registerbtn").style.display = "none";
                    document.getElementById("userlogdbtn").style.display = "block";
                    document.getElementById("addmenu").style.display = "block";
                    document.getElementById("nameoflogin").innerText = data.Name;
                    document.getElementById("userlogdbtn").innerText = data.Name[0];
                    document.getElementById("popuplogin").style.display = "none";
                    typeofvalue = "Restaurant";
                    window.location.reload();
                }
                if(data.status === "fail"){
                    document.getElementById("restaurantloginmatch").style.display = "block";
                    document.getElementById("popuplogin").style.display = "block";
                }

            },
            beforeSend: function(){
                console.log("Sending...");
            }
        });
    } else {
        alert("Fill the below details");
    }
}

function logout() {
    sessionStorage.removeItem("id");
    jsondata = {};
    user = "";
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid: 'logoutsession'
        },
        success : function(result, status) {
            console.log(result);
            value = $.parseJSON(result);
            console.log(value);
            document.getElementById("loginbtn").style.display = "block";
            document.getElementById("registerbtn").style.display = "block";
            document.getElementById("userlogdbtn").style.display = "none";
            document.getElementById("userlogdbtn").innerText = "";
            document.getElementById("addmenu").style.display = "none";
            document.getElementById("nameoflogin").innerText = "";
            document.getElementById("addmenuitems_restaurant").style.display ="none";
            location.reload(true);
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}
// Upload Mennu Items and photo
function additemtomenu() {
    var imagefile = document.getElementById("imagesfile").files[0];
    var ItemName = document.getElementById("addmenu_itemname").value;
    var getoption = document.getElementById("selecteoption");
    var Option = getoption.options[getoption.selectedIndex].value;
    if(imagefile && ItemName && Option) {
        var fd = new FormData();
        console.log(imagefile);
        console.log(ItemName);
        console.log(Option);
        //var files = $('#imagesfile')[0].files[0];
        fd.append("file", imagefile);
        fd.append("menename",ItemName);
        fd.append("veg_nonveg",Option);
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : fd,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                console.log("Sending File Data");
            },
            success: function(result, status) {
                
                if(result.response == 1){
                    alert("Item added successfully");
                   console.log("Inserted");
                   location.reload();
                }
                if(result.status === "Imagenamealreadyexist") {
                    alert("Please change File Name");
                    imagefile = "";
                    ItemName = "";
                }
                if(result.status === "filename"){
                    alert("Images must be in jpeg, png, jpg");
                }
            }
        });
    } else {
        alert("Fill all Data");
    }
}


function additems() {
    document.getElementById("addmenuitems_restaurant").style.display ="block";
}
// Add to baacket
function addtobasket(iddisplay) {
    
    var itemname = document.getElementById(iddisplay[0]+"itemname").textContent;
    var itemaddress = document.getElementById(iddisplay[0]+"itemaddress").textContent;
    itemaddress = itemaddress.split(" ");
    var itemresturantname = document.getElementById(iddisplay[0]+"itemresturantname").textContent;
    itemresturantname = itemresturantname.split(" ");
    var itemnumber = document.getElementById(iddisplay[0]+"itemnumber").textContent;
    itemnumber = itemnumber.split(" ");
    var JSONObj = { "itemname" : itemname, "itemaddress" : itemaddress[3], "itemresturantname": itemresturantname[3], "itemnumber" : itemnumber[4], "count" : "1"};
    arr.push(JSONObj);
    jsondata = {"data1": arr};
    sessionStorage.setItem("id", JSON.stringify(jsondata));
    console.log(jsondata.data1);
    document.getElementById("cart_items").innerHTML = jsondata.data1.length;
}

// Order Items
function backetclick() {
    console.log("Baskett click");
    // $.ajax({
    //     url : 'server.php',
    //     type : 'POST',
    //     data : {
    //         uid: 'BasketData',
    //         allitems : jsondata
    //     },
    //     success : function(result, status) {
    //         console.log(result+"\n===");
    //     },
    //     beforeSend: function(){
    //         console.log("Sending...");
    //     }
    // });
    if(typeofvalue === "NotloginIN") {
        loginuser();
    }else {
        window.location = "http://localhost/food%20shala/bookorder.html";
    }
}
// Use Search Fields 
function SearchByRestaurant() {
    var value = document.getElementById("SearchByRestaurant").value;
    vegnonveg = document.getElementById("displayfoodtype");
    console.log(value + " " + vegnonveg);
    if(foodType === "both") {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                uid : value,
                food : 'both',
            },
            success: function(result, status) {
                value = $.parseJSON(result);
                console.log(value);
                var maindiv = document.getElementById("displayallfood");
                maindiv.innerHTML = "";
                for(var i = 0; i < value.posts.length; i++) {
                    var kk = $.parseJSON(value.posts[i]);
                    //console.log(kk+ " "+kk.MenuName);
                    if(typeofvalue == "Restaurant" || typeofvalue === "restaurant") {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                    }
                    else {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-success' style='float:left;'>Order</button></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-danger' style='float:left;'>Order</button></div></div>";
                    }
                    maindiv.innerHTML += divrow;
                }

            },
            beforeSend: function(){
                console.log(" Both Sending...");
            }
        });
    }
    if(foodType === "veg") {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                uid : value,
                food : "veg",
            },
            success: function(result, status) {
                value = $.parseJSON(result);
                console.log(value);
                var maindiv = document.getElementById("displayallfood");
                maindiv.innerHTML = "";
                for(var i = 0; i < value.posts.length; i++) {
                    var kk = $.parseJSON(value.posts[i]);
                    //console.log(kk+ " "+kk.MenuName);
                    if(typeofvalue == "Restaurant" || typeofvalue === "restaurant") {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                    }
                    else {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-success' style='float:left;'>Order</button></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-danger' style='float:left;'>Order</button></div></div>";
                    }
                    maindiv.innerHTML += divrow;
                }

            },
            beforeSend: function(){
                console.log(" Veg Sending...");
            }
        });
    }
    if(foodType === "nonveg") {
        $.ajax({
            url : 'server.php',
            type : 'POST',
            data : {
                uid : value,
                food: 'nonveg',
            },
            success: function(result, status) {
                value = $.parseJSON(result);
                console.log(value);
                var maindiv = document.getElementById("displayallfood");
                maindiv.innerHTML = "";
                for(var i = 0; i < value.posts.length; i++) {
                    var kk = $.parseJSON(value.posts[i]);
                    //console.log(kk+ " "+kk.MenuName);
                    if(typeofvalue == "Restaurant" || typeofvalue === "restaurant") {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                    }
                    else {
                        if(kk.VegNonveg === "veg")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-success' style='float:left;'>Order</button></div></div>";
                        if(kk.VegNonveg === "Nonve")
                            var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-danger' style='float:left;'>Order</button></div></div>";
                    }
                    maindiv.innerHTML += divrow;
                }
            },
            beforeSend: function(){
                console.log(" nonveg Sending...");
            }
        });
    }
}
function SearchbyMenu() {
    var datamenu = document.getElementById("SearchbyMenu").value;
    console.log(datamenu);
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid : datamenu,
            food : 'itemname',
        },
        success: function(result, status) {
            console.log(result);
            value = $.parseJSON(result);
            console.log(value);
            var maindiv = document.getElementById("displayallfood");
            maindiv.innerHTML = "";
            for(var i = 0; i < value.posts.length; i++) {
                var kk = $.parseJSON(value.posts[i]);
                //console.log(kk+ " "+kk.MenuName);
                if(typeofvalue == "Restaurant" || typeofvalue === "restaurant") {
                    if(kk.VegNonveg === "veg")
                        var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                    if(kk.VegNonveg === "Nonve")
                        var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4></div></div>";
                }
                else {
                    if(kk.VegNonveg === "veg")
                        var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(114, 235, 124); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-success' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-success' style='float:left;'>Order</button></div></div>";
                    if(kk.VegNonveg === "Nonve")
                        var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div id='"+i+"itemsimages' class='col-4' style='background-image: url(./Itemimages/"+kk.Imagespath+");background-size: cover; width: 100%;'></div><div class='col-8' style='background-color: rgb(255, 102, 102); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+(kk.MenuName).toUpperCase()+"</h2><h4 id='"+i+"itemaddress'> Address : "+kk.RestAddress+"</h4><h4 id='"+i+"itemresturantname'> Name : "+kk.RestName+"</h4><h4 id='"+i+"itemnumber'> Phone No : "+kk.RestNumber+"</h4><button onclick='addtobasket(this.id)'' id='"+i+"itemadd_backet' class='btn btn-danger' style='float:right;'>Add to Basket</button><button onclick='Basket(this.id)' id='"+i+"orderitem' class='btn btn-danger' style='float:left;'>Order</button></div></div>";
                }
                maindiv.innerHTML += divrow;
            }

        },
        beforeSend: function(){
            console.log(" Both Sending...");
        }
    });
}
