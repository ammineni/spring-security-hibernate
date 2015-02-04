-- Dumping database structure for spring_security
CREATE DATABASE IF NOT EXISTS `spring_security` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `spring_security`;


-- Dumping structure for table spring_security.users
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(450) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping structure for table spring_security.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `ROLE` varchar(45) NOT NULL,
  PRIMARY KEY (`user_role_id`),
  UNIQUE KEY `uni_username_role` (`ROLE`,`username`),
  KEY `fk_username_idx` (`username`),
  CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `users` (`username`, `password`, `enabled`) VALUES
 ('andrew', 'andrew@123', 1),
 ('robert', 'robert@123', 1);

INSERT INTO `user_roles` (`user_role_id`, `username`, `ROLE`) VALUES
 (2, 'andrew', 'ROLE_ADMIN'),
 (1, 'andrew', 'ROLE_USER'),
 (3, 'robert', 'ROLE_USER');
