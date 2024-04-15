-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2024 at 02:28 AM
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
(9, 'jjjjkn jk j  jm jkkj  j k', 'C:\\fakepath\\exams.md', '2024-04-08 16:49:37', 1, 'اسهام التسويق في تنمية االقتصاد الكلي', 'izillid ibourk');

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `solved_student_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`solved_student_id`)),
  `unsolved_student_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`unsolved_student_id`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `catigory` varchar(20) NOT NULL,
  `catigory_id` int(11) NOT NULL,
  `creater_name` varchar(255) NOT NULL,
  `creater_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `body`, `catigory`, `catigory_id`, `creater_name`, `creater_id`) VALUES
(3, 'article comment 1', 'article', 1, 'user1', 3),
(4, 'community 1 comment', 'post', 1, 'user1', 3),
(5, 'hello', 'post', 2, 'user1', 3),
(6, 'test', 'post', 1, 'user1', 3),
(7, '', 'article', 1, 'izillid ibourk', 1),
(8, 'comment for post 4', 'post', 3, 'izillid ibourk', 1),
(9, 'new comment in post 4', 'post', 3, 'izillid ibourk', 1),
(10, 'new comment for post 2', 'post', 2, 'izillid ibourk', 1),
(11, 'new comment for test post 4', 'post', 3, 'izillid ibourk', 1),
(12, 'test comment ', 'post', 6, 'izillid ibourk', 1),
(13, 'test', 'post', 6, 'izillid ibourk', 1),
(14, 'test new', 'post', 7, 'izillid ibourk', 1),
(15, 'NEW COMMENT ', 'post', 7, 'izillid ibourk', 1),
(16, 'test new comment', 'post', 7, 'izillid ibourk', 1),
(17, 'test', 'article', 1, 'izillid ibourk', 1),
(18, 'text', 'article', 1, 'izillid ibourk', 1),
(19, 'test', 'article', 1, 'izillid ibourk', 1),
(20, 'eeeeeeeeeee', 'article', 0, 'izillid ibourk', 1),
(21, 'test', 'article', 0, 'izillid ibourk', 1),
(22, 'trte', 'article', 0, 'izillid ibourk', 1),
(23, 't4t4', 'article', 0, 'izillid ibourk', 1),
(24, 'heloo', 'article', 8, 'izillid ibourk', 1),
(25, 'lll', 'article', 8, 'izillid ibourk', 1),
(26, 'jjjj', 'article', 8, 'izillid ibourk', 1),
(27, 'h', 'article', 8, 'izillid ibourk', 1),
(28, 'd', 'article', 8, 'izillid ibourk', 1),
(29, 'gdffgdf fdgdfg', 'article', 9, 'izillid ibourk', 1);

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
(1, 'test1', 'C:\\fakepath\\header http.png', '2024-04-06 03:44:44', 'user1', 3, '{\"likes\":1,\"students_IDs\":[\"1\"]}'),
(2, 'post 2', 'C:\\fakepath\\header http.png', '2024-04-06 02:19:42', 'user1', 3, '{\"likes\":1,\"students_IDs\":[\"1\"]}'),
(3, 'post 4', 'C:\\fakepath\\header http.png', '2024-04-06 02:18:32', 'user1', 3, '{\"likes\":1,\"students_IDs\":[\"1\"]}'),
(4, 'new post for testing life update', 'C:\\fakepath\\header http.png', '2024-04-06 17:03:19', 'izillid ibourk', 1, '{\"likes\":2,\"students_IDs\":[\"1\"]}'),
(6, 'test add new file', 'C:\\fakepath\\exams.md', '2024-04-14 00:57:05', 'izillid ibourk', 1, '{\"likes\":3,\"students_IDs\":[\"1\",\"8\"]}'),
(7, 'new post update', 'C:\\fakepath\\header http.png', '2024-04-14 00:56:57', 'izillid ibourk', 1, '{\"likes\":2,\"students_IDs\":[\"1\",\"8\"]}');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `full_name`, `email`, `pwd`, `class_id`, `tasks`) VALUES
(1, 'izillid ibourk', 'tagmatibourk8@gmail.com', '123', '2', '[{\"task_id\":\"49\",\"task_title\":\"task 4\",\"state\":\"nothing\"},{\"task_id\":\"48\",\"task_title\":\"task 3\",\"state\":\"inDoing\",\"github_url\":\"\"},{\"task_id\":\"47\",\"task_title\":\"task2\",\"state\":\"done\",\"github_url\":\"\"},{\"task_id\":\"45\",\"task_title\":\"task1\",\"state\":\"inDoing\",\"github_url\":\"\"}]'),
(8, 'user 1', 't@g.com', '1234', '2', '');

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
  `creater_id` int(11) UNSIGNED NOT NULL,
  `student` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `title`, `task_body`, `file_path`, `class_id`, `creater_id`, `student`) VALUES
(45, 'task1', 'task1', 'C:\\fakepath\\header http.png', '2', 1, '[{\"student_id\":1,\"student_name\":\"izillid ibourk\",\"state\":\"inDoing\",\"github_url\":\"\"}]'),
(47, 'task2', 'task 2', 'C:\\fakepath\\header http.png', '2', 1, '[{\"student_id\":1,\"student_name\":\"izillid ibourk\",\"state\":\"done\",\"github_url\":\"\"}]'),
(48, 'task 3', 'task 3', 'C:\\fakepath\\header http.png', '2', 1, '[{\"student_id\":1,\"student_name\":\"izillid ibourk\",\"state\":\"inDoing\",\"github_url\":\"\"}]'),
(49, 'task 4', 'task 4', 'C:\\fakepath\\header http.png', '2', 1, '[{\"student_id\":1,\"student_name\":\"izillid ibourk\",\"state\":\"nothing\"}]');

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
