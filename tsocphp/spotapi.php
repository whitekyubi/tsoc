<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8"); 

//去接收post過來的資料
$postdata = file_get_contents("php://input");

//把post過來的json資料轉成PHP的array
$array = json_decode($postdata, true);
// $array['place']="檜意森活村";
$new_line = (PHP_SAPI === 'cli' OR defined('STDIN')) ? PHP_EOL : '<br>';
// echo('[Http POST request Example]' . $new_line);
// Configuration
$url = 'https://chiayi.itour.org.tw/api2/RecreationInformation/getSceneryInfo.php';
$post_fields = array(
    'api_key' => 'xqt0baii0l7gwxrb4q2eeo0ugcemfms5',
    'match_word' => $array['place'],
    'lang' => 'TW',
    'order_by' => 'update',
);
// Prepare connection
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
// Add request header
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
// Send post request
$curl_result = curl_exec($ch);
$curl_info = curl_getinfo($ch);
$curl_error = curl_error($ch);
curl_close($ch);
 // Get response
// echo('Sending "POST" request to URL : ' . $url . $new_line);
// echo("Response Code : " . $curl_info['http_code'] . $new_line);
// Print result
// echo('Response Code : ' . $curl_result . $new_line);
// Print result with json decode
echo($curl_result);
?>