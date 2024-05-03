<?php
  require_once "./../db.php";
  require_once "./../handler/image.handler.php";
  require_once "./../midelware/authorization.php";

  if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
    echo json_encode(["status"=>401,"msg"=>"inAuthorization or invaled token"]);
    exit();
  }




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

          // select one article that has id
          if(isset($_GET["id"])){
            $query="SELECT body,title,create_at,creater_name,id FROM $tbname WHERE id=:id";
            $data=["id"=>$_GET["id"]];
          }

          // select all article of creater
          if(isset($_GET["creater_id"])){
            $query="SELECT body,title,create_at,creater_name,id FROM $tbname WHERE creater_id=:creater_id";
            $data=["creater_id"=>$_GET["creater_id"]];
          }

          $res=$db->selectElement($query,$data);
          echo json_encode($res);

        }else{

          // select all articles in database
            $query="SELECT * FROM $tbname ";
            $res=$db->selectElement($query,[]);
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
  
      default : echo json_encode(["msg"=>"REQUEST METHOD NOT REQUIRED"]);
    }





