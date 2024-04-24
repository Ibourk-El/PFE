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
$res=[...$db->selectElement( $query,$data)];

if(!empty($res["data"])){
  global $res;
  $res["status"]=200;
  $res["msg"]="you are login successfully";
  $res["photo_path"]=changePathOfImg($res["data"][0]["photo"]);
  // echo changePathOfImg($res["data"][0]["photo"]);
}
else{
  global $res;
  $res["status"]=401;
  $res["msg"]="pwd or email is not correct ";
}


echo json_encode($res);






