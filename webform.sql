-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 03 2022 г., 15:57
-- Версия сервера: 8.0.26
-- Версия PHP: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `webform`
--

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `id` int UNSIGNED NOT NULL,
  `FIO` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthDay` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `INN` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Place` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `appointDate` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`id`, `FIO`, `birthDay`, `phone`, `INN`, `email`, `Place`, `appointDate`) VALUES
(63, 'Андрей Адреевич Никитин', '05.07.2001', '8(904)-256-14-12', '111111111111', 'example@gmail.com', 'MPEI', '03.07.2022 05:48'),
(64, 'Андрей Адреевич Андреев', '05.07.2001', '8(904)-256-14-13', '111111111111', 'example@gmail.com', 'MPEI', '10.07.2022 05:55'),
(67, 'Финальная Проверка Готовности', '06.06.1996', '8(904)-256-14-14', '101010101010', 'example@gmail.com', 'MPEI', '10.07.2022 18:56');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
