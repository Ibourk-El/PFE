<?php 
$user="root";
$pwd="";
$tbname="student";
require_once "./../db.php";

header("Content-Type:Application/json");
$data=(array) json_decode(file_get_contents("php://input"));

$photo=__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."image".DIRECTORY_SEPARATOR."profile_avatar.png";

$data["photo"]=$photo;
$db= new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]==="POST"){

  if(checkIfEmailIsExist($data["email"])){
    
    $pwd=password_hash($data["pwd"],PASSWORD_DEFAULT);
    $data["pwd"]=$pwd;
    $stauts=$db->insert("INSERT INTO $tbname(email,pwd,full_name,class_id,photo) VALUES (:email,:pwd,:full_name,:class_id,:photo) ",$data);
    $res=[];

    if($stauts){
      $res["status"]=200;
      $res["msg"] ="Data is Added Successfully";
    }
    else{
      $res["status"]=401;
      $res["message"] ="err";
    }

  }else{
    echo json_encode(["msg"=>"email is allready exist"]);
    exit;
  }


  echo json_encode($res);

}

function checkIfEmailIsExist($email){
  global $db;
  $q="SELECT email FROM student WHERE email=:email";
  return empty(($db->selectElement($q,["email"=>$email])["data"]));
}