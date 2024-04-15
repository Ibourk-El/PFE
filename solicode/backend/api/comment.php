<?php

  header("Content-Type: Application/json");
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";
  $tbname= "comments";

  require_once "./../db.php";
  $db= new Database($user,$pwd);

  switch($_SERVER["REQUEST_METHOD"]){
    case "GET":{
      $query="SELECT body, creater_name FROM comments WHERE catigory=:catigory AND catigory_id=:catigory_id";
      $re=$db->selectElement($query,$_GET);
      echo json_encode($re);
      break;

    }
    case "POST":{
      $query= "INSERT INTO $tbname(body,catigory,catigory_id,creater_id,creater_name) VALUES (:body,:catigory,:catigory_id,:creater_id,:creater_name)";
      $re=$db->insert($query,$data);
      echo json_encode(["status"=>201,"msg"=>"the comment is add successfully"]);
      break;
    }
    
    case "PUT":{
      break;
    }
    case "DELETE":{
      break;
    }

    default : echo "REQUEST METHOD NOT REQUIRED";
  }