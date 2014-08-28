# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.19)
# Database: uc_server
# Generation Time: 2014-08-28 10:18:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table app_call_list
# ------------------------------------------------------------

CREATE TABLE `app_call_list` (
  `app_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `updated_at` int(11) unsigned NOT NULL,
  UNIQUE KEY `app_id` (`app_id`,`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table app_list
# ------------------------------------------------------------

CREATE TABLE `app_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `client` text NOT NULL,
  `is_sync` tinyint(4) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `is_sync` (`is_sync`),
  KEY `created_at` (`created_at`),
  KEY `updated_at` (`updated_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table friend_list
# ------------------------------------------------------------

CREATE TABLE `friend_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `friend_id` int(11) unsigned NOT NULL,
  `friend_alias` varchar(255) NOT NULL DEFAULT '',
  `source` varchar(255) NOT NULL DEFAULT '',
  `greeting` varchar(255) NOT NULL DEFAULT '',
  `is_accepted` tinyint(11) unsigned NOT NULL,
  `created_at` int(11) unsigned NOT NULL,
  `updated_at` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  KEY `source` (`source`),
  KEY `is_ accepted` (`is_accepted`),
  KEY `created_at` (`created_at`),
  KEY `updated_at` (`updated_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table message_list
# ------------------------------------------------------------

CREATE TABLE `message_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `message_id` int(11) unsigned NOT NULL,
  `sender_id` int(11) unsigned NOT NULL,
  `receiver_id` int(11) unsigned NOT NULL,
  `is_inbox` tinyint(11) unsigned NOT NULL,
  `is_removed` tinyint(11) unsigned NOT NULL,
  `is_read` tinyint(11) unsigned NOT NULL,
  `created_at` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `message_id` (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `is_inbox` (`is_inbox`),
  KEY `created_at` (`created_at`),
  KEY `is_removed` (`is_removed`),
  KEY `is_read` (`is_read`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table message_origin_list
# ------------------------------------------------------------

CREATE TABLE `message_origin_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `object_type` varchar(255) NOT NULL DEFAULT '',
  `object_id` int(11) unsigned NOT NULL,
  `content` text NOT NULL,
  `created_at` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `object_type` (`object_type`),
  KEY `object_id` (`object_id`),
  KEY `created_at` (`created_at`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_connect_list
# ------------------------------------------------------------

CREATE TABLE `user_connect_list` (
  `user_id` int(11) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`provider`),
  KEY `unique_id` (`unique_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_detail_list
# ------------------------------------------------------------

CREATE TABLE `user_detail_list` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(1) NOT NULL,
  `int_value` int(11) DEFAULT NULL,
  `double_value` double DEFAULT NULL,
  `text_value` text,
  `created_at` int(11) NOT NULL,
  UNIQUE KEY `user_id_2` (`user_id`,`name`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_history_list
# ------------------------------------------------------------

CREATE TABLE `user_history_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `client_ip` varchar(15) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type` (`type`),
  KEY `timestamp` (`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_list
# ------------------------------------------------------------

CREATE TABLE `user_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(40) NOT NULL,
  `is_valid` tinyint(4) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `is_verified_email` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  KEY `is_valid` (`is_valid`),
  KEY `created_at` (`created_at`),
  KEY `updated_at` (`updated_at`),
  KEY `is_verified_email` (`is_verified_email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_reset_password_list
# ------------------------------------------------------------

CREATE TABLE `user_reset_password_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_done` tinyint(4) NOT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `code` (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table user_verify_code_list
# ------------------------------------------------------------

CREATE TABLE `user_verify_code_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_done` tinyint(4) NOT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `code` (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
