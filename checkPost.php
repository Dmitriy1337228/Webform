<?php
require_once('db.php'); // подключение к бд
require_once('handlers.php'); // обработчики

$FIO = preg_replace('| +|',' ',$_POST['person']); // замена любого кол-ва пробелов одним
$dataVer1 = $_POST['dataVer1'];
$dataVer2 = $_POST['dataVer2'];
$dataVer3 = $_POST['dataVer3'];
$dataVer4 = $_POST['dataVer4'];
$phoneNumber = $_POST['phoneNumber'];
$INN = $_POST['INN'];
$email = trim(htmlspecialchars(addslashes($_POST['email']))); // единственное поле куда могут ввести потенциально опасные данные
$select = $_POST['select'];

$birthDay = getRightDate($dataVer1,$dataVer2);
$appointDate = formatDate(getRightDate($dataVer3,$dataVer4));

// проверка на занятость даты / телефона
$user = mysqli_fetch_assoc(mysqli_query( $db_connect ,"SELECT * FROM clients WHERE phone = '$phoneNumber' OR appointDate = '$appointDate'"));
if (empty($user)) { // если свободно - записываем
	mysqli_query( $db_connect ,"INSERT INTO clients (FIO, birthDay, phone, INN, email, Place, appointDate) VALUES ('{$FIO}', '{$birthDay}', '{$phoneNumber}', '{$INN}', '{$email}', '{$select}', '{$appointDate}')" );
	echo "Сотрудник записан.";
}
else {
	echo"Данный сотрудник уже записан или данное время уже занято.";
}
?>