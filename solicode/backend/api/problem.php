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
    $query="SELECT title,body,id,js_fun,php_fun FROM $tbname WHERE id=:id";
    $re=$db->selectElement($query,["id"=>$_GET["id"]])["data"][0];
    echo json_encode($re);
  }
}

if($_SERVER["REQUEST_METHOD"]==="POST"){

  
  if($data["extantion"]==="javascript"){
    $query="SELECT js,output FROM $tbname WHERE id=:id";

    $url_of_test_file=$db->selectElement($query,["id"=>$data["problemId"]])["data"][0]["js"];
    $expacted_output=(array)json_decode(($db->selectElement($query,["id"=>$data["problemId"]])["data"][0]["output"]));

    $content=file_get_contents($url_of_test_file);

    $file_output=executeFile($data,$content,"node","js");
    if($file_output["result_code"]===0){
      echo json_encode(checkAnswers($file_output["output"],$expacted_output));
    }else{
      echo json_encode(["result"=>["Test"=>["state"=>"invalidCode","result"=>"Lock to your code there is some issuse"]]]);
    }
  }
}











