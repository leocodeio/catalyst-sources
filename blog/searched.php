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
        <h1>Blog Website</h1>
    </header>
    <main>
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