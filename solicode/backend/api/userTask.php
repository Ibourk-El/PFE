<?php

require_once "./../db.php";

$user="root";
$pwd="";
$db=new Database($user,$pwd);

  $q="SELECT code FROM taskstate WHERE student_id=:student_id AND task_id=:task_id";
  $re=$db->selectElement($q,["task_id"=>$_GET["task_id"],"student_id"=>$_GET["student_id"]]);
  echo json_encode($re["data"][0]);

