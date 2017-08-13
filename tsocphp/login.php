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
$password = $array['password'];

//  $email = 'test@gmail.com';
//  $password = 'test123';

    $result = $conn->query("SELECT * FROM user where email='$email' and password='$password'");
    $user="";
    if($result->num_rows !=0){
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $user=$rs;
        }
    }

$final=array("user"=>$user);

$conn->close();
echo(json_encode($final));

?>