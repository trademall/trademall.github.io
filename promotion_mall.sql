/*
 Navicat Premium Data Transfer

 Source Server         : promotion-mall
 Source Server Type    : MySQL
 Source Server Version : 80100 (8.1.0)
 Source Host           : 0.0.0.0:3306
 Source Schema         : promotion_mall

 Target Server Type    : MySQL
 Target Server Version : 80100 (8.1.0)
 File Encoding         : 65001

 Date: 01/11/2023 22:50:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for casbin_rule
-- ----------------------------
DROP TABLE IF EXISTS `casbin_rule`;
CREATE TABLE `casbin_rule` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ptype` varchar(100) DEFAULT NULL,
  `v0` varchar(100) DEFAULT NULL,
  `v1` varchar(100) DEFAULT NULL,
  `v2` varchar(100) DEFAULT NULL,
  `v3` varchar(100) DEFAULT NULL,
  `v4` varchar(100) DEFAULT NULL,
  `v5` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_casbin_rule` (`ptype`,`v0`,`v1`,`v2`,`v3`,`v4`,`v5`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of casbin_rule
-- ----------------------------
BEGIN;
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (8, 'g', 'admin123', 'admin', '', '', '', '');
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (2, 'p', 'admin', '/v1/admin/*', '*', '', '', '');
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (5, 'p', 'admin', '/v1/operator/*', '*', NULL, NULL, NULL);
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (3, 'p', 'operator', '/v1/operator/*', '*', '', '', '');
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (1, 'p', 'root', '/v1', '*', '', '', '');
INSERT INTO `casbin_rule` (`id`, `ptype`, `v0`, `v1`, `v2`, `v3`, `v4`, `v5`) VALUES (4, 'p', 'user', '/v1/catalog/*', '*', '', '', '');
COMMIT;

-- ----------------------------
-- Table structure for catalog
-- ----------------------------
DROP TABLE IF EXISTS `catalog`;
CREATE TABLE `catalog` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'catalog id',
  `product_id` bigint DEFAULT NULL COMMENT '商品id',
  `attributes` json DEFAULT NULL COMMENT '自定义属性列表',
  `user_id` bigint DEFAULT NULL COMMENT '用户id',
  `status` tinyint(1) DEFAULT NULL COMMENT '1表示已经下载',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `updated` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of catalog
-- ----------------------------
BEGIN;
INSERT INTO `catalog` (`id`, `product_id`, `attributes`, `user_id`, `status`, `created`, `updated`) VALUES (286, 123, '{\"size\": \"large\", \"color\": \"red\"}', 456, 1, '2023-10-27 10:40:15', '2023-10-28 21:56:03');
INSERT INTO `catalog` (`id`, `product_id`, `attributes`, `user_id`, `status`, `created`, `updated`) VALUES (287, 123, '{\"size\": \"large\", \"color\": \"red\"}', 4567, 1, '2023-10-27 11:10:51', '2023-10-27 11:10:51');
INSERT INTO `catalog` (`id`, `product_id`, `attributes`, `user_id`, `status`, `created`, `updated`) VALUES (288, 123, '{\"size\": \"large\", \"color\": \"red\"}', 456, 1, '2023-10-28 21:53:24', '2023-10-28 21:53:24');
INSERT INTO `catalog` (`id`, `product_id`, `attributes`, `user_id`, `status`, `created`, `updated`) VALUES (289, 123, '{\"size\": \"large\", \"color\": \"red\"}', 456, 1, '2023-10-28 21:56:28', '2023-10-28 21:56:28');
INSERT INTO `catalog` (`id`, `product_id`, `attributes`, `user_id`, `status`, `created`, `updated`) VALUES (291, 123, '{\"size\": \"large\", \"color\": \"red\"}', 456, 0, '2023-11-01 22:25:56', '2023-11-01 22:25:56');
COMMIT;

-- ----------------------------
-- Table structure for catalog_template
-- ----------------------------
DROP TABLE IF EXISTS `catalog_template`;
CREATE TABLE `catalog_template` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint DEFAULT NULL COMMENT '用户id',
  `mname` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商家名称',
  `cname` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '客户名称',
  `maddress` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商家地址',
  `caddress` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '客户地址',
  `mtitle` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '商家描述',
  `ctitle` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '客户描述',
  `logo` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'logo 图片',
  `profit` decimal(10,6) DEFAULT NULL COMMENT '利润率',
  `create` datetime DEFAULT NULL COMMENT '创建时间',
  `expire` datetime DEFAULT NULL COMMENT '到期时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of catalog_template
-- ----------------------------
BEGIN;
INSERT INTO `catalog_template` (`id`, `user_id`, `mname`, `cname`, `maddress`, `caddress`, `mtitle`, `ctitle`, `logo`, `profit`, `create`, `expire`) VALUES (286, 1, 'Merchant Name', 'Customer Name', 'Merchant Address', 'Customer Address', 'Merchant Title', 'Customer Title', 'logo.png', 0.111111, '2023-10-22 18:00:00', '2024-10-22 18:00:00');
INSERT INTO `catalog_template` (`id`, `user_id`, `mname`, `cname`, `maddress`, `caddress`, `mtitle`, `ctitle`, `logo`, `profit`, `create`, `expire`) VALUES (287, 1, 'Merchant Name', 'Customer Name', 'Merchant Address', 'Customer Address', 'Merchant Title', 'Customer Title', 'logo.png', 0.000000, '2023-10-22 18:00:00', '2024-10-22 18:00:00');
INSERT INTO `catalog_template` (`id`, `user_id`, `mname`, `cname`, `maddress`, `caddress`, `mtitle`, `ctitle`, `logo`, `profit`, `create`, `expire`) VALUES (288, 1, 'Merchant Name', 'Customer Name', 'Merchant Address', 'Customer Address', 'Merchant Title', 'Customer Title', 'logo.png', 0.000000, '2023-10-22 18:00:00', '2024-10-22 18:00:00');
INSERT INTO `catalog_template` (`id`, `user_id`, `mname`, `cname`, `maddress`, `caddress`, `mtitle`, `ctitle`, `logo`, `profit`, `create`, `expire`) VALUES (289, 1, 'Merchant Name', 'Customer Name', 'Merchant Address', 'Customer Address', 'Merchant Title', 'Customer Title', 'logo.png', 0.111111, '2023-10-22 18:00:00', '2024-10-22 18:00:00');
COMMIT;

-- ----------------------------
-- Table structure for exchange_rate
-- ----------------------------
DROP TABLE IF EXISTS `exchange_rate`;
CREATE TABLE `exchange_rate` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_id` bigint DEFAULT NULL COMMENT '商品id',
  `currency_pair` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '货币对，如 USD/CNY',
  `rate` decimal(10,4) DEFAULT NULL COMMENT '汇率',
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '修改人',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of exchange_rate
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for price_model
-- ----------------------------
DROP TABLE IF EXISTS `price_model`;
CREATE TABLE `price_model` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `rate` decimal(10,6) DEFAULT NULL COMMENT '汇率 美元-人民币',
  `tax_rate` decimal(10,6) DEFAULT NULL COMMENT '关税税率',
  `express_strategy` bigint DEFAULT NULL COMMENT '快递策略',
  `express_fee` decimal(10,4) DEFAULT NULL COMMENT '快递初始运费',
  `air_strategy` bigint DEFAULT NULL COMMENT '空派策略',
  `air_fee` decimal(10,4) DEFAULT NULL COMMENT '空派初始运费',
  `sea_strategy` bigint DEFAULT NULL COMMENT '海派策略',
  `sea_fee` decimal(10,4) DEFAULT NULL COMMENT '海派初始运费',
  `sea_freight_fee` decimal(10,4) DEFAULT NULL COMMENT '海运运费',
  `username` varchar(50) DEFAULT NULL COMMENT '修改人',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of price_model
-- ----------------------------
BEGIN;
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (1, 0.500000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:09:04');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (2, 0.500000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:13:02');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (3, 0.600000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:13:14');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (4, 0.700000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:13:18');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (5, 7.500000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:13:30');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (6, 7.600000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:14:02');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (7, 7.600000, 0.200000, 1, 0.0000, 2, 0.0000, 3, 0.0000, 0.0000, 'JohnDoe', '2023-10-29 17:14:12');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (8, 7.600000, 0.200000, 0, 25.0000, 0, 30.0000, 0, 40.0000, 50.0000, 'JohnDoe', '2023-10-29 17:15:24');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (9, 7.600000, 0.200000, 1, 25.0000, 2, 30.0000, 3, 40.0000, 50.0000, 'JohnDoe', '2023-10-29 17:16:57');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (10, 7.600000, 0.200000, 1, 25.0000, 2, 30.0000, 3, 40.0000, 50.0000, 'JohnDoe', '2023-10-29 17:17:47');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (11, 0.000000, 0.000000, 0, 0.0000, 0, 0.0000, 0, 0.0000, 0.0000, '', '2023-10-29 17:18:06');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (12, 7.600000, 0.200000, 1, 25.0000, 2, 30.0000, 3, 40.0000, 50.0000, 'JohnDoe', '2023-10-29 17:23:15');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (13, 7.600000, 0.200000, 1, 25.0000, 2, 30.0000, 3, 40.0000, 50.0000, 'JohnDoe', '2023-10-29 17:24:31');
INSERT INTO `price_model` (`id`, `rate`, `tax_rate`, `express_strategy`, `express_fee`, `air_strategy`, `air_fee`, `sea_strategy`, `sea_fee`, `sea_freight_fee`, `username`, `created`) VALUES (14, 7.600000, 0.200000, 1, 25.0000, 2, 30.0000, 3, 40.0000, 50.0000, 'JohnDoe', '2023-11-01 22:29:49');
COMMIT;

-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_id` bigint DEFAULT NULL COMMENT '商品id',
  `template_id` bigint DEFAULT NULL COMMENT '从属的模版id',
  `category` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '主类',
  `child_category` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '子类',
  `name` varchar(240) DEFAULT NULL COMMENT '商品名称',
  `detail_info` text COMMENT '商品详情',
  `image` varchar(240) DEFAULT NULL COMMENT '商品主图',
  `attributes` json DEFAULT NULL COMMENT '商品属性列表',
  `status` bigint DEFAULT NULL COMMENT '1为public，0为private,2为 deactive',
  `volume` decimal(10,4) DEFAULT NULL COMMENT '体积',
  `weight` decimal(10,4) DEFAULT NULL COMMENT '重量',
  `exclude` json DEFAULT NULL COMMENT '不可见用户列表',
  `include` json DEFAULT NULL COMMENT '可见用户列表',
  `profit` decimal(10,6) DEFAULT NULL COMMENT '利润率',
  `price` decimal(10,4) DEFAULT NULL COMMENT '成本价',
  `creator_id` bigint DEFAULT NULL COMMENT '创建者id',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `updated` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of product_info
-- ----------------------------
BEGIN;
INSERT INTO `product_info` (`id`, `product_id`, `template_id`, `category`, `child_category`, `name`, `detail_info`, `image`, `attributes`, `status`, `volume`, `weight`, `exclude`, `include`, `profit`, `price`, `creator_id`, `created`, `updated`) VALUES (286, 321, 0, 'clothes', 'T-shirt', '衬衫', 'Product details go here', 'url1', '{\"size\": \"medium\", \"color\": \"blue\"}', 1, 111.1110, 111.2200, '[]', '[1, 2, 3]', 0.123456, 111.1110, 123, '2023-11-01 22:07:08', '2023-11-01 22:13:57');
INSERT INTO `product_info` (`id`, `product_id`, `template_id`, `category`, `child_category`, `name`, `detail_info`, `image`, `attributes`, `status`, `volume`, `weight`, `exclude`, `include`, `profit`, `price`, `creator_id`, `created`, `updated`) VALUES (287, 321, 0, 'clothes', 'T-shirt', '衬衫', 'Product details go here', 'url1', '{\"size\": \"medium\", \"color\": \"blue\"}', 1, 111.1110, 111.1110, '[]', '[1, 2, 3]', 0.123456, 111.1110, 123, '2023-11-01 22:08:06', '2023-11-01 22:08:06');
INSERT INTO `product_info` (`id`, `product_id`, `template_id`, `category`, `child_category`, `name`, `detail_info`, `image`, `attributes`, `status`, `volume`, `weight`, `exclude`, `include`, `profit`, `price`, `creator_id`, `created`, `updated`) VALUES (288, 321, 0, 'clothes', 'T-shirt', '衬衫', 'Product details go here', 'url1', '{\"size\": \"medium\", \"color\": \"blue\"}', 1, 111.1110, 111.1110, '[]', '[1, 2, 3]', 0.123456, 111.1110, 123, '2023-11-01 22:08:07', '2023-11-01 22:08:07');
INSERT INTO `product_info` (`id`, `product_id`, `template_id`, `category`, `child_category`, `name`, `detail_info`, `image`, `attributes`, `status`, `volume`, `weight`, `exclude`, `include`, `profit`, `price`, `creator_id`, `created`, `updated`) VALUES (289, 321, 0, 'clothes', 'T-shirt', '衬衫', 'Product details go here', 'url1', '{\"size\": \"medium\", \"color\": \"blue\"}', 1, 111.1110, 111.1110, '[]', '[1, 2, 3]', 0.123456, 111.1110, 123, '2023-11-01 22:11:27', '2023-11-01 22:11:27');
COMMIT;

-- ----------------------------
-- Table structure for product_template
-- ----------------------------
DROP TABLE IF EXISTS `product_template`;
CREATE TABLE `product_template` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '商品模版id',
  `template_name` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '模版名称',
  `category` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '主类',
  `child_category` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '子类',
  `description` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '模版描述',
  `attributes` json DEFAULT NULL COMMENT '自定义属性列表',
  `exclude` json DEFAULT NULL COMMENT '不可见用户列表',
  `include` json DEFAULT NULL COMMENT '可见用户列表',
  `creator_id` bigint DEFAULT NULL COMMENT '创建者id',
  `is_active` bigint DEFAULT NULL COMMENT '可用性',
  `profit` decimal(10,6) DEFAULT NULL COMMENT '利润率',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `updated` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of product_template
-- ----------------------------
BEGIN;
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (286, 'Sample Template', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 6]', 0, 1, 0.000000, '2023-10-28 16:45:11', '2023-10-28 16:45:11');
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (288, 'emplate123', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 6]', 0, 1, 0.000000, '2023-11-01 21:35:14', '2023-11-01 22:03:30');
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (289, 'Sample Template', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 6]', 0, 1, 0.000000, '2023-11-01 21:51:03', '2023-11-01 21:51:03');
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (290, 'Sample Template', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 6]', 0, 1, 0.000000, '2023-11-01 21:59:15', '2023-11-01 21:59:15');
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (291, 'Sample Template', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 6]', 0, 1, 0.000000, '2023-11-01 22:00:36', '2023-11-01 22:00:36');
INSERT INTO `product_template` (`id`, `template_name`, `category`, `child_category`, `description`, `attributes`, `exclude`, `include`, `creator_id`, `is_active`, `profit`, `created`, `updated`) VALUES (292, 'Sample Template', 'clothes', 'T-shirt', 'This is a sample template', '{\"size\": \"large\", \"color\": \"red\"}', '[1, 2, 3]', '[4, 5, 7]', 0, 1, 0.000000, '2023-11-01 22:03:19', '2023-11-01 22:16:21');
COMMIT;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id（主键）',
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户名称',
  `avatar` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户头像',
  `password` char(64) DEFAULT NULL COMMENT '经过哈希加密的密码',
  `salt` char(64) DEFAULT NULL COMMENT '密码盐',
  `role` char(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户角色',
  `phone` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '电话',
  `email` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '邮箱',
  `address` varchar(240) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '地址',
  `isactive` tinyint(1) DEFAULT NULL COMMENT '仅普通用户使用，1为已激活',
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `profit` decimal(10,6) DEFAULT NULL COMMENT '利润率',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=100067 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user_info
-- ----------------------------
BEGIN;
INSERT INTO `user_info` (`id`, `username`, `avatar`, `password`, `salt`, `role`, `phone`, `email`, `address`, `isactive`, `created`, `updated`, `profit`) VALUES (100061, 'root', 'http://img-store1016.oss-cn-beijing.aliyuncs.com/imgs/202310/1698483297-7e18fb44ly1hhkectf9wbj20h00gin2a.jpg', '$2a$10$XeQ/mSBoqQgogpi/KYvqcu74JXMJsCeVEplqMAqNcnOpkCCshVSRe', '99c9bae7593579fee8a715eb6827e196', 'root', '1234567890', '', '', 0, '2023-11-01 20:56:52', '2023-11-01 20:56:52', 0.000000);
INSERT INTO `user_info` (`id`, `username`, `avatar`, `password`, `salt`, `role`, `phone`, `email`, `address`, `isactive`, `created`, `updated`, `profit`) VALUES (100066, 'admin123', 'userAvatar.png', '$2a$10$VROBiwQF6MnGkXklllcGNeQz4bLvKC6HWMgnSfsGQRpuMhDEsJFSa', '19b6eb431a278b950be2eca06fcc25bf', 'admin', '1234567890', 'user@example.com', '123 Main St', 1, '2023-11-01 21:24:22', '2023-11-01 21:24:22', 0.000000);
COMMIT;

-- ----------------------------
-- Table structure for weight_stage
-- ----------------------------
DROP TABLE IF EXISTS `weight_stage`;
CREATE TABLE `weight_stage` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `delivery_type` bigint DEFAULT NULL COMMENT '运输方式，快递0，空派1，海派2',
  `start` decimal(10,4) DEFAULT NULL COMMENT '阶梯开始',
  `to` decimal(10,4) DEFAULT NULL COMMENT '阶梯结束',
  `price` decimal(10,4) DEFAULT NULL COMMENT '本阶梯价格',
  `username` varchar(50) DEFAULT NULL COMMENT '修改人',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of weight_stage
-- ----------------------------
BEGIN;
INSERT INTO `weight_stage` (`id`, `delivery_type`, `start`, `to`, `price`, `username`, `created`) VALUES (8, 3, 200.0000, 300.0000, 50.0000, 'JohnDoe', '2023-10-31 17:45:41');
INSERT INTO `weight_stage` (`id`, `delivery_type`, `start`, `to`, `price`, `username`, `created`) VALUES (9, 3, 400.0000, 500.0000, 50.0000, 'JohnDoe', '2023-10-31 17:45:48');
INSERT INTO `weight_stage` (`id`, `delivery_type`, `start`, `to`, `price`, `username`, `created`) VALUES (10, 3, 300.0000, 400.0000, 50.0000, 'JohnDoe', '2023-10-31 17:45:55');
INSERT INTO `weight_stage` (`id`, `delivery_type`, `start`, `to`, `price`, `username`, `created`) VALUES (11, 3, 100.0000, 200.0000, 50.0000, 'JohnDoe', '2023-10-31 17:56:44');
INSERT INTO `weight_stage` (`id`, `delivery_type`, `start`, `to`, `price`, `username`, `created`) VALUES (12, 1, 100.0000, 200.0000, 50.0000, 'JohnDoe', '2023-11-01 00:54:47');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
