2014-08-28
==========

更新数据表：

```SQL
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
```
