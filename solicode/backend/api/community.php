<?php
require_once "./../db.php";
require_once "./../handler/image.handler.php";
require_once "./../midelware/authorization.php";

if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  echo json_encode(["status"=>401,"msg"=>"inAuthorization or invaled token"]);
  exit();
}
  header("Content-Type: Application/json");
  header('HTTP/1.0 200 ok');
  $data= (array) json_decode(file_get_contents("php://input"));

  $user= "root";
  $pwd= "";
  $tbname= "post";

  $db= new Database($user,$pwd); 
  
  
  switch($_SERVER["REQUEST_METHOD"]){
    case "POST":{
      $data=[...(array)json_decode($_POST["data"])];
      $data["file_path"]=handelImages($_FILES["file"]);
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
        $query="SELECT $tbname.post_body,$tbname.creater_name,$tbname.likes,$tbname.create_at,$tbname.id,$tbname.file_path,student.photo FROM $tbname
        INNER JOIN student ON student.id=$tbname.creater_id ";
        $res=$db->selectElement($query,$data);

        for($i=0;$i<count($res["data"]);$i++){
          $res["data"][$i]["photo"]=changePathOfImg($res["data"][$i]["photo"]);

          if($res["data"][$i]["file_path"]){
            $res["data"][$i]["file_path"]=filePath($res["data"][$i]["file_path"]);
          }

        } 
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
          if($v==$data["user_id"])
            echo json_encode(["msg"=>"already"]);
          exit;
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




  function filePath($files){

    $f=(array)json_decode($files);
    $ar=[];

    for($i=0;$i<count($f);$i++){
      $ar["img $i"]=changePathOfImg($f[$i]);
    }

    return $ar;

  }




