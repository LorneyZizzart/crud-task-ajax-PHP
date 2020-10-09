<?php
    include('db.php');
    if(isset($_POST['title']) && isset($_POST['description']) && isset($_POST['id'])){
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $query = "UPDATE task SET title = '$title', description = '$description' WHERE id = $id";
        $result = mysqli_query($conn, $query);
        if(!$result){
            die('Query failed');
        }

        echo "Task update successfully";
    }
?>