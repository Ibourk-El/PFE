<?php 
$user="root";
$pwd="";
$tbname="student";
require_once "./../db.php";

header("Content-Type:Application/json");
$data=(array) json_decode(file_get_contents("php://input"));

$db= new Database($user,$pwd);
$stauts=$db->insert("INSERT INTO $tbname(email,pwd,full_name,class_id) VALUES (:email,:pwd,:full_name,:class_id) ",$data);

$res=[];
if($stauts){
  header("status:200");
  global $res;
  $res["status"]=200;
  $res["message"] ="Data is Added Successfully";
}
else{
  global $res;
  $res["status"]=401;
  $res["message"] ="err";
}

echo json_encode($res);