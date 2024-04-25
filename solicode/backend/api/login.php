<?php 

require_once "./../db.php";
require_once "./../handler/image.handler.php";

$user="root";
$pwd="";
$tbname="student";


header("Content-Type:Application/json");
$data=(array) json_decode(file_get_contents("php://input"));

$db=new Database($user,$pwd);
$query="SELECT id,full_name,class_id,photo FROM $tbname WHERE email=:email AND pwd=:pwd";
$res=[...$db->selectElement( $query,$data)["data"][0]];

if(!empty($res)){
  global $res;
  $res["status"]=200;
  $res["msg"]="you are login successfully";
  $res["photo_path"]=changePathOfImg($res["photo"]);

  $res["_tk"]=generateAccessToken();
  $sTime= date('Y-m-d H:i:s');
  $eTime=date('Y-m-d H:i:s',strtotime($sTime)+60*60);
  $qtk= "INSERT INTO access_token(student_id,token,start_time,end_time) VALUES(:student_id,:token,'$sTime','$eTime')";
  $db->insert($qtk,["token"=>$res["_tk"],"student_id"=>$res["id"]]);
}
else{
  global $res;
  $res["status"]=401;
  $res["msg"]="pwd or email is not correct ";
}


echo json_encode($res);


function generateAccessToken(){
  return md5(uniqid(rand(10000,99999)));
}






