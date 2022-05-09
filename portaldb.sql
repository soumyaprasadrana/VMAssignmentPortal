SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `vmportal02` ;
CREATE SCHEMA IF NOT EXISTS `vmportal02` DEFAULT CHARACTER SET utf8 ;
USE `vmportal02` ;
GRANT ALL PRIVILEGES ON vmportal02.* TO 'alex'@'%' IDENTIFIED BY 'Full@ccess123';
GRANT ALL PRIVILEGES ON vmportal02.* TO 'alex'@'localhost' IDENTIFIED BY 'Full@ccess123';
-- -----------------------------------------------------
-- Table `vmportal02`.`teams`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`teams` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`teams` (
  `team_name` VARCHAR(255) NOT NULL ,
  `team_desc` VARCHAR(255) NULL DEFAULT '' ,
  PRIMARY KEY (`team_name`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`user` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`user` (
  `user_id` VARCHAR(255) NOT NULL ,
  `user_name` VARCHAR(255) NOT NULL ,
  `user_email` VARCHAR(255) ,
  `user_pass` VARCHAR(255) NOT NULL ,
  `user_team` VARCHAR(255) DEFAULT '' ,
  PRIMARY KEY (`user_id`) ,
  CONSTRAINT `fk_user_team`
    FOREIGN KEY (`user_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `user_team_idx` ON `vmportal02`.`user` (`user_team` ASC) ;


-- -----------------------------------------------------
-- Table `vmportal02`.`activitylog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`activitylog` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`activitylog` (
  `activity_id` MEDIUMINT(9) NOT NULL AUTO_INCREMENT ,
  `activity_timestamp` VARCHAR(255) NOT NULL ,
  `activity_type` VARCHAR(255) NOT NULL ,
  `activity_status` VARCHAR(255) NOT NULL ,
  `activity_owner` VARCHAR(255) NOT NULL ,
  `activity_desc` MEDIUMTEXT NOT NULL ,
  `activity_owner_team` VARCHAR(255) NULL ,
  PRIMARY KEY (`activity_id`) ,
  CONSTRAINT `fk_activity_user`
    FOREIGN KEY (`activity_owner` )
    REFERENCES `vmportal02`.`user` (`user_id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_activity_user_team`
    FOREIGN KEY (`activity_owner_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `activity_owner_idx` ON `vmportal02`.`activitylog` (`activity_owner` ASC) ;

CREATE INDEX `fk_activity_user_team_idx` ON `vmportal02`.`activitylog` (`activity_owner_team` ASC) ;


-- -----------------------------------------------------
-- Table `vmportal02`.`authorizations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`authorizations` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`authorizations` (
  `user_id` VARCHAR(255) NOT NULL ,
  `user_team` VARCHAR(255) NULL ,
  `create_user` TINYINT(1) NOT NULL DEFAULT '0' ,
  `delete_user` TINYINT(1) NOT NULL DEFAULT '0' ,
  `add_vm` TINYINT(1) NOT NULL DEFAULT '1' ,
  `delete_vm` TINYINT(1) NOT NULL DEFAULT '0' ,
  `assign_vm` TINYINT(1) NOT NULL DEFAULT '1' ,
  `update_vm` TINYINT(1) NOT NULL DEFAULT '1' ,
  `release_vm` TINYINT(1) NOT NULL DEFAULT '1' ,
  `add_snapshot` TINYINT(1) NOT NULL DEFAULT '1' ,
  `delete_snapshot` TINYINT(1) NOT NULL DEFAULT '1' ,
  `linux_toolbox` TINYINT(1) NOT NULL DEFAULT '1' ,
  `db2_toolbox` TINYINT(1) NOT NULL DEFAULT '1' ,
  `is_admin` TINYINT(1) NOT NULL DEFAULT '0' ,
  `is_teamLead` TINYINT(1) NOT NULL DEFAULT '0' ,
  `update_user` TINYINT(1) NOT NULL DEFAULT '0' ,
  PRIMARY KEY (`user_id`) ,
  CONSTRAINT `fk_permissions_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `vmportal02`.`user` (`user_id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_permission_user_team`
    FOREIGN KEY (`user_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `fk_permission_user_team_idx` ON `vmportal02`.`authorizations` (`user_team` ASC) ;


-- -----------------------------------------------------
-- Table `vmportal02`.`dynamicpages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`dynamicpages` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`dynamicpages` (
  `page_id` MEDIUMINT(9) NOT NULL AUTO_INCREMENT ,
  `page_isEnabled` TINYINT(1) NOT NULL DEFAULT '1' ,
  `page_template` MEDIUMTEXT NULL DEFAULT NULL ,
  `page_controller` MEDIUMTEXT NULL DEFAULT NULL ,
  `page_controller_name` VARCHAR(255) NULL DEFAULT NULL ,
  `page_application` VARCHAR(255) NOT NULL ,
  `sbu_name` VARCHAR(255) NULL ,
  `bu_name` VARCHAR(255) NULL ,
  PRIMARY KEY (`page_id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`padynamicpages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`padynamicpages` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`padynamicpages` (
  `page_template` LONGTEXT NULL DEFAULT NULL ,
  `page_controller` LONGTEXT NULL DEFAULT NULL ,
  `page_width` INT(3) NOT NULL DEFAULT '400' ,
  `page_action_name` VARCHAR(255) NOT NULL ,
  `page_controller_name` VARCHAR(255) NOT NULL ,
  `page_application` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`page_controller_name`, `page_action_name`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`primaryvm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`primaryvm` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`primaryvm` (
  `user_id` VARCHAR(255) NOT NULL ,
  `primary_vm` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`user_id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`session` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`session` (
  `session_id` VARCHAR(255) NOT NULL ,
  `auth_token` VARCHAR(255) NOT NULL ,
  `start_timestamp` VARCHAR(255) NOT NULL ,
  `last_activity_timestamp` VARCHAR(255) NOT NULL DEFAULT '' ,
  `client_ip` VARCHAR(255) NOT NULL DEFAULT '' ,
  `client_os` VARCHAR(255) NOT NULL DEFAULT '' ,
  `client_browser` VARCHAR(255) NOT NULL DEFAULT '' ,
  `user_id` VARCHAR(255) NOT NULL DEFAULT '' ,
  `user_team` VARCHAR(255) NULL ,
  CONSTRAINT `fk_session_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `vmportal02`.`user` (`user_id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_session_user_team`
    FOREIGN KEY (`user_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `user_id_idx` ON `vmportal02`.`session` (`user_id` ASC) ;

CREATE INDEX `fk_session_user_team_idx` ON `vmportal02`.`session` (`user_team` ASC) ;


-- -----------------------------------------------------
-- Table `vmportal02`.`uiproperties`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`uiproperties` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`uiproperties` (
  `prop_name` VARCHAR(255) NOT NULL ,
  `prop_value` MEDIUMTEXT NOT NULL ,
  PRIMARY KEY (`prop_name`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`technotes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`technotes` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`technotes` (
  `technote_id` MEDIUMINT(9) NOT NULL AUTO_INCREMENT ,
  `technote_description` VARCHAR(600) NOT NULL ,
  `technote_keywords` MEDIUMTEXT NULL DEFAULT NULL ,
  `technote_template` MEDIUMTEXT NULL DEFAULT NULL ,
  `technote_team` VARCHAR(255) NOT NULL DEFAULT '' ,
  `is_global` TINYINT(1) NOT NULL DEFAULT '0' ,
  PRIMARY KEY (`technote_id`) ,
  CONSTRAINT `fk_technote_team`
    FOREIGN KEY (`technote_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`relatedvms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`relatedvms` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`relatedvms` (
  `relationship_source` VARCHAR(200) NOT NULL ,
  `relationship_destination` VARCHAR(200) NOT NULL ,
  `relationship_name` VARCHAR(200) NOT NULL ,
  `relationship_description` VARCHAR(600) NULL DEFAULT NULL,
  `relationship_group` VARCHAR(600) NULL DEFAULT NULL ,
  `relationship_icon` VARCHAR(600) NULL DEFAULT 'fa fa-desktop' ,
  PRIMARY KEY (`relationship_name`,`relationship_source`,`relationship_destination`) )
ENGINE = InnoDB
AUTO_INCREMENT = 100
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `vmportal02`.`vm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`vm` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`vm` (
  `vm_ip` VARCHAR(255) NOT NULL ,
  `vm_hostname` VARCHAR(255) NOT NULL ,
  `vm_os` VARCHAR(255) NOT NULL ,
  `vm_os_ver` VARCHAR(255) NOT NULL ,
  `vm_owner` VARCHAR(255) NOT NULL DEFAULT '' ,
  `vm_comment` MEDIUMTEXT NOT NULL ,
  `vm_group` VARCHAR(255) NOT NULL DEFAULT '' ,
  `is_available` TINYINT(1) NOT NULL DEFAULT '1' ,
  `snapshot_count` INT(11) NOT NULL DEFAULT '0' ,
  `ram` INT(11) NOT NULL DEFAULT '0' ,
  `vm_team` VARCHAR(255) NOT NULL DEFAULT '' ,
  `vm_owner_lab` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`vm_ip`) ,
  CONSTRAINT `fk_vm_team`
    FOREIGN KEY (`vm_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `vm_team_idx` ON `vmportal02`.`vm` (`vm_team` ASC) ;

-- -----------------------------------------------------
-- Table `vmportal02`.`dynamicobject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`dynamicobject` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`dynamicobject` (
  `object_name` VARCHAR(255) NOT NULL ,
  `object_design` MEDIUMTEXT NOT NULL ,
  PRIMARY KEY (`object_name`)) 
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `vmportal02`.`vmextradata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`vmextradata` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`vmextradata` (
  `vm_ip` VARCHAR(255) NOT NULL ,
  `vm_team` VARCHAR(255) NULL ,
  `vm_sbu` VARCHAR(255) NULL ,
  `vm_bu` VARCHAR(255) NULL ,
  `vm_isAvailableOnVShere` TINYINT(1) NOT NULL DEFAULT '0' ,
  `vmextra_data` MEDIUMTEXT NOT NULL ,
  `vmextra_data_by_user` MEDIUMTEXT NULL DEFAULT NULL ,
  PRIMARY KEY (`vm_ip`) ,
  CONSTRAINT `fk_extradata_vm_ip`
    FOREIGN KEY (`vm_ip` )
    REFERENCES `vmportal02`.`vm` (`vm_ip` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_extradata_vm_team`
    FOREIGN KEY (`vm_team` )
    REFERENCES `vmportal02`.`teams` (`team_name` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX `fk_extradata_vm_team_idx` ON `vmportal02`.`vmextradata` (`vm_team` ASC) ;


-- -----------------------------------------------------
-- Table `vmportal02`.`userproperties`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vmportal02`.`userproperties` ;

CREATE  TABLE IF NOT EXISTS `vmportal02`.`userproperties` (
  `user_id` VARCHAR(255) NOT NULL ,
  `user_prop` MEDIUMTEXT NULL ,
  PRIMARY KEY (`user_id`) ,
  CONSTRAINT `fk_udp_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `vmportal02`.`user` (`user_id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `vmportal02` ;


INSERT INTO `vmportal02`.`teams` (team_name,team_desc) VALUES ('ADMIN' /*not nullable*/,'Administrator');

/*Default password is Full@ccess123*/
INSERT INTO `vmportal02`.`user` (user_id,user_name,user_email,user_pass,user_team) VALUES ('admin' /*not nullable*/,'Administrator' /*not nullable*/,'admin@email' /*not nullable*/,'RnVsbEBjY2VzczEyMw==' /*not nullable*/,'ADMIN');

INSERT INTO `vmportal02`.`authorizations` (`user_id`, `user_team`, `create_user`, `delete_user`, `add_vm`, `delete_vm`, `assign_vm`, `update_vm`, `release_vm`, `add_snapshot`, `delete_snapshot`, `linux_toolbox`, `db2_toolbox`, `is_admin`, `is_teamLead`, `update_user`) VALUES ('admin', 'ADMIN', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1);

INSERT INTO `vmportal02`.`uiproperties` (`prop_name`, `prop_value`) VALUES ('alertSnapshot', '9');
INSERT INTO `vmportal02`.`uiproperties` (`prop_name`, `prop_value`) VALUES ('osList', 'Windows:Server 2016#Windows:Server 2008 R2#Windows:Server 2012#Windows:Server 2012R2#Windows:Server 2019#Windows:10#Linux:RHEL 6#Linux:RHEL 7#Linux:RHEL 7.2#Linux:RHEL 7.4#Linux:RHEL 7.6#Linux:RHEL 7.7#Linux:RHEL 7.8#Linux:RHEL 8#Linux:Ubuntu 14#Linux:Ubuntu 16#Linux:Ubuntu 18#AIX:7.2#AIX:7.1#NA:NA');
INSERT INTO `vmportal02`.`uiproperties` (`prop_name`, `prop_value`) VALUES ('paginationPageSize', '25');
INSERT INTO `vmportal02`.`uiproperties` (`prop_name`, `prop_value`) VALUES ('paginationPageSizesList', '25:50:75:100:125');
INSERT INTO `vmportal02`.`uiproperties` (`prop_name`, `prop_value`) VALUES ('warnSnapshot', '5');
