<?php

  header("Content-Type: Application/json");
  header('HTTP/1.0 200 ok');
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";
  $tbname= "post";

  require_once "./../db.php";
  $db= new Database($user,$pwd);

  switch($_SERVER["REQUEST_METHOD"]){
    case "POST":{
      $query= "INSERT INTO $tbname(post_body,file_path,likes,creater_id,creater_name) VALUES (:post_body,:file_path,:likes,:creater_id,:creater_name)";
      $db->insert($query,[...$data,"likes"=>json_encode($data["likes"])]);
      echo json_encode(["status"=>201,"msg"=>"the post is add successfully"]);
      break;
    }
    case "GET":{
      
      if(!empty($_GET)){
        // filter post
        $key=$_GET["key"];
        $data=[$key=>$_GET[$key]];
        $query="SELECT post_body,creater_name,likes,create_at,id,file_path FROM $tbname WHERE $key=:$key";
        $res=$db->selectElement($query,$data);
        echo json_encode($res);
      }else{
        // all post
        $res=$db->selectAll($tbname);
        echo json_encode($res);
      }
      break;
    }
    case "PUT":{

      if(empty($data["file_path"])){
        $query="UPDATE $tbname SET post_body=:post_body WHERE id=:id ";
        $data=["post_body"=>$data["post_body"],"id"=>$data["id"]];
        $db->update($query,$data);
        echo json_encode(["msg"=>202]);
      }
      else{
        $query="UPDATE $tbname SET post_body=:post_body,file_path=:file_path WHERE id=:id ";
        $db->update($query,$data);
        echo json_encode(["msg"=>202]);
      }

      break;
    }

    case "PATCH":{
      $selectQuery="SELECT likes FROM $tbname WHERE id=:id";
      $re=$db->selectElement($selectQuery,["id"=>$data["id"]]);
      $re= (array) json_decode($re["data"][0]["likes"]);
      $re["likes"]=$data["likes"];
      
      if(count($re["students_IDs"])>0){
        foreach($re["students_IDs"] as $v){
          if($v==$data["user_id"]) exit;
        }
      }
      array_push($re["students_IDs"],$data["user_id"]);

      $m=json_encode($re);
      $updateQuery="UPDATE $tbname SET likes=:likes
      WHERE id=:id";
      
      $db->update($updateQuery,["id"=>$data["id"],"likes"=>$m]);

      echo json_encode(["data"=>"is add successfully","t"=>$re["students_IDs"]]);
      break;
    }
    case "DELETE":{

      $db->delete($tbname,$data["id"]);
      echo json_encode(["msg"=>"article is deleted ".$data['id']]);
      break;
    }

    default : echo "REQUEST METHOD NOT REQUIRED";
  }



