var items = {};
try {
    items = JSON.parse(sessionStorage.getItem('id'));
} catch(E){
    console.log(E);
}
window.onload = function() {
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
                document.getElementById("userlogdbtn1").innerText = value.Name[0];
                document.getElementById("nameoflogin1").innerText = value.Name;
            }
            else {
                alert("Login In First ");
                window.location = "http://localhost/food%20shala/";
            }
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
    try {
        document.getElementById("noiteminbasket").style.display = "none";
        console.log(items);
        var itemlength = items.data1.length;
        var maindiv = document.getElementById("displayallfood");
        if( itemlength > 0) {
            document.getElementById("cart_items1").innerHTML = itemlength;
            for(var i = 0; i < itemlength; i++) {
                console.log(items.data1[i].itemname);
                var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div class='col' style='background-color: rgb(129, 95, 223); padding: 10px;'><h2 id='"+i+"itemname' style='color: #4628b1;'>"+items.data1[i].itemname+"</h2><h4 id='"+i+"itemaddress'>"+items.data1[i].itemname+"</h4><h4 id='"+i+"itemresturantname'>"+items.data1[i].itemnumber+"</h4><h4 id='"+i+"itemnumber'>"+items.data1[i].itemresturantname+"</h4><table style='float: left;'><tr><td><button id ='"+i+"seb' onclick='subitem(this.id)' type='button' class='btn btn-info'>-</button></td><td><button id='"+i+"noofitem' type='button' class='btn btn-info'>"+items.data1[i].count+"</button></td><td><button id='"+i+"ad' onclick='additem(this.id)' type='button' class='btn btn-info'>+</button></td></tr></table><button onclick='deleteitem(this.id)' id='"+i+"delete' class='btn btn-danger' style='float:right;'>Delete</button></div></div>";
                maindiv.innerHTML += divrow;
            }
            maindiv.innerHTML +="<button style='width:100%;' onclick='order()' class='btn btn-primary'>Order</button> ";
        }
        else alert("No Items is in Basket");
    } catch(e) {
        document.getElementById("noiteminbasket").style.display = "block";
        console.log(e);
    }
    
}

function deleteitem(id) {
    console.log(id[0]);
    var temp  = [];
    for(var i = 0; i < items.data1.length; i++)
        if(items.data1[i] !== items.data1[id[0]])
            temp.push(items.data1[i]);
    items.data1 = temp;
    sessionStorage.setItem("id", JSON.stringify(items));
    location.reload();
    console.log(items);
}

function logout1() {
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
            window.location = "http://localhost/food%20shala/";
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}
//JSON.parse(sessionStorage.getItem("id")).data1
//JSON.parse(sessionStorage.getItem("id")).data1[0]
function subitem(id) {
    console.log(document.getElementById(id[0]+"noofitem").innerText);
    var k = document.getElementById(id[0]+"noofitem");
    if(k.innerText > 0) {
        k.textContent = k.innerText - 1; 
        items.data1[id[0]].count = parseInt(items.data1[id[0]].count) - 1;
    }
    sessionStorage.setItem("id", JSON.stringify(items));
}
function additem(id) {
    var k = document.getElementById(id[0]+"noofitem");
    k.textContent = parseInt(k.innerText) + 1;
    items.data1[id[0]].count = parseInt(items.data1[id[0]].count) + 1;
    sessionStorage.setItem("id", JSON.stringify(items));
}
function order() {
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid: 'BasketData',
            allitems :items
        },
        success : function(result, status) {
            console.log(result);
            //value = $.parseJSON(result);
            if(value.status === "success") {
                sessionStorage.removeItem("key");
                sessionStorage.clear();
                alert("Order Placed ");
                document.getElementById("displayallfood").innerHTML = "";
                document.getElementById('cart_items1').innerHTML = "0";
                window.location = "http://localhost/food%20shala/";
            }
            else {
                alert("Error While Placing Order");
                //alert("You are Unauthorized User");
                //window.location("http://localhost/food%20shala/");
            }
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
    //alert("Order Placed");
    //location.reload();
}
function viewOrder(){
    $.ajax({
        url : 'server.php',
        type : 'POST',
        data : {
            uid: 'getcustomerdata'
        },
        success : function(result, status) {
            try {
                document.getElementById("noiteminbasket").style.display = "none";
                console.log(result);
                var prev_data = JSON.parse(result);
                document.getElementById("displayallfood").style.display = "none";
                document.getElementById("noiteminbasket").style.display = "none";
                var maindiv = document.getElementById("history");
                maindiv.innerHTML = "";
                if(prev_data.posts.length > 0) {
                    document.getElementById("cart_items1").innerHTML = 0;
                    for(var i = 0; i < prev_data.posts.length; i++) {
                        var kk = $.parseJSON(prev_data.posts[i]);
                        console.log(kk);
                        var divrow = "<div id='"+i+"itemsbackground' class='row' style='padding: 20px;'><div class='col' style='background-color: rgb(250,128,114); padding: 10px;'><h2 id='itemname' style='color: #4628b1;'>"+kk.itemname+"</h2><h4 id='"+i+"itemaddress'> Number : "+kk.restaurantnumber+"</h4><h4> Name : "+kk.restaurantname+"</h4><h4 id='"+i+"itemresturantname'> No of Plate Ordered : "+kk.nooforders+"</h4><h4 id='"+i+"itemnumber'> Status : "+kk.status+"</h4></div></div>";
                        maindiv.innerHTML += divrow;
                    }
                }
                else alert("No Items is Ordered");
            } catch(e) {
                //alert("No Item has Been Ordered");;
                console.log(e);
            }
        },
        beforeSend: function(){
            console.log("Sending...");
        }
    });
}
function backetclick() {
    location.reload();
}
