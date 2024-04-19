<?php

require_once "./../db.php";
require_once "./../fileHandler/filehandler.php";

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
    $query="SELECT id,full_name,tasks FROM student WHERE class_id=:class_id";
    $re=[...$db->selectElement($query,["class_id"=>$data["class_id"]])["data"]];
    $student=[];

    foreach($re as $v){
      $userData=["student_id"=>$v["id"],"student_name"=>$v["full_name"],"state"=>"nothing"];
      array_push($student,$userData);
    }

    // add students to the task table and add task to task table
    $imags=[...handelImages($_FILES["file"])];
    $dt=[...$data,"student"=>json_encode($student),"file_path"=>json_encode($imags)];
    $insertQuery="INSERT INTO task(title,file_path,student,creater_id,class_id,task_body)
                  VALUES (:title,:file_path,:student,:creater_id,:class_id,:task_body)";
    $db->insert($insertQuery,$dt);
    $task_id=$db->getLastId();

    // add tasks to tasks column in student table 
    foreach($re as $v){
      $q="UPDATE student SET tasks=:tasks WHERE id=:id";
      if(isset($v["tasks"])){
        $d=json_encode([["task_id"=>$task_id,"task_title"=>$data["title"],"state"=>"nothing"],...(array) json_decode($v["tasks"])]);
      }
      else{
        $d=json_encode([["task_id"=>$task_id,"task_title"=>$data["title"],"state"=>"nothing"]]);
      }
      $db->update($q,["tasks"=>$d,"id"=>$v["id"]]);
    }
    echo json_encode(["status"=>201,"lastId"=>$task_id]);
    break;
  }

  case "DELETE":{
    break;
  }

  case "PUT":{
    break;
  }

  case "PATCH":{
    // update state of task 
    updateStateOfTask('task','student',$data["task_id"],"student_id");
    updateStateOfTask('student','tasks',$data["student_id"],"task_id");
    
    echo json_encode(["status"=>202]);
    break;
  }

  default : json_encode(["msg"=>"method not allowed"]);

}

function updateStateOfTask($tb,$col,$id,$searchId){
  global $db,$data;
  $selectQuery="SELECT $col FROM $tb WHERE id=:id";
  $result=$db->selectElement($selectQuery,["id"=>$id]);
  $student=(array) json_decode($result["data"][0][$col]);
  $newArr=[];
  
  for($i=0;$i<count((array)$student);$i++){
    $t=(array)$student[$i];
    if($data[$searchId]==$t[$searchId]){
      $t["state"]=$data["state"];
      $t["github_url"]=$data["github_url"];
    };
    array_push($newArr,$t);
  }
  $newArr=json_encode($newArr);
  $updateQuery="UPDATE $tb SET $col='$newArr' WHERE id=:id" ;
  $db->update($updateQuery,["id"=>$id]);

}

