-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-09-18 12:37:01
-- 伺服器版本: 10.1.16-MariaDB
-- PHP 版本： 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `tsoc`
--

-- --------------------------------------------------------

--
-- 資料表結構 `history`
--

CREATE TABLE `history` (
  `uid` int(11) NOT NULL,
  `1` int(11) NOT NULL DEFAULT '1',
  `2` int(11) NOT NULL DEFAULT '0',
  `3` int(11) NOT NULL DEFAULT '0',
  `3-1` int(11) NOT NULL DEFAULT '0',
  `3-2` int(11) NOT NULL DEFAULT '0',
  `3-3` int(11) NOT NULL DEFAULT '0',
  `3-4` int(11) NOT NULL DEFAULT '0',
  `4` int(11) NOT NULL DEFAULT '0',
  `4-1` int(11) NOT NULL DEFAULT '0',
  `4-2` int(11) NOT NULL DEFAULT '0',
  `4-3` int(11) NOT NULL DEFAULT '0',
  `5` int(11) NOT NULL DEFAULT '0',
  `5-1` int(11) NOT NULL DEFAULT '0',
  `5-2` int(11) NOT NULL DEFAULT '0',
  `6` int(11) NOT NULL DEFAULT '0',
  `7` int(11) NOT NULL DEFAULT '0',
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endtime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `history`
--

INSERT INTO `history` (`uid`, `1`, `2`, `3`, `3-1`, `3-2`, `3-3`, `3-4`, `4`, `4-1`, `4-2`, `4-3`, `5`, `5-1`, `5-2`, `6`, `7`, `createtime`, `endtime`) VALUES
(2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(4, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(5, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(6, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(7, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(10, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(11, 2, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 1, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(12, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(13, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '2017-09-06 09:19:59', '2017-09-06 09:19:59'),
(27, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, '2017-09-06 09:49:00', NULL),
(28, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-08 19:52:13', NULL),
(29, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-09-08 20:06:49', NULL),
(30, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '2017-09-16 14:47:42', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `img`
--

CREATE TABLE `img` (
  `uid` int(11) NOT NULL,
  `img0` int(11) NOT NULL DEFAULT '0',
  `img1` int(11) NOT NULL DEFAULT '0',
  `img5` int(11) NOT NULL DEFAULT '0',
  `img6` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `img`
--

INSERT INTO `img` (`uid`, `img0`, `img1`, `img5`, `img6`) VALUES
(2, 1, 1, 1, 1),
(3, 1, 0, 0, 0),
(4, 0, 1, 1, 1),
(5, 1, 1, 1, 1),
(6, 0, 1, 0, 0),
(7, 1, 1, 0, 0),
(9, 0, 0, 0, 0),
(10, 0, 0, 0, 0),
(11, 0, 1, 0, 0),
(12, 0, 0, 0, 0),
(13, 1, 1, 1, 1),
(14, 0, 1, 0, 0),
(27, 1, 1, 1, 1),
(28, 0, 0, 0, 0),
(29, 0, 0, 0, 0),
(30, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `email` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attest` int(11) NOT NULL,
  `code` varchar(126) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`uid`, `email`, `password`, `username`, `picture`, `attest`, `code`, `createtime`) VALUES
(1, 'test@gmail.com', 'test123', '測試~~', '', 0, '', '2017-07-12 11:43:33'),
(2, '123', '123', '清空', '', 1, '', '2017-08-06 20:44:17'),
(3, '111', '111', '111', '', 1, '', '2017-08-13 01:22:14'),
(4, 'gogo06@gmail.com', '123456', '測試', '', 0, '', '2017-08-25 19:43:14'),
(5, 'qqq@gmail.com', 'qqq111', '111', '', 1, '', '2017-08-29 14:07:50'),
(6, 'www@gmail.com', 'qqq111', '吧', '', 0, '', '2017-08-29 15:49:30'),
(7, 'eee@gmail.com', 'qqq111', 'qq', '', 0, '', '2017-08-29 16:07:28'),
(9, '123@gmail.com', '123456', '111', '', 0, '', '2017-08-29 20:42:24'),
(10, '79179@gmail.com', 's123456', '1111', '', 0, '', '2017-08-29 20:43:23'),
(11, 'sally7917932@gmail.com', 's7917932', 'wen', '', 0, '', '2017-08-29 20:44:25'),
(12, 'qqq111@gmail.com', 'qqq456', '456', '', 0, '', '2017-08-30 10:24:22'),
(13, '123456@gmail.com', '123456', '123', '', 1, 'AACA6F7F', '2017-08-30 11:10:25'),
(14, '1234567@gamil.com', '123456', '123456', '', 1, 'A628EBCB', '2017-08-30 11:39:10'),
(27, 'sally791541@gmail.com', 'gogo06', 'hihihihihii', '', 1, 'AA17BD89', '2017-09-06 09:48:56'),
(28, 'aaa@g.com', 'aaa111', 'aaa', '', 0, '33D797AB', '2017-09-08 19:52:04'),
(29, 'smile25896@gmail.com', 'qqq111', '111', '', 1, 'D891101A', '2017-09-08 20:06:44'),
(30, 'fannyvm3@gmail.com', '123456', 'fanny', '', 1, 'E12E7FD3', '2017-09-16 14:47:36');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- 資料表的 Constraints `img`
--
ALTER TABLE `img`
  ADD CONSTRAINT `img_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
