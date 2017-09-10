<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//去接收post過來的資料
$postdata = file_get_contents("php://input");

//把post過來的json資料轉成PHP的array
$array = json_decode($postdata, true);

//連資料庫
$conn = new mysqli("localhost", "root", "gogo06", "tsoc");
if(!$conn){
	echo "失敗！";
}
mysqli_query($conn , 'SET CHARACTER SET utf8');
$email = $array['email'];
$code = $array['ans'];

$result = mysqli_query($conn, "SELECT code FROM user where email='$email'");

$row = mysqli_fetch_array($result);

	if($code==$row["code"]){
		$sql ="UPDATE user SET `attest`='1' WHERE `email`='".$email."'";
		$result = $conn->query($sql);
		$outp="";
        $outp .= '{"account":"same"}'; 
	}else{
		$outp="";
    	$outp .= '{"account":"diff"}';
	}

		
    

$conn->close();
echo($outp);
?>
