/*
 Navicat Premium Data Transfer

 Source Server         : observer
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : observer

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 28/01/2026 08:40:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ipAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `imagePath` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (1, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451442665.jpg', '2026-01-26 13:17:22');
INSERT INTO `image` VALUES (2, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451447756.jpg', '2026-01-26 13:17:27');
INSERT INTO `image` VALUES (3, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451452851.jpg', '2026-01-26 13:17:32');
INSERT INTO `image` VALUES (4, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451457930.jpg', '2026-01-26 13:17:37');
INSERT INTO `image` VALUES (5, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451463009.jpg', '2026-01-26 13:17:43');
INSERT INTO `image` VALUES (6, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451468079.jpg', '2026-01-26 13:17:48');
INSERT INTO `image` VALUES (7, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451473199.jpg', '2026-01-26 13:17:53');
INSERT INTO `image` VALUES (8, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451478282.jpg', '2026-01-26 13:17:58');
INSERT INTO `image` VALUES (9, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451483366.jpg', '2026-01-26 13:18:03');
INSERT INTO `image` VALUES (10, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451488593.jpg', '2026-01-26 13:18:08');
INSERT INTO `image` VALUES (11, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451493731.jpg', '2026-01-26 13:18:13');
INSERT INTO `image` VALUES (12, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451498842.jpg', '2026-01-26 13:18:18');
INSERT INTO `image` VALUES (13, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451503914.jpg', '2026-01-26 13:18:23');
INSERT INTO `image` VALUES (14, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451508982.jpg', '2026-01-26 13:18:28');
INSERT INTO `image` VALUES (15, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451514063.jpg', '2026-01-26 13:18:34');
INSERT INTO `image` VALUES (16, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-26/cjk/1769451519133.jpg', '2026-01-26 13:18:39');
INSERT INTO `image` VALUES (17, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524131766.jpg', '2026-01-27 09:28:51');
INSERT INTO `image` VALUES (18, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524136880.jpg', '2026-01-27 09:28:56');
INSERT INTO `image` VALUES (19, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524141970.jpg', '2026-01-27 09:29:01');
INSERT INTO `image` VALUES (20, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524147067.jpg', '2026-01-27 09:29:07');
INSERT INTO `image` VALUES (21, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524152145.jpg', '2026-01-27 09:29:12');
INSERT INTO `image` VALUES (22, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524157211.jpg', '2026-01-27 09:29:17');
INSERT INTO `image` VALUES (23, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524162279.jpg', '2026-01-27 09:29:22');
INSERT INTO `image` VALUES (24, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524167364.jpg', '2026-01-27 09:29:27');
INSERT INTO `image` VALUES (25, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524172430.jpg', '2026-01-27 09:29:32');
INSERT INTO `image` VALUES (26, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524177515.jpg', '2026-01-27 09:29:37');
INSERT INTO `image` VALUES (27, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524182597.jpg', '2026-01-27 09:29:42');
INSERT INTO `image` VALUES (28, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524187679.jpg', '2026-01-27 09:29:47');
INSERT INTO `image` VALUES (29, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524192776.jpg', '2026-01-27 09:29:52');
INSERT INTO `image` VALUES (30, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524197841.jpg', '2026-01-27 09:29:57');
INSERT INTO `image` VALUES (31, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524202912.jpg', '2026-01-27 09:30:02');
INSERT INTO `image` VALUES (32, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524207988.jpg', '2026-01-27 09:30:07');
INSERT INTO `image` VALUES (33, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524213078.jpg', '2026-01-27 09:30:13');
INSERT INTO `image` VALUES (34, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524218138.jpg', '2026-01-27 09:30:18');
INSERT INTO `image` VALUES (35, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524223227.jpg', '2026-01-27 09:30:23');
INSERT INTO `image` VALUES (36, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524228311.jpg', '2026-01-27 09:30:28');
INSERT INTO `image` VALUES (37, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524233393.jpg', '2026-01-27 09:30:33');
INSERT INTO `image` VALUES (38, 'cjk', '172.20.1.17', 'http://172.20.1.22:5174/upload/2026-01-27/cjk/1769524238480.jpg', '2026-01-27 09:30:38');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ipAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'manager', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.23');
INSERT INTO `user` VALUES (2, 'kjy', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.22');
INSERT INTO `user` VALUES (3, 'sjm', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.19');
INSERT INTO `user` VALUES (4, 'kdh', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.16');
INSERT INTO `user` VALUES (5, 'cjk', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.17');
INSERT INTO `user` VALUES (6, 'khs', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.21');
INSERT INTO `user` VALUES (7, 'sjw', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.20');
INSERT INTO `user` VALUES (8, 'rhg', '$2b$10$zDATpLIZ0zaA1/X0S9XAjew8tGaKzptNHsfALD3tt3pUH0yrwaQHO', '172.20.1.18');

SET FOREIGN_KEY_CHECKS = 1;
