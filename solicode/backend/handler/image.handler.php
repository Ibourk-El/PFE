<?php


  $IMAGE_PATH=__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."image".DIRECTORY_SEPARATOR;
  
  function handelImages($files){
    $images_path=[];
    global $IMAGE_PATH;
    for($i=0;$i<count($files["name"]);$i++){
      if(checkExtantion($files["type"][$i])!==""){
        $new_path=$IMAGE_PATH.changeImgName($files["name"][$i]);
        array_push($images_path,$new_path);
        move_uploaded_file($files["tmp_name"][$i],$new_path);
      }
      else{
        echo "type of this [".$files["name"][$i]."] file is not valid";
      }
    }
    return json_encode($images_path);
  }

function changeImgName($file_name){
    $ext=pathinfo($file_name,PATHINFO_EXTENSION);
    $new_name=time().".".$ext ;
    return $new_name;
}

function checkExtantion($file_type){
  $arr=["image/png","image/jpeg","image/jpg"];
  return array_search($file_type,$arr);
}

function changePathOfImg($url){
  
  return str_replace("C:\\xampp\\htdocs\\projects\\PFE\\solicode","http://localhost/projects/PFE/solicode/",$url);

}



