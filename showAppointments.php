<?php
require_once('db.php');
$number = $_GET['phoneNumberFind'];
$sql = "SELECT * FROM clients WHERE phone = '$number'";
$result = mysqli_fetch_assoc(mysqli_query($db_connect ,$sql));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <table class="appoint">
            
            <caption>Записи для номера:<br>
                <?=$number?>
            </caption>
            <?php if (empty($result)): ?>
            <tr>
                <td><p>Для данного номера записей не найдено</p></td>
            </tr>
            <?php else: ?>
            <tr>
                <td>Имя:<?=$result['FIO']?></td>
            </tr>     
            <tr>
            </tr>
                <td>Время:<?=$result['appointDate']?></td>
            <tr>
                <td>Место:<?=$result['Place']?></td>
            </tr>
            <?php endif; ?>
            <tr>
                <td><a href='index.html'>Вернуться назад</a></td>
            </tr>       
        </table>    
    </div>  
    
</body>
</html>