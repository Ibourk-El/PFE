-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 03:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solicode_student`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creater_id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `creater_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `body`, `file_path`, `create_at`, `creater_id`, `title`, `creater_name`) VALUES
(2, 'jjjjjjjjjjjjjjjjj', 'C:\\fakepath\\connect with api.png', '2024-03-19 20:53:50', 0, 'Hello Evryone i am her ', 'izillid ibourk'),
(3, 'test2', 'C:\\fakepath\\connect with api.png', '2024-03-19 22:21:04', 0, 'Hello Evryone i am her ', 'izillid ibourk'),
(4, 'body 1', 'C:\\fakepath\\solicode-community.png', '2024-03-22 02:38:52', 3, 'user1 title 1', 'user1'),
(5, 'body 2', 'C:\\fakepath\\solicode-community.png', '2024-03-19 22:21:20', 2, 'user1 title 2', 'user1'),
(6, 'body 3', 'C:\\fakepath\\solicode-community.png', '2024-03-19 22:21:32', 2, 'user1 title 3', 'user1'),
(7, 'body 4', 'C:\\fakepath\\solicode-community.png', '2024-03-19 22:21:38', 2, 'user1 title 4', 'user1'),
(8, '1000000000 000000000000 00000000', 'C:\\fakepath\\header http.png', '2024-03-22 02:39:27', 3, 'test100', 'user2'),
(9, 'jjjjkn jk j  jm jkkj  j k', 'C:\\fakepath\\exams.md', '2024-04-08 16:49:37', 1, 'اسهام التسويق في تنمية االقتصاد الكلي', 'izillid ibourk'),
(10, 'sv d d d dd dcx', '[\"C:\\\\xampp\\\\htdocs\\\\projects\\\\PFE\\\\solicode\\\\backend\\\\fileHandler\\\\..\\\\image\\\\1713505115.jpg\"]', '2024-04-19 06:38:35', 8, 'it is me', 'user 1'),
(11, 'sv d d d dd dcx', '[\"C:\\\\xampp\\\\htdocs\\\\projects\\\\PFE\\\\solicode\\\\backend\\\\fileHandler\\\\..\\\\image\\\\1713505165.jpg\"]', '2024-04-19 06:39:25', 8, 'it is me', 'user 1'),
(12, '<p>wfwfw vw wevwe vw vwrv</p>', '[\"C:\\\\xampp\\\\htdocs\\\\projects\\\\PFE\\\\solicode\\\\backend\\\\handler\\\\..\\\\image\\\\1713891575.png\"]', '2024-04-23 17:59:35', 21, 'wefwfwe', 'e');

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `php` varchar(255) NOT NULL,
  `js` varchar(255) NOT NULL,
  `js_fun` varchar(300) NOT NULL,
  `php_fun` varchar(300) NOT NULL,
  `output` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`output`)),
  `Difficulty` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenge`
--

INSERT INTO `challenge` (`id`, `title`, `body`, `php`, `js`, `js_fun`, `php_fun`, `output`, `Difficulty`) VALUES
(1, 'problem1', 'problem 1 body', '', 'C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\files\\problems-file\\problem1.js', 'function sum(n,x){return;}', '', '[3,4,5,6]', 'easy');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `catigory` varchar(20) NOT NULL,
  `catigory_id` int(11) UNSIGNED NOT NULL,
  `creater_name` varchar(255) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `body`, `catigory`, `catigory_id`, `creater_name`, `creater_id`) VALUES
(50, 'jjjjj', 'post', 16, 'e', 21);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) UNSIGNED NOT NULL,
  `post_body` text NOT NULL,
  `file_path` varchar(200) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `creater_name` varchar(255) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL,
  `likes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`likes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `post_body`, `file_path`, `create_at`, `creater_name`, `creater_id`, `likes`) VALUES
(16, '<p>afafadf   af af</p><p>af</p><p></p><p>as</p><p>f</p><p>asf</p><p></p><p>a</p><p>f</p>', '[\"C:\\\\xampp\\\\htdocs\\\\projects\\\\PFE\\\\solicode\\\\backend\\\\handler\\\\..\\\\image\\\\1713899003.jpeg\"]', '2024-04-23 22:20:03', 'e', 21, '{\"likes\":1,\"students_IDs\":[\"8\"]}');

-- --------------------------------------------------------

--
-- Table structure for table `problemstate`
--

CREATE TABLE `problemstate` (
  `id` int(11) UNSIGNED NOT NULL,
  `problem_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `js_code` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `php_code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problemstate`
--

INSERT INTO `problemstate` (`id`, `problem_id`, `student_id`, `js_code`, `status`, `php_code`) VALUES
(1, 1, 8, NULL, 'no valid', '');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `photo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `full_name`, `email`, `pwd`, `class_id`, `photo`) VALUES
(1, 'izillid ibourk', 'tagmatibourk8@gmail.com', '123', '2', ''),
(8, 'user 1', 't@g.com', '1234', '2', ''),
(21, 'e', 'e@e.e', '1234', '2', 'C:\\xampp\\htdocs\\projects\\PFE\\solicode\\backend\\api\\..\\image\\profile_avatar.png');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `task_body` text NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `class_id` varchar(10) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `title`, `task_body`, `file_path`, `class_id`, `creater_id`) VALUES
(45, 'task1', 'task1', 'C:\\fakepath\\header http.png', '2', 1),
(47, 'task2', 'task 2', 'C:\\fakepath\\header http.png', '2', 1),
(48, 'task 3', 'task 3', 'C:\\fakepath\\header http.png', '2', 1),
(49, 'task 4', 'task 4', 'C:\\fakepath\\header http.png', '2', 1),
(50, 'task5', 'nnknkknk lmlml', 'C:\\fakepath\\AWS+Cloud+Practitioner_Practice+Questions_DCT.pdf', '2', 1),
(51, 'task5', 'nnknkknk lmlml', 'C:\\fakepath\\AWS+Cloud+Practitioner_Practice+Questions_DCT.pdf', '2', 1),
(52, '100', '212121', '[\"C:\\\\xampp\\\\htdocs\\\\projects\\\\PFE\\\\solicode\\\\backend\\\\fileHandler\\\\..\\\\image\\\\1713499963.jpeg\"]', '2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `taskstate`
--

CREATE TABLE `taskstate` (
  `task_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `status` varchar(15) NOT NULL,
  `id` int(11) NOT NULL,
  `github_url` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskstate`
--

INSERT INTO `taskstate` (`task_id`, `student_id`, `status`, `id`, `github_url`) VALUES
(45, 8, 'inDoing', 1, ''),
(47, 8, 'done', 2, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_1` (`creater_id`),
  ADD KEY `comments_ibfk_2` (`catigory_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creater_id` (`creater_id`);

--
-- Indexes for table `problemstate`
--
ALTER TABLE `problemstate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `problem_id` (`problem_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `taskstate_ibfk_2` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `problemstate`
--
ALTER TABLE `problemstate`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `taskstate`
--
ALTER TABLE `taskstate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`creater_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`catigory_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`creater_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `problemstate`
--
ALTER TABLE `problemstate`
  ADD CONSTRAINT `problemstate_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `problemstate_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `challenge` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD CONSTRAINT `taskstate_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `taskstate_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
