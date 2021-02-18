<?php
	require('dbcon.php');
    if(isset($_POST['uid']) && isset($_POST['password'])){  
		
		if($_POST['type'] == "customer") {
			$user = $_POST['uid'];
			$pass = $_POST['password'];
			$result=mysqli_query($con,"SELECT * from userlogin where emailid='$user' and password='$pass';");
			$data=mysqli_fetch_assoc($result);
			if($data) { 
				session_start();
				$_SESSION['name'] = $data['name'];
				$_SESSION['address'] = $data['address'];
				$_SESSION['number'] = $data['number'];
				$_SESSION['emailid'] = $data['emailid'];
				$_SESSION['type'] = "customer";
				exit(json_encode(array("status"=> "success","Name" => $data['name'], "address"=> $data['address'],"emailid" => $data['emailid'], "number" => $data['number'])));
			}
			else { 
				exit(json_encode(array("status"=>"fail")));			
			}
		}
		if($_POST['type'] == "Restaurant"){
			$user = $_POST['uid'];
			$pass = $_POST['password'];
			$result=mysqli_query($con,"SELECT * from restaurantlogin where emailid='$user' and password='$pass';");
			$data=mysqli_fetch_assoc($result);
			if($data) { 
				session_start();
				$_SESSION['name'] = $data['name'];
				$_SESSION['address'] = $data['address'];
				$_SESSION['number'] = $data['phoneno'];
				$_SESSION['emailid'] = $data['emailid'];
				$_SESSION['type'] = "Restaurant";
				exit(json_encode(array("status"=> "success","Name" => $data['name'], "address"=> $data['address'],"emailid" => $data['emailid'], "number" => $data['phoneno'])));
			}
			else { 
				exit(json_encode(array("status"=>"fail")));			
			}
		}
		// exit(json_encode(array("uid"=>$_POST['uid'],"password"=>$_POST['password'])));
	}
	if(isset($_POST['uid']) && $_POST['uid'] == "getsession") {
		session_start();
		if(isset($_SESSION['name']) && !empty($_SESSION['name']))
			exit(json_encode(array("status"=> "success","Name" => $_SESSION['name'], "address"=> $_SESSION['address'],"emailid" =>$_SESSION['emailid'], "number" => $_SESSION['number'], "type" => $_SESSION['type'])));
		else 
			exit(json_encode(array("status" => "error")));
	}
	
	if(isset($_POST['uid']) && $_POST['uid'] == "logoutsession") {
		session_start();
		session_destroy();
		exit(json_encode(array("status" => "logout")));
	}
	// User Registration
	if(isset($_POST['type']) && $_POST['type'] == "register_user") {
		$checkemail=mysqli_query($con,"SELECT * from userlogin where emailid='".$_POST['uid1']."'");
		$emaildata=mysqli_fetch_assoc($checkemail);

		$checkphone=mysqli_query($con,"SELECT * from userlogin where number='".$_POST['number1']."'");
		$phonedata=mysqli_fetch_assoc($checkphone);

		if($emaildata) {
			if($phonedata)
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "both")));
			else	
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "email")));
		} elseif($phonedata) {
			if($emaildata)
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "both")));
			else	
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "phone")));
		}
		else {
			
			$sql = "INSERT INTO userlogin VALUES ('".$_POST['Fullname']."', '".$_POST['uid1']."', '".$_POST['userddress']."', '".$_POST['number1']."', '".$_POST['pass']."')";
			if ($con->query($sql) === TRUE) {
				session_start();
				$_SESSION['name'] = $_POST['Fullname'];
				$_SESSION['address'] = $_POST['userddress'];
				$_SESSION['number'] = $_POST['number1'];
				$_SESSION['emailid'] = $_POST['uid1'];
				$_SESSION['type'] = $_POST['type'];
				exit(json_encode(array("status"=> "success","Name" => $_SESSION['name'], "address"=> $_SESSION['address'],"emailid" =>$_SESSION['emailid'], "number" => $_SESSION['number'], "type" => $_SESSION['type'])));
			} else {
				exit(json_encode(array("status"=> "error","Name" => $_SESSION['name'], "address"=> $_SESSION['address'],"emailid" =>$_SESSION['emailid'], "number" => $_SESSION['number'], "type" => $_SESSION['type'])));
			}
		}
	}
	// Restaurant Registration
	if(isset($_POST['type']) && $_POST['type'] == "restaurant") {
		$checkemail=mysqli_query($con,"SELECT * from restaurantlogin where emailid='".$_POST['uid1']."'");
		$emaildata=mysqli_fetch_assoc($checkemail);

		$checkphone=mysqli_query($con,"SELECT * from restaurantlogin where phoneno='".$_POST['number1']."'");
		$phonedata=mysqli_fetch_assoc($checkphone);

		if($emaildata) {
			if($phonedata)
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "both")));
			else	
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "email")));
		}
		 elseif($phonedata) {
			if($emaildata)
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "both")));
			else	
				exit(json_encode(array("status"=> "Dataexist", "emailphone" => "phone")));
		}
		else {
			$sql = "INSERT INTO restaurantlogin VALUES ('".$_POST['Fullname']."', '".$_POST['number1']."', '".$_POST['uid1']."', '".$_POST['userddress']."', '".$_POST['pass']."')";
			if ($con->query($sql) === TRUE) {
				session_start();
				$_SESSION['name'] = $_POST['Fullname'];
				$_SESSION['address'] = $_POST['userddress'];
				$_SESSION['number'] = $_POST['number1'];
				$_SESSION['emailid'] = $_POST['uid1'];
				$_SESSION['type'] = $_POST['type'];
				exit(json_encode(array("status"=> "success","Name" => $_SESSION['name'], "address"=> $_SESSION['address'],"emailid" =>$_SESSION['emailid'], "number" => $_SESSION['number'], "type" => $_SESSION['type'])));
			} else {
				exit(json_encode(array("status"=> "error","Name" => $_SESSION['name'], "address"=> $_SESSION['address'],"emailid" =>$_SESSION['emailid'], "number" => $_SESSION['number'], "type" => $_SESSION['type'])));
			}
		}
	}
	// get menu Data
	//print_r($_POST['veg_nonveg']);
	if(isset($_POST['veg_nonveg'])) {
		
		session_start();
		$uploadDir = 'Itemimages/';
		$uploadStatus = 1; 
            // Upload file 
		$uploadedFile = '';
        if(!empty($_FILES["file"]["name"])){   
			           
            // File path config 
			$fileName = basename($_FILES["file"]["name"]); 
			$result=mysqli_query($con,"SELECT * from menu where images='$fileName'");
			$data=mysqli_fetch_assoc($result);
			
			if($data) { 
				exit(json_encode(array("status"=> "Imagenamealreadyexist")));
			}
            $targetFilePath = $uploadDir. $fileName; 
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);                  
            // Allow certain file formats 
            $allowTypes = array('png','jpg','JPG','PNG','JPEG','jpeg'); 
            if(in_array($fileType, $allowTypes)){ 
                // Upload file to the server 
                if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){ 
					$uploadedFile = $fileName; 
                }else{ 
					$uploadStatus = 0; 
					exit(json_encode(array("response"=> 0, "message" => "Sorry, there was an error uploading your file.")));
                } 
            }else{ 
                $uploadStatus = 0; 
                exit(json_encode(array("response"=> 0,"status"=> "filename", "message" => "Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload."))); 
            } 
		}
		if($uploadStatus == 1){
			$sql = "INSERT INTO menu VALUES ('".$_POST['menename']."','".$_SESSION['name']."','".$_SESSION['address']."','".$_SESSION['number']."','".$uploadedFile."','".$_POST['veg_nonveg']."')";
			if ($con->query($sql) === TRUE) {
				exit(json_encode(array("response"=> 1)));
			}
		} else exit(json_encode(array("response"=> 0)));
	}
	if(isset($_POST['uid'])&& $_POST['uid'] == "getallmenu") {
		$result;
		if($_POST['VegNonveg'] == "both") {
			$result = mysqli_query($con,"SELECT * from menu");
		}
		if($_POST['VegNonveg'] == "veg") {
			$result = mysqli_query($con,"SELECT * from menu WHERE vernonveg = 'veg'");
		}
		if($_POST['VegNonveg'] == "nonveg") {
			$result = mysqli_query($con,"SELECT * from menu WHERE vernonveg = 'Nonve'");
		}
		$response = array();
		$posts = array();
		while($row = mysqli_fetch_assoc($result)) {
			$MenuName = $row['itemname'];
			$RestNumber = $row['restaurantnumber'];
			$RestAddress = $row['restaurantaddress'];
			$RestName = $row['restaurantname'];
			$Imagespath = $row['images'];
			$VegNonveg = $row['vernonveg'];
			array_push($posts,json_encode( array("MenuName"=> $MenuName, "RestNumber"=> $RestNumber, "RestAddress" => $RestAddress, "RestName" => $RestName, "Imagespath" =>$Imagespath, "VegNonveg" => $VegNonveg )));
		}
		$response['posts'] = $posts;
		exit(json_encode($response));
	}
	if(isset($_POST['uid']) && $_POST['uid'] == "BasketData") {
		session_start();
		$ordermenu = $_POST['allitems'];
		$check = TRUE;
		print_r($ordermenu);
		echo count($ordermenu['data1']);
		for($i=0; $i<count($ordermenu['data1']); $i++){
			//print_r($ordermenu['data1'][$i]. "\n");
			$sql = "INSERT INTO customers VALUES ('".$_SESSION['number']."', '".$ordermenu['data1'][$i]['itemnumber']."', '".$ordermenu['data1'][$i]['itemname']."', '".$ordermenu['data1'][$i]['itemaddress']."', '".$ordermenu['data1'][$i]['itemresturantname']."', 'Booked','".$ordermenu['data1'][$i]['count']."')";
			if ($con->query($sql) === FALSE) 
				$check = FALSE;
		}
		if($checkemail)
			exit(json_encode(array("status" => "success")));
		else exit(json_encode(array("status" => "Fails")));
	}
	// Display Customer Data
	if(isset($_POST['uid']) && $_POST['uid'] == "getcustomerdata"){
		session_start();
		
		if($_SESSION['type'] == "customer") {
			$matchingdata = $_SESSION['number'];
			$result = mysqli_query($con,"SELECT * from customers WHERE customernumber ='$matchingdata'");
			$response = array();
			$posts = array();
			while($row = mysqli_fetch_assoc($result)) {
				$customernumber = $row['customernumber'];
				$restaurantnumber = $row['restaurantnumber'];
				$itemname = $row['itemname'];
				$restaurantaddress = $row['restaurantaddress'];
				$restaurantname = $row['restaurantname'];
				$status = $row['status'];
				$nooforders = $row['nooforders'];
				array_push($posts,json_encode( array("customernumber"=> $customernumber, "restaurantnumber"=> $restaurantnumber, "itemname" => $itemname, "restaurantaddress" => $restaurantaddress, "restaurantname" =>$restaurantname, "status" => $status, "nooforders" => $nooforders )));
			}
			$response['posts'] = $posts;
			exit(json_encode($response));
		}
		if($_SESSION['type'] == "Restaurant") {
			//exit(json_encode("REsturant"));
			$matchingdata = $_SESSION['number'];
			$result = mysqli_query($con,"SELECT * from customers WHERE restaurantnumber ='$matchingdata'");
			$response = array();
			$posts = array();
			while($row = mysqli_fetch_assoc($result)) {
				$customernumber = $row['customernumber'];
				$restaurantnumber = $row['restaurantnumber'];
				$itemname = $row['itemname'];
				$restaurantaddress = $row['restaurantaddress'];
				$restaurantname = $row['restaurantname'];
				$status = $row['status'];
				$nooforders = $row['nooforders'];
				array_push($posts,json_encode( array("customernumber"=> $restaurantnumber, "restaurantnumber"=> $customernumber, "itemname" => $itemname, "restaurantaddress" => $restaurantaddress, "restaurantname" =>$restaurantname, "status" => $status, "nooforders" => $nooforders )));
			}
			$response['posts'] = $posts;
			exit(json_encode($response));
		}
	}
	// Display Result as per Request
	if(isset($_POST['uid']) && $_POST['food'] == "both") {
		$data = $_POST['uid'];
		$result = mysqli_query($con,"SELECT * from menu where restaurantname = '$data'");
		$response = array();
		$posts = array();
		while($row = mysqli_fetch_assoc($result)) {
			$MenuName = $row['itemname'];
			$RestNumber = $row['restaurantnumber'];
			$RestAddress = $row['restaurantaddress'];
			$RestName = $row['restaurantname'];
			$Imagespath = $row['images'];
			$VegNonveg = $row['vernonveg'];
			array_push($posts,json_encode( array("MenuName"=> $MenuName, "RestNumber"=> $RestNumber, "RestAddress" => $RestAddress, "RestName" => $RestName, "Imagespath" =>$Imagespath, "VegNonveg" => $VegNonveg )));
		}
		$response['posts'] = $posts;
		exit(json_encode($response));
	
	}
	if(isset($_POST['uid']) && $_POST['food'] == "veg") {
		$data = $_POST['uid'];
		$result = mysqli_query($con,"SELECT * from menu where restaurantname = '$data' and vernonveg ='veg'");
		$response = array();
		$posts = array();
		while($row = mysqli_fetch_assoc($result)) {
			$MenuName = $row['itemname'];
			$RestNumber = $row['restaurantnumber'];
			$RestAddress = $row['restaurantaddress'];
			$RestName = $row['restaurantname'];
			$Imagespath = $row['images'];
			$VegNonveg = $row['vernonveg'];
			array_push($posts,json_encode( array("MenuName"=> $MenuName, "RestNumber"=> $RestNumber, "RestAddress" => $RestAddress, "RestName" => $RestName, "Imagespath" =>$Imagespath, "VegNonveg" => $VegNonveg )));
		}
		$response['posts'] = $posts;
		exit(json_encode($response));
	}
	if(isset($_POST['uid']) && $_POST['food'] == "nonveg") {
		$data = $_POST['uid'];
		$result = mysqli_query($con,"SELECT * from menu where restaurantname = '$data' and vernonveg='Nonve';");
		$response = array();
		$posts = array();
		while($row = mysqli_fetch_assoc($result)) {
			$MenuName = $row['itemname'];
			$RestNumber = $row['restaurantnumber'];
			$RestAddress = $row['restaurantaddress'];
			$RestName = $row['restaurantname'];
			$Imagespath = $row['images'];
			$VegNonveg = $row['vernonveg'];
			array_push($posts,json_encode( array("MenuName"=> $MenuName, "RestNumber"=> $RestNumber, "RestAddress" => $RestAddress, "RestName" => $RestName, "Imagespath" =>$Imagespath, "VegNonveg" => $VegNonveg )));
		}
		$response['posts'] = $posts;
		exit(json_encode($response));
	}
	// Display Result as per Menu 
	if(isset($_POST['uid']) && $_POST['food'] == "itemname") {
		$data = $_POST['uid'];
		$result = mysqli_query($con,"SELECT * from menu where itemname = '$data'");
		$response = array();
		$posts = array();
		while($row = mysqli_fetch_assoc($result)) {
			$MenuName = $row['itemname'];
			$RestNumber = $row['restaurantnumber'];
			$RestAddress = $row['restaurantaddress'];
			$RestName = $row['restaurantname'];
			$Imagespath = $row['images'];
			$VegNonveg = $row['vernonveg'];
			array_push($posts,json_encode( array("MenuName"=> $MenuName, "RestNumber"=> $RestNumber, "RestAddress" => $RestAddress, "RestName" => $RestName, "Imagespath" =>$Imagespath, "VegNonveg" => $VegNonveg )));
		}
		$response['posts'] = $posts;
		exit(json_encode($response));
	}

?>