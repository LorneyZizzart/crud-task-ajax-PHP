<?php
    include('db.php');
    if(isset($_POST['title']) && isset($_POST['description'])){
        $title = $_POST['title'];
        $description = $_POST['description'];

        $query = "INSERT INTO task (title, description) VALUES ('$title', '$description')";
        $result = mysqli_query($conn, $query);
        if(!$result){
            die('Query failed');
        }
        echo 'Task save successfully';

    }
?>