<?php
session_start();
/* Title of the page */
$page_title = "Login";
/* Include header */
include ("../includes/header.php");
?>
<body class="login-body">
  <div class="admin-container"> 

<h1>Admin</h1>

<?php
/* Checks if user has put in right values in required fields */
if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username == "user" && $password == "password") {
        $_SESSION['username'] = $username;
        header("Location: admin.php");
    } else {
        $message = "Felaktigt användarnamn/lösenord";
    }
}
?>
<!-- Section begins -->
<section class="sectioning">
    <section id="section_login">
        <!-- PHP begins -->
        <?php
        if (isset($_GET['message'])) {
            echo $_GET['message'] . "<br>";
        }
        /* Alert for wrong username and password */
        if (isset($message)) {
            echo "<span class='alert'>Fel användarnamn/lösenord!</span><br>";
        }
        ?>
        <!-- / PHP ends --><br>
        <!-- User form to login -->
        <form id="login_form" method="post" action="login.php" accept-charset="UTF-8">
            <fieldset>
                <legend>Logga in</legend>
                <br>
                <input type="hidden" name="submitted" id="submitted" value="1">
                <label for="username">Användarnamn:</label>
                <br>
                <input type="text" name="username" id="username" maxlength="50">
                <br>
                <label for="password">Lösenord:</label>
                <br>
                <input type="password" name="password" id="password" maxlength="50">
                <br>
                <br><br>
                <input type="submit" name="login" id="login_button" value="Logga in">
            </fieldset>
        </form>
    </section>
</section>
</div> 
<!-- Include footer -->
</body>
<?php
include("includes/footer.php");
?>