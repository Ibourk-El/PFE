<?php
  require_once "./../db.php";
  require_once "./../handler/image.handler.php";

  header("Content-Type: Application/json");
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";
  $tbname= "articles";

  $db= new Database($user,$pwd);

  switch($_SERVER["REQUEST_METHOD"]){
    case "POST":{
      $data=[...(array)json_decode($_POST["data"])];
      $data["file_path"]=handelImages($_FILES["file"]);
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
        $query="SELECT body,title,create_at,creater_name,id FROM $tbname ";
        $res=$db->selectElement($query,$data);
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



