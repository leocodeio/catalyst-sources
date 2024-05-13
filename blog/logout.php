<?php
session_start();
$_SESSION['userId']=null;
session_destroy();
header("Location: home.php");

die;

?>