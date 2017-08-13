<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$datetime = date("Y-m-d H:i:s");  

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
$password = $array['password'];
$username = $array['username'];
$result = $conn->query("SELECT * FROM user where email='$email'");
if($email!=""&&$result->num_rows ==0){
$result = $conn->query("INSERT INTO user (email, password, username) VALUES ('$email','$password','$username')");
}
$result = $conn->query("SELECT uid FROM user where email='$email'");
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $result = $conn->query("INSERT INTO history (uid) VALUES ('{$rs['uid']}')");
            $result = $conn->query("INSERT INTO img (uid) VALUES ('{$rs['uid']}')");         
        }

$conn->close();

?>