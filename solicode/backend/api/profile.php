<?php 

require_once "./../db.php";
require_once "./../midelware/authorization.php";


if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  echo json_encode(["status"=>401,"msg"=>"inAuthorization or invaled token"]);
  exit();
}

$user="root";
$pwd="";

$db=new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]=="GET"){

  if(isset($_GET["id"])){
    $q="SELECT full_name,email,phone FROM student WHERE id=:id";
    $res=$db->selectElement($q,["id"=>$_GET["id"]])["data"][0];
    echo json_encode($res);
  }
}

if($_SERVER["REQUEST_METHOD"]=="PUT"){
  $data=json_decode(file_get_contents("php://input"),true);
  $key=$data["inp_name"];
  $value=$data["inp_value"];

  $q="UPDATE student SET $key=:$key WHERE id=:id ";
  echo json_encode($db->update($q,[$key=>$value,"id"=>$data["id"]]));
}
