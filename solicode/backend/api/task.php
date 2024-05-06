<?php

require_once "./../db.php";
require_once "./../handler/image.handler.php";
require_once "./../midelware/authorization.php";


if(!(isset($_SERVER['HTTP_X_ACCESS_TOKEN']) && checkIfTheUserIsLoged($_SERVER["HTTP_ID"],$_SERVER['HTTP_X_ACCESS_TOKEN']))){
  http_response_code(401);
  exit();
}
$user="root";
$pwd="";
$data= (array) json_decode(file_get_contents("php://input"));
$db=new Database($user,$pwd);



  switch($_SERVER["REQUEST_METHOD"]){

    case "GET":{

      if(isset($_GET["student_id"])&&isset($_GET["class_id"])){
        // get all task for student
        $q="SELECT task.title,task.file_path,task.id, taskstate.status FROM task 
        INNER JOIN taskstate ON task.id=taskstate.task_id AND taskstate.student_id=:student_id
        WHERE taskstate.status!='valid' AND task.class_id=:class_id    ";
        $re=$db->selectElement($q,["class_id"=>$_GET["class_id"],"student_id"=>$_GET["student_id"]]);
      }

      else if(isset($_GET["id"])){
        // select one task
        $q="SELECT * FROM task WhERE id=:id ORDER BY id DESC";
        $re=$db->selectElement($q,["id"=>$_GET["id"]]);
      }

      else if(isset($_GET["class_id"])){
        // filter tasks  for teacher
        $q="SELECT task.*,taskstate.status,taskstate.student_id ,student.full_name FROM task 
        INNER JOIN taskstate ON taskstate.task_id=task.id AND class_id=:class_id
        INNER JOIN student ON taskstate.student_id=student.id WHERE taskstate.status!='valid'  ORDER BY id DESC";
        $re=$db->selectElement($q,["class_id"=>$_GET["class_id"]]);
      }
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
      // update status of task 
      if($data["status"]==="valid"){
        // teacher valid the task
        $updateQuery="UPDATE taskstate SET status=:status, point=:point  WHERE student_id=:student_id AND task_id=:task_id" ;
      }else if($data["status"]==="invalid"){
        // teacher not valid the task

        $data["status"]="inDoing";
        $updateQuery="UPDATE taskstate SET status=:status  WHERE student_id=:student_id AND task_id=:task_id" ;
      }

      $db->update($updateQuery,$data);
      
      echo json_encode(["status"=>202]);
      break;
    }
    
    case "PATCH":{
      if(isset($data["github_url"])){
        $updateQuery="UPDATE taskstate SET status=:status, github_url=:github_url WHERE student_id=:student_id AND task_id=:task_id" ;
      }else{
        $updateQuery="UPDATE taskstate SET code=:code WHERE student_id=:student_id AND task_id=:task_id" ;
      }
      $db->update($updateQuery,$data);
      
      echo json_encode(["status"=>202]);
      break;
    }
    case "DELETE":{
      break;
    }

    default : json_encode(["msg"=>"method not allowed"]);

  }



