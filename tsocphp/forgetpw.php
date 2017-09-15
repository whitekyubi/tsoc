<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("PHPMailerAutoload.php");

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

$result1 = $conn->query("SELECT username FROM user where email='$email'");
		while($rs = $result1->fetch_assoc()) {
          $username=$rs["username"];
    }

if($email!=""){
    //亂碼
    srand((double)microtime()*1000000);
	$no = md5(uniqid(rand()));
	$ed = strlen($no)-8;
	$rat = rand(0,$ed);
	$code = strtoupper(substr("$no",$rat,8));

    //資料庫

	$result = $conn->query("UPDATE user SET code='$code' WHERE email='$email'");

    //寄出認證信
    $message ="***************************************************<br>";
		$message .="請注意︰此郵件是系統自動傳送，請勿直接回覆此郵件。 <br>";
		$message .="***************************************************<br>";
		$message .="<br>";
		$message .="親愛的".$username."您好：<br>";
		$message .="<br>";
		$message .="這封認證信是由『佳憶趣APP』發出，用以確認閣下身份。<br>";
		$message .="<br>";
		$message .="如果您收到多封『驗證信函』，請以最新的那一封，方為有效。<br>";
		$message .="<br>";
		$message .="請複製以下的驗證碼並開啟『佳憶趣APP』完成驗證與新密碼的設定。<br>";
		$message .="您的驗證碼為『".$code."』<br>";
		$message .="<br>";
		$message .="歡迎您加入 佳憶趣APP <br><br>";
$mail= new PHPMailer(); //建立新物件
$mail->IsSMTP(); //設定使用SMTP方式寄信
$mail->SMTPAuth = true; //設定SMTP需要驗證
$mail->SMTPSecure = "ssl"; // Gmail的SMTP主機需要使用SSL連線
$mail->Host = "smtp.gmail.com"; //Gamil的SMTP主機
$mail->Port = 465; //Gamil的SMTP主機的埠號(Gmail為465)。
$mail->CharSet = "utf-8"; //郵件編碼
$mail->Encoding = "base64";
$mail->Username = "movieccuweb@gmail.com"; //Gamil帳號
$mail->Password = "ccuccuteam3"; //Gmail密碼
$mail->From = "movieccuweb@gmail.com"; //寄件者信箱
$mail->FromName = "佳憶趣"; //寄件者姓名
$mail->Subject ="'佳憶趣'忘記密碼驗證信"; //郵件標題
$mail->WordWrap = 50;//每50字換一次行
$mail->Body ="$message"; //郵件內容
$mail->IsHTML(true); //郵件內容為html
$mail->AddAddress("$email","'佳憶趣'忘記密碼驗證信"); //收件者郵件及名稱

		if(!$mail->Send()){
			echo "寄信發生錯誤：" . $mail->ErrorInfo;
			//如果有錯誤會印出原因
		}

    }



$conn->close();

?>