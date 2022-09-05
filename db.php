<?php // подключение к бд webform
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '1212');
	define('DB_NAME', 'webform');
	
	$mysql = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if ($mysql -> connect_errno) exit('Ошибка подключения к БД');
	$mysql -> set_charset('utf8');
	$db_connect = mysqli_connect('localhost', 'root', '1212', 'webform');
?>