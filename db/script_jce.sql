SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `noamtz` ;
CREATE SCHEMA IF NOT EXISTS `noamtz` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `noamtz` ;

-- -----------------------------------------------------
-- Table `noamtz`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`users` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(100) NOT NULL ,
  `firstname` VARCHAR(45) NOT NULL ,
  `lastname` VARCHAR(45) NOT NULL ,
  `phone` VARCHAR(45) NULL ,
  UNIQUE INDEX `idUsers_UNIQUE` (`idUsers` ASC) ,
  PRIMARY KEY (`email`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`roles` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT ,
  `type` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`idRoles`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`shifts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`shifts` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`shifts` (
  `idShifts` INT NOT NULL AUTO_INCREMENT ,
  `start` DATE NOT NULL ,
  `end` DATE NOT NULL ,
  PRIMARY KEY (`idShifts`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`application` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`application` (
  `idApplication` INT NOT NULL AUTO_INCREMENT ,
  `password` VARCHAR(200) NOT NULL ,
  `passwordSalt` VARCHAR(200) NOT NULL ,
  `role` VARCHAR(45) NOT NULL ,
  `userEmail` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`idApplication`, `userEmail`) ,
  INDEX `fk_Application_Users1_idx` (`userEmail` ASC) ,
  CONSTRAINT `fk_Application_Users1`
    FOREIGN KEY (`userEmail` )
    REFERENCES `noamtz`.`users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`users_has_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`users_has_roles` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`users_has_roles` (
  `userEmail` VARCHAR(100) NOT NULL ,
  `idRoles` INT NOT NULL ,
  PRIMARY KEY (`userEmail`, `idRoles`) ,
  INDEX `fk_Users_has_Roles_Roles1_idx` (`idRoles` ASC) ,
  INDEX `fk_Users_has_Roles_Users_idx` (`userEmail` ASC) ,
  CONSTRAINT `fk_Users_has_Roles_Users`
    FOREIGN KEY (`userEmail` )
    REFERENCES `noamtz`.`users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Roles_Roles1`
    FOREIGN KEY (`idRoles` )
    REFERENCES `noamtz`.`roles` (`idRoles` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`shiftPart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`shiftPart` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`shiftPart` (
  `userEmail` VARCHAR(100) NOT NULL ,
  `idRoles` INT NOT NULL ,
  `idShifts` INT NOT NULL ,
  `shiftPartId` INT NOT NULL AUTO_INCREMENT ,
  INDEX `fk_ShiftPart_Users1_idx` (`userEmail` ASC) ,
  INDEX `fk_ShiftPart_Roles1_idx` (`idRoles` ASC) ,
  INDEX `fk_aa_Shifts1_idx` (`idShifts` ASC) ,
  PRIMARY KEY (`shiftPartId`) ,
  CONSTRAINT `fk_ShiftPart_Users1`
    FOREIGN KEY (`userEmail` )
    REFERENCES `noamtz`.`users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ShiftPart_Roles1`
    FOREIGN KEY (`idRoles` )
    REFERENCES `noamtz`.`roles` (`idRoles` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aa_Shifts1`
    FOREIGN KEY (`idShifts` )
    REFERENCES `noamtz`.`shifts` (`idShifts` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`shift_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `noamtz`.`shift_request` ;

CREATE  TABLE IF NOT EXISTS `noamtz`.`shift_request` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `idShifts` INT NOT NULL ,
  `userEmail` VARCHAR(100) NOT NULL ,
  `request_time` BIGINT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_shift_request_shifts1_idx` (`idShifts` ASC) ,
  INDEX `fk_shift_request_users1_idx` (`userEmail` ASC) ,
  CONSTRAINT `fk_shift_request_shifts1`
    FOREIGN KEY (`idShifts` )
    REFERENCES `noamtz`.`shifts` (`idShifts` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shift_request_users1`
    FOREIGN KEY (`userEmail` )
    REFERENCES `noamtz`.`users` (`email` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `noamtz` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
