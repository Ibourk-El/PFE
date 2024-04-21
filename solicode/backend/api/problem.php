<?php 

require_once "./../db.php";
require_once "./../handler/problem.handler.php";

$user="root";
$pwd="";
$tbname="challenge";

$data=(array)json_decode(file_get_contents("php://input"));

$db=new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]==="GET"){
  if(empty($_GET)){
    echo json_encode($db->selectAll($tbname,"body,title,id")["data"]);
  }else{
    $query="SELECT title,body,id,code FROM $tbname WHERE id=:id";
    echo json_encode($db->selectElement($query,["id"=>$_GET["id"]])["data"][0]);
  }
}

if($_SERVER["REQUEST_METHOD"]==="POST"){

  $query="SELECT code FROM $tbname WHERE id=:id";
  $result=(array)json_decode($db->selectElement($query,["id"=>$data["problemId"]])["data"][0]["code"]);

  if($data["extantion"]==="javascript"){
    $jsData=(array)($result["javascript"]);
    $expacted_output=$jsData["output"];
    $file_output=executeFile($data,$jsData,"node");
    if($file_output["result_code"]===0){
      echo json_encode(checkAnswers($file_output["output"],$expacted_output));
    }else{
      echo json_encode(["result"=>["Test"=>["state"=>"invalidCode","result"=>"Lock to your code there is some issuse"]]]);
    }
  }

  if($data["extantion"]==="php"){
    $jsData=(array)($result["php"]);
    $expacted_output=$jsData["output"];
    $file_output=executeFile($data,$jsData,"php");
    if($result_code===0){
      echo json_encode(checkAnswers($file_output["output"],$expacted_output));
    }else{
      echo json_encode(["result"=>["Test"=>["state"=>"invalidCode","result"=>"Lock to your code there is some issuse"]]]);
    }
  }
}











