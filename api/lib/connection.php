<?php
  $conn = mysqli_connect('127.0.0.1:3306', 'root', 'zharman');
  if (!$conn){
      die("Database Connection Failed" . mysqli_error($conn));
  }
  $select_db = mysqli_select_db($conn, 'zharman');
  if (!$select_db){
      die("Database Selection Failed" . mysqli_error($conn));
  }
?>
