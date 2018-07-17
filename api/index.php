<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin,Content-Type,Limit,Sort,Offset');
  header('Content-Type: application/json; charset=UTF-8');

  require_once ('lib/connection.php');

  date_default_timezone_set("UTC");

  if(isset($_POST) & !empty($_POST)){
    $usName = mysqli_real_escape_string($conn, $_POST['usName']);
    $usAlias = mysqli_real_escape_string($conn, $_POST['usAlias']);
    $usEmail = mysqli_real_escape_string($conn, $_POST['usEmail']);
    $usHash = mysqli_real_escape_string($conn, $_POST['usHash']);
  }

  $CreateSql = "INSERT INTO `users` (name, alias, hash, email) VALUES ('$usName', '$usAlias', '$usHash', '$usEmail')";

  $res = mysqli_query($conn, $CreateSql) or die(mysqli_error($conn));
    if($res){
      $smsg = "Successfully inserted data, insert New data.";
    }else{
      $fmsg = "Data not inserted, please try again later.";
    }
  /*
  include('lib/utils.php');

  $token = $_SERVER['HTTP_AUTHORIZATION'];
  $method = $_SERVER['REQUEST_METHOD'];
  $uri = $_SERVER['REQUEST_URI'];
  $api = new API( $token, $method, $uri, getcwd() );
  */
?>
