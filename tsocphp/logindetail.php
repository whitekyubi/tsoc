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

function base64_to_img( $base64_string, $prefix='nx_') {
    $path="file:///C:/xampp/htdocs/tsocuserimg/";
    if($base64_string!=''){
        $output_file = $prefix.time().rand(100,999).'.jpg';
        $path = $path.$output_file;
        $ifp = fopen( $path, "wb" );
        fwrite( $ifp, base64_decode( $base64_string) );
        fclose( $ifp );
        return( $output_file );
    }
    return false;
}

if($postdata){
    $array = json_decode($postdata, true);

    if($array['imageBase64'])
    {
        $imageBase64 = $array['imageBase64'];
        $mid=base64_to_img($imageBase64);
        $mid='http://140.123.175.96:8080/tsocuserimg/'.$mid;
        $update_img = $conn->query("UPDATE user SET picture='$mid' WHERE uid = '{$array['uid']}'");
    }
    else{
        $mid= '';
    }
    $update_result = $conn->query("UPDATE user SET password = '{$array['password']}', username = '{$array['name']}' WHERE uid = '{$array['uid']}'");

}
$conn->close();

echo($outp);

?>