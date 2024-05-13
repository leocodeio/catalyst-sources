<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Blog</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <header>
            <h1>Blog Website</h1>
        </header>
        <main>
            <form method='post' id="blogForm">
                <input type="text" name="heading" placeholder="Heading" required>
                <textarea name="content" placeholder="Content" required></textarea>
                <button type="submit">Submit</button>
            </form>
            <button><a href="home.php">Home</a></button>
        </main>
        <footer>
            <p>&copy; 2024 Blog Website. All rights reserved.</p>
        </footer>
    </div>
</body>

</html>


<?php

session_start();

include("connection.php");
include("functions.php");

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_SESSION['userId'])) {

        $userId = $_SESSION['userId'];
        $heading = $_POST['heading'];
        $content = $_POST['content'];

        if(!empty($userId) && !empty($heading) && !empty($content)) {
            $query = "INSERT INTO blogs(userId,heading,content) VALUES('$userId','$heading','$content')";
            $res = mysqli_query($con, $query);
            if($res) {
                header("Location: home.php");
                exit(); // Make sure to exit after redirection
            } else {
                echo "Error: " . mysqli_error($con);
            }
        }
    }
}

?>
