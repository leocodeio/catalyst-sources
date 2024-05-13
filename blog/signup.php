<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
  <header>
    <h1>Sign Up</h1>
  </header>
  <main>
    <form method='post' id="signupForm">
      <input type="text" name="username" placeholder="Username" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <input type="password" name="reenterPassword" placeholder="Re-enter Password" required>
      <button type="submit">Sign Up</button>
      
    </form>
    <button><a href="login.php" id="login" blank>Login</a></button>
    <button><a href="home.php">Home</a></button>
  </main>
</div>
</body>
</html>

<?php

session_start();

include("connection.php");
include("functions.php");

if($_SERVER['REQUEST_METHOD']=='POST')
{
  $username=$_POST['username'];
  $email=$_POST['email'];
  $password=$_POST['password'];
  $repass=$_POST['reenterPassword'];

  if(!empty($username) && !empty($email) && !empty($password) && !empty($repass))
  {
    if($password==$repass)
    {
      $userid=random_num(20);
      $query="insert into blogusers(userId,userName,email,password) values('$userid','$username','$email','$password');";

      $res=mysqli_query($con,$query);
      header('Location:login.php');

    }
  }
}
