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
$img = $array['img'];
$uid = $array['uid'];

$result = $conn->query("UPDATE img SET `$img`='0' WHERE uid = '$uid'");

$conn->close();

?>