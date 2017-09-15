<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8"); 

//去接收post過來的資料
$postdata = file_get_contents("php://input");

//連資料庫
$conn = new mysqli("localhost", "root", "gogo06", "tsoc");
if(!$conn){
	echo "失敗！";
}
mysqli_query($conn , 'SET CHARACTER SET utf8');


if($postdata){
    $array = json_decode($postdata, true);
    $update_result = $conn->query("UPDATE user SET password = '{$array['password']}', username = '{$array['name']}' WHERE uid = '{$array['uid']}'");
}
$result = $conn->query("SELECT * FROM user where uid = '{$array['uid']}'");
    $user="";
    if($result->num_rows !=0){
        $rs = mysqli_fetch_array($result);    
        $user=$rs;    
    }

$final=array("user"=>$user);

$conn->close();
echo(json_encode($final));

?>