<?php
    include('db.php');
    $search = $_POST['search'];

    if(!empty($search)){
        $query = "SELECT * FROM task WHERE title LIKE '$search%'";
        $result = mysqli_query($conn, $query);
        if(!$result){
            die('Query Error: '.mysqli_error($conn));
        }
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'created_at' => $row['created_at']
            );
        }

        $jsonString = json_encode($json);
        echo $jsonString;
    }
?>