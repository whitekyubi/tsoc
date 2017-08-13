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

$uid = $array['uid'];
// $uid=10;
$result = $conn->query("SELECT * FROM history where uid='$uid'");
$progress="";
 
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $key = array_search('3', $rs);
            if($key!=""){
                $final=array("history"=>"$key","run"=>"3");
            }else{
                $key = array_search('1', $rs);
                if($key!=""){
                    $final=array("history"=>"$key","run"=>"1");
                }else{
                    $result1 = $conn->query("SELECT `3`,`4`,`5` FROM history where uid='$uid'");
                    while($rs = $result1->fetch_array(MYSQLI_ASSOC)) {
                        foreach ($rs as $key => $value) {
                            if($value==0){
                                $final=array("run"=>"2");
                            }
                        }         
                    }
                }  
            }        
        }



$conn->close();
echo(json_encode($final));

?>