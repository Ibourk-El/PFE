<?php
  class Database{
    private $dns="mysql:host=localhost;dbname=solicode_student";
    private $pdo;

    public function __construct($user,$pwd)
    {
      try{
        $this->pdo=new PDO($this->dns,$user,$pwd);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      }catch(PDOException $e){
        echo "feild to connet with db".$e;
      }
    }

    function insert( string $query , array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v)$in->bindValue(":$k",$v);
        $in->execute();
        return true ;
      }catch(PDOException $e){
        return [$data,"err"=>[$e->getMessage()]];
      }
    }

    function update( string $query , array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v)$in->bindValue($k,$v);
        $in->execute();
      }catch(PDOException $e){
        echo "Feild To Update Data".$e;
      }
    }

    function selectAll(string $tbname){
      try{
        $query="SELECT * FROM $tbname ORDER BY id DESC";
        $in=$this->pdo->prepare($query);
        $in->execute();
        $result=$in->fetchAll(PDO::FETCH_ASSOC);
        return ["data"=>$result];
      }catch(PDOException $e){
        echo ["data"=>[$e->getMessage()]];
      }
    }

    public function selectPart(string $tbname,int $s,$contity){
      try{
        $query="SELECT * FROM $tbname ORDER BY id DESC LIMIT :s,:c";
        $in=$this->pdo->prepare($query);
        $in->bindParam(":s",$s);
        $in->bindParam(":c",$contity);
        $in->execute();
        $result=$in->fetchAll(PDO::FETCH_ASSOC);
        return $result;
      }catch(PDOException $e){
        echo ["data"=>[$e->getMessage()]];
      }
    }

    public function selectElement(string $query, array $data){
      try{
        $in=$this->pdo->prepare($query);
        foreach($data as $k=>$v){
          $in->bindValue(":$k",$v);
        }
        $in->execute();
        $result=$in->fetchAll(PDO::FETCH_ASSOC);
        return ["data"=>$result];
      }catch(PDOException $e){
        return ["data"=>[$e->getMessage()]];
      }
    }

    public function delete(string $tbname , int $id){
      try{
        $query="DELETE  FROM $tbname WHERE id=:id";
        $in=$this->pdo->prepare($query);
        $in->bindParam(":id",$id);
        $in->execute();
      }catch(PDOException $e){
        echo "Field To Delete Data";
      }
    }
    public function getLastId(){
      return $this->pdo->lastInsertId();
    }

    public  function __destruct()
    {
      $this->pdo=null;
    }
  }

