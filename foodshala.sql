-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2020 at 05:17 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodshala`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customernumber` varchar(10) NOT NULL,
  `restaurantnumber` varchar(10) NOT NULL,
  `itemname` varchar(30) NOT NULL,
  `restaurantaddress` varchar(30) NOT NULL,
  `restaurantname` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `nooforders` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customernumber`, `restaurantnumber`, `itemname`, `restaurantaddress`, `restaurantname`, `status`, `nooforders`) VALUES
('7898765432', '7418520963', 'AA', '0', '0', '0', '0'),
('7898765432', '0987654321', 'CHILLI', '0', '0', '0', '0'),
('7898765432', '7418520963', 'SDF', '0', '0', '0', '0'),
('7898765432', '7418520963', 'SDF', '0', '0', '0', '0'),
('7898765432', '7418520963', 'CHICKEN KORMA', '0', '0', '0', '0'),
('7898765432', '7418520963', 'AA', '0', '0', '0', '0'),
('7898765432', '{', '{', '{', '{', 'Booked', '{'),
('7898765432', '7418520963', 'AA', 'azxcv', 'tipu', 'Booked', '1'),
('7898765432', '0987654321', 'CHILLI', 'sdfghjkl', 'titu', 'Booked', '1'),
('7898765432', '7418520963', 'SDF', 'azxcv', 'tipu', 'Booked', '1'),
('7898765432', '7418520963', 'CHICKEN KORMA', 'azxcv', 'tipu', 'Booked', '1'),
('6644454545', '7418520963', 'CHICKEN KORMA', 'azxcv', 'tipu', 'Booked', '1'),
('6644454545', '0987654321', 'CHILLI', 'sdfghjkl', 'titu', 'Booked', '1'),
('8987876545', '7418520963', 'AA', 'azxcv', 'tipu', 'Booked', '1'),
('8987876545', '7418520963', 'SDF', 'azxcv', 'tipu', 'Booked', '1');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `itemname` varchar(30) NOT NULL,
  `restaurantname` varchar(40) NOT NULL,
  `restaurantaddress` varchar(50) NOT NULL,
  `restaurantnumber` varchar(10) NOT NULL,
  `images` varchar(50) NOT NULL,
  `vernonveg` varchar(5) NOT NULL,
  `1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`itemname`, `restaurantname`, `restaurantaddress`, `restaurantnumber`, `images`, `vernonveg`, `1`) VALUES
('aa', 'tipu', 'azxcv', '7418520963', 'Capture.PNG', 'veg', 1),
('chilli', 'titu', 'sdfghjkl', '0987654321', 'CATURE.PNG', 'veg', 2),
('sdf', 'tipu', 'azxcv', '7418520963', 'captures.PNG', 'veg', 3),
('Chicken Korma', 'tipu', 'azxcv', '7418520963', 'capture1.png', 'Nonve', 4),
('French Toast', 'dsasdsdada', 'qdads', '9809090909', 'bread.png', 'veg', 5),
('Bowl Pizza', 'dsasdsdada', 'qdads', '8987654543', 'bowl.jpeg', 'Nonve', 6),
('Korma', 'RESTAURANT', 'ojnsdj,d,sd', '1122334455', 'korma.jpg', 'Nonve', 7);

-- --------------------------------------------------------

--
-- Table structure for table `restaurantlogin`
--

CREATE TABLE `restaurantlogin` (
  `name` varchar(30) NOT NULL,
  `phoneno` varchar(10) NOT NULL,
  `emailid` varchar(40) NOT NULL,
  `address` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurantlogin`
--

INSERT INTO `restaurantlogin` (`name`, `phoneno`, `emailid`, `address`, `password`) VALUES
('dddfssad', '0987654567', 'asd@ads.sad', 'bsathrsrgf', 'asddsda'),
('RESTAURANT', '1122334455', 'rest@g.c', 'ojnsdj,d,sd', 'asd'),
('tipu', '7418520963', 'aa@aa.aa', 'azxcv', 'asd'),
('tipu', '7741852096', 'ab@aa.aa', 'azxcv', 'asd'),
('dadsd', '7876543212', 'asd@sa.as', 'asasdasd', '2131312312313'),
('qazwsx', '7898789987', 'aap@aa.aa', 'rdzesawq', 'asd'),
('dsasdsdada', '8765432111', 'asd@asd', 'qdads', 'asdasd'),
('tipu', '8774185209', 'abc@aa.aa', 'azxcv', 'asd'),
('Kumar', '9876543231', 'a@b.c', 'asdfghjkl;', '1234'),
('sasd', 'ffew', 'asd', 'aas', 'ad'),
('sd', 'qfsfsfd', 'sd', 'ddsff', 'ddsd');

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `name` varchar(40) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `address` varchar(70) NOT NULL,
  `number` varchar(10) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`name`, `emailid`, `address`, `number`, `password`) VALUES
('wses', 'a@a.a', 'xa', '6644454545', '1234'),
('cds', 'as@a', 'fghjkl', '567890', 'asd'),
('dsa', 'as@as.as', 'qwe', '5678567856', 'asd'),
('Avin', 'avin@gmail.com', 'asdfghjkldfghjkfgh', '7898765432', '1234'),
('Avinash Kumar Singh', 'avinashsinghavin@gmail.com', 'rohtas, Bihar, India', '7033526043', 'Avinash123'),
('rte', 'b@b.b', '3434', '8987876545', '1234'),
('sdadsdf', 'dsasd@asd.asd', 'sssddsfd', '8976456346', 'ssdsdfdasdf'),
('ooiujnhi', 'op@op.op', 'opop', '9897656545', '1234567'),
('qaz', 'zxc@a.a', 'poki', '8986757564', 'asd'),
('qseswd', 'zxsc@as.as', 'ytituyi', '9898765654', 'asdfghj');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`1`);

--
-- Indexes for table `restaurantlogin`
--
ALTER TABLE `restaurantlogin`
  ADD UNIQUE KEY `phoneno` (`phoneno`),
  ADD UNIQUE KEY `emailid` (`emailid`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD UNIQUE KEY `emailid` (`emailid`),
  ADD UNIQUE KEY `number` (`number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `1` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
