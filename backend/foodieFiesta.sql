CREATE DATABASE IF NOT EXISTS `if0_38763513_foodiedb`;
USE `if0_38763513_foodiedb`;

DROP TABLE IF EXISTS `food_items`;

CREATE TABLE `food_items` (
  `item_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO food_items (item_id, name, price) VALUES
(1, 'Margherita Pizza', 299.00),
(2, 'Farmhouse Pizza', 349.00),
(3, 'Red Sauce Pasta', 249.00),
(4, 'White Sauce Pasta', 269.00),
(5, 'Spaghetti', 229.00),
(6, 'Masala Dosa', 129.00),
(7, 'Rava Dosa', 119.00),
(8, 'Idli', 89.00),
(9, 'Vada', 79.00),
(10, 'Hyderabadi Biryani', 299.00),
(11, 'Traditional Lassi', 79.00),
(12, 'Mango Lassi', 89.00),
(13, 'Lemon Soda', 49.00),
(14, 'Virgin Mojito', 99.00),
(15, 'Mint Mojito', 109.00),
(16, 'Strawberry Shake', 129.00),
(17, 'Blueberry Shake', 139.00),
(18, 'Hot Chocolate', 119.00),
(19, 'Coffee', 89.00),
(20, 'Tea', 59.00),
(21, 'Chole Bhature', 169.00),
(22, 'Paneer Butter Masala', 249.00),
(23, 'Paneer Lababdaar', 259.00),
(24, 'Palak Paneer', 239.00),
(25, 'Mutter Paneer', 229.00),
(26, 'Dal Makhani', 199.00),
(27, 'Tandoori Roti', 35.00),
(28, 'Garlic Naan', 45.00),
(29, 'Butter Naan', 40.00),
(30, 'Samosa', 49.00),
(31, 'Kachori', 45.00),
(32, 'Pav Bhaji', 149.00),
(33, 'Pani Puri', 59.00),
(34, 'Peri Peri Fries', 79.00);

DROP TABLE IF EXISTS `order_tracking`;

CREATE TABLE `order_tracking` (
  `order_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `order_tracking` VALUES (40,'delivered'),(41,'in transit');

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_id`, `item_id`),
  KEY `orders_ibfk_1` (`item_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `food_items` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `orders` VALUES (40,1,2,598.00),(40,3,1,249.00),(41,4,3,807.00),(41,6,2,258.00),(41,9,4,316.00);
