-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-02-2026 a las 04:46:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `techdev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `anios` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `edad`, `pais`, `cargo`, `anios`, `created_at`) VALUES
(3, 'Angie Lorena Leal', 20, 'Colombia', 'REPOSITORIO DE OVA', 1, '2026-02-03 02:34:38'),
(4, 'Ever Tique Giron', 55, 'Colombia', 'Catedratico', 10, '2026-02-03 02:57:31'),
(5, 'Arles Leal Tapiero', 24, 'Colombia', 'Conductor ', 5, '2026-02-03 02:59:54'),
(6, 'Erika Remicio Ascencio ', 29, 'Peru', 'Contadora Publica', 7, '2026-02-03 03:00:41'),
(7, 'Sofia Mora Madrigal ', 21, 'Venezuela', 'Manipuladora de Alimentos', 3, '2026-02-03 03:01:38'),
(8, 'Yanet Gusman Ascencio ', 48, 'Peru', 'Manipuladora de Alimentos ', 21, '2026-02-03 03:03:52'),
(9, 'Herley Quintero Pinilla ', 49, 'Colmbia ', 'Conductor profesional ', 25, '2026-02-03 03:05:02'),
(10, 'Tania Marcela Trujillo ', 25, 'Colombia ', 'Abogada ', 5, '2026-02-03 03:05:51'),
(11, 'Sharit Bonilla Espinoza ', 34, 'Peru', 'Auxiliar de Aseo', 3, '2026-02-03 03:07:05'),
(12, 'Yasmid Tapia ', 40, 'Venezula', 'Jefe de seguridad ', 8, '2026-02-03 03:07:51'),
(13, 'Daniela Rodrigues Pérez  ', 23, 'Colombia', 'Diseñadora Grafica', 4, '2026-02-03 03:08:50'),
(14, 'Julian Stiven Medina', 29, 'Colombia', 'Auxiliar contable', 3, '2026-02-03 03:43:57');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
