<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8"); 


$postdata = file_get_contents("php://input");
$array = json_decode($postdata, true);

$conn = new mysqli("localhost", "root", "gogo06", "tsoc");
if(!$conn){
    echo "失敗！";
}
mysqli_query($conn , 'SET CHARACTER SET utf8');



$result = $conn->query("SELECT * FROM history where uid = " .$array['uid']);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") 
        {$outp .= ",";}
    $outp .= '{"uid":"'  . $rs["uid"]        . '",';

    $outp .= '"stage":['.$rs["1"].",".$rs["2"].",".$rs["3"].",".$rs["3-1"].",".$rs["3-2"].",".$rs["3-3"].",".$rs["3-4"].",".$rs["4"].",".$rs["4-1"].",".$rs["4-2"].",".$rs["4-3"].",".$rs["5"].",".$rs["5-1"].",".$rs["5-2"].",".$rs["6"].",".$rs["7"]."]}" ;


}




$conn->close();

echo($outp);


?>