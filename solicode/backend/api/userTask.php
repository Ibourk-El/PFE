<?php

require_once "./../db.php";

$user="root";
$pwd="";
$db=new Database($user,$pwd);

if($_SERVER["REQUEST_METHOD"]==="GET"){
  $q="SELECT tasks FROM student WHERE id=:id";
  $re=$db->selectElement($q,["id"=>$_GET["id"]]);
  echo $re["data"][0]["tasks"];
}

