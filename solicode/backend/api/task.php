<?php

require_once "./../db.php";
require_once "./../handler/image.handler.php";

$user="root";
$pwd="";
$data= (array) json_decode(file_get_contents("php://input"));
$db=new Database($user,$pwd);

switch($_SERVER["REQUEST_METHOD"]){

  case "GET":{
    $var="";
    if(isset($_GET["id"]))$var="id";
    if(isset($_GET["class_id"]))$var="class_id";
    $q="SELECT * FROM task WhERE $var=:$var ORDER BY id DESC";
    $re=$db->selectElement($q,[$var=>$_GET["$var"]]);
    echo json_encode($re["data"]);
    break;
  }

  case "POST":{
    // get all students that have the same class id
    $data=(array) json_decode($_POST["data"]);
    $query="SELECT id FROM student WHERE class_id=:class_id";
    $re=[...$db->selectElement($query,["class_id"=>$data["class_id"]])["data"]];

    // insert task
    $imags=handelImages($_FILES["file"]);
    $dt=[...$data,"student"=>json_encode($student),"file_path"=>json_encode($imags)];
    $insertQuery="INSERT INTO task(title,file_path,creater_id,class_id,task_body)
                  VALUES (:title,:file_path,:creater_id,:class_id,:task_body)";
    $db->insert($insertQuery,$dt);
    $task_id=$db->getLastId();

    // add task to  student 
    foreach($re as $v){
      $q="INSERT INTo  taskstate(task_id,student_id,status) VALUES (:task_id,:student_id,:status)";
      $dt=["task_id"=>$task_id,"student_id"=>$v,"state"=>"notStart"];
      $db->insert($q,$dt);
      
    }
    echo json_encode(["status"=>201,"lastId"=>$task_id]);
    break;
  }

  
  case "PUT":{
    break;
  }
  
  case "PATCH":{
    // update state of task 
    $updateQuery="UPDATE taskstate SET status=:status ,github_url=:github_url WHERE student_id=:student_id AND task_id=:task_id" ;
    $db->update($updateQuery,$data);
    
    echo json_encode(["status"=>202]);
    break;
  }
  case "DELETE":{
    break;
  }

  default : json_encode(["msg"=>"method not allowed"]);

}


