<?php

session_start();
$isLoggedIn = isset($_SESSION['userId']);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Website</title>
    <link rel="stylesheet" href="styles.css">
</head>


<body>
    <header>
        <?php if (!$isLoggedIn): ?>
            <h1>Blog Website</h1>
            <div class="list_div">
                <a href="login.php" class="login">Login</a>
                <a href="signup.php" class="signup">Sign Up</a>
                <a href="login.php" class="write_blog">Create your own Blog</a>
            </div>
        <?php else: ?>
            <h1>Blog Website</h1>
            <h1>Hello
                <?php echo $_SESSION['userName']; ?>
            </h1>
            <div class="list_div">
                <a href="logout.php" class="logout">Log Out</a>
                <a href="blog.php" class="write_blog">Create your own Blog</a>
            </div>
        <?php endif; ?>


    </header>


    <main>
    <form id="searchForm" action="searched.php" method="GET">
            <input type="text" name="query" placeholder="Search blogs by heading">
            <button  type="submit">Search</button>
    </form>
        <section id="blogs" class="blogs">

            <!-- <div class="blog-card">
                    <div class="blog">
                        <h3>Blog Title 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ligula in turpis
                            tempus, vel feugiat metus fermentum. Sed auctor ex sed nibh sollicitudin ultricies.</p>
                    </div>
                </div> -->
            <!-- Additional blog cards go here -->

        </section>
    </main>
    <script src="app.js"></script>
</body>

</html>