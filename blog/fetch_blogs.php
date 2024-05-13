<?php
include('connection.php');

if (!isset($_GET['query']) || empty($_GET['query'])) {
    // If no search query is provided or if it's empty, fetch all blogs
    $query = "SELECT heading, content FROM blogs";
} else {
    // If a search query is provided, fetch matching blogs
    $searchQuery = $_GET['query'];
    $query = "SELECT * FROM blogs WHERE heading LIKE '%" . mysqli_real_escape_string($con, $searchQuery) . "%'";
}

$res = mysqli_query($con, $query);

$blogs = array();
while ($row = mysqli_fetch_assoc($res)) {
    $blogs[] = $row;
}

header('Content-Type: application/json');
echo json_encode($blogs);
?>
