SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SurveyX
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SurveyX` ;

-- -----------------------------------------------------
-- Schema SurveyX
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SurveyX` DEFAULT CHARACTER SET utf8 ;
USE `SurveyX` ;

-- -----------------------------------------------------
-- Table `SurveyX`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Role` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`User` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Role_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `SurveyX`.`Role` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`Quiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Quiz` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Quiz` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Question` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `number` INT UNSIGNED NOT NULL,
  `description` VARCHAR(100) NULL,
  `Quiz_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Question_Quiz1_idx` (`Quiz_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`Quiz_id`)
    REFERENCES `SurveyX`.`Quiz` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Answer` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(100) NULL,
  `option` VARCHAR(45) NULL,
  `file` MEDIUMBLOB NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Answer_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `SurveyX`.`Question` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`Respondent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Respondent` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Respondent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Answer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Respondent_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Respondent_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Respondent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `SurveyX`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Respondent_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `SurveyX`.`Answer` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`Option`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`Option` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`Option` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `number` INT UNSIGNED NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `SurveyX`.`Question` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SurveyX`.`SelectedOption`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SurveyX`.`SelectedOption` ;

CREATE TABLE IF NOT EXISTS `SurveyX`.`SelectedOption` (
  `Answer_id` INT NOT NULL,
  `Option_id` INT NOT NULL,
  INDEX `fk_SelectedOption_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  INDEX `fk_SelectedOption_Option1_idx` (`Option_id` ASC) VISIBLE,
  CONSTRAINT `fk_SelectedOption_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `SurveyX`.`Answer` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SelectedOption_Option1`
    FOREIGN KEY (`Option_id`)
    REFERENCES `SurveyX`.`Option` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `SurveyX`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `SurveyX`;
INSERT INTO `SurveyX`.`Role` (`name`, `description`) VALUES ('Respondent', 'A user that taking a survey');
INSERT INTO `SurveyX`.`Role` (`name`, `description`) VALUES ('Editor', 'The user who edits the survey');
INSERT INTO `SurveyX`.`Role` (`name`, `description`) VALUES ('Admin', 'The user is the owner of the survey');

COMMIT;