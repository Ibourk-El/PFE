<?php

require_once "./../db.php";

$user="root";
$pwd="";
$db=new Database($user,$pwd);

  $q="SELECT task.title,task.file_path,task.id, taskstate.status FROM task 
  JOIN taskstate WHERE task.class_id=:class_id 
  AND taskstate.status!='nothing' 
  AND task.id=taskstate.task_id
  AND taskstate.student_id=:student_id";
  $re=$db->selectElement($q,["class_id"=>$_GET["class_id"],"student_id"=>$_GET["student_id"]]);
  echo json_encode($re["data"]);


