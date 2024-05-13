<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
  <header>
    <h1>Login</h1>
  </header>
  <main>
    <form method='post' id="loginForm">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
      
    </form>
    <button><a href="signup.php" id="signup">Sign Up</a></button>
    <button><a href="home.php">Home</a></button>
  </main>
</div>



</body>
</html>

<?php
session_start();

require_once "connection.php";
require_once "functions.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (!empty($username) && !empty($password)) {
    $query = "SELECT * FROM blogusers WHERE userName='$username' AND password='$password';";
    $res = mysqli_query($con, $query);

    if ($res && mysqli_num_rows($res) > 0) {
      $userData = mysqli_fetch_assoc($res);
      
      if ($userData['password'] == $password) {
        $_SESSION['userId'] = $userData['userId'];
        $_SESSION['userName'] = $userData['userName'];
        header("Location: home.php");
        exit();
      }
    }
  }
}
?>
