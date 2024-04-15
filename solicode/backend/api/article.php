<?php

  header("Content-Type: Application/json");
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";
  $tbname= "articles";

  require_once "./../db.php";
  $db= new Database($user,$pwd);

  switch($_SERVER["REQUEST_METHOD"]){
    case "POST":{
      $query= "INSERT INTO $tbname(title,body,file_path,creater_id,creater_name) VALUES (:title,:body,:file_path,:creater_id,:creater_name)";
      $db->insert($query,$data);
      echo json_encode(["status"=>201,"msg"=>"the article is add successfully"]);
      break;
    }
    case "GET":{
      if(!empty($_GET)){
        // filter and select all articles of creater
        $key=$_GET["key"];
        $v=$_GET["value"];
        $data=[$key=>$v];
        $query="SELECT body,title,create_at,creater_name,id FROM $tbname WHERE $key=:$key";
        $res=$db->selectElement($query,$data);
        echo json_encode($res);
      }else{
        // select all articles in database
        $res=$db->selectAll($tbname);
        echo json_encode($res);
      }
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



