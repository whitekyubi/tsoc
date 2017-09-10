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


    $result = $conn->query("SELECT * FROM user where email='$email' and password='$password'");
    $user="";
    if($result->num_rows !=0){
        $rs = mysqli_fetch_array($result);
            
            if($rs["attest"]==1){
                $user=$rs;
            }else{
                $user="undone";
            }
            
        
    }

$final=array("user"=>$user);

$conn->close();
echo(json_encode($final));

?>