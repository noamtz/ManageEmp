SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `noamtz` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `noamtz` ;

-- -----------------------------------------------------
-- Table `noamtz`.`Users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `noamtz`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(100) NOT NULL ,
  `firstname` VARCHAR(45) NOT NULL ,
  `lastname` VARCHAR(45) NOT NULL ,
  `phone` VARCHAR(45) NULL ,
  UNIQUE INDEX `idUsers_UNIQUE` (`idUsers` ASC) ,
  PRIMARY KEY (`email`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`Roles`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `noamtz`.`Roles` (
  `idRoles` INT NOT NULL ,
  `type` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`idRoles`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`Shifts`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `noamtz`.`Shifts` (
  `idShifts` INT NOT NULL AUTO_INCREMENT ,
  `start` DATETIME NOT NULL ,
  `end` DATETIME NOT NULL ,
  PRIMARY KEY (`idShifts`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`Application`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `noamtz`.`Application` (
  `idApplication` INT NOT NULL AUTO_INCREMENT ,
  `password` VARCHAR(200) NOT NULL ,
  `passwordSalt` VARCHAR(200) NOT NULL ,
  `role` VARCHAR(45) NOT NULL ,
  `Users_email` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`idApplication`, `Users_email`) ,
  INDEX `fk_Application_Users1_idx` (`Users_email` ASC) ,
  CONSTRAINT `fk_Application_Users1`
    FOREIGN KEY (`Users_email` )
    REFERENCES `noamtz`.`Users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`Users_has_Roles`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `noamtz`.`Users_has_Roles` (
  `Users_email` VARCHAR(100) NOT NULL ,
  `Roles_idRoles` INT NOT NULL ,
  PRIMARY KEY (`Users_email`, `Roles_idRoles`) ,
  INDEX `fk_Users_has_Roles_Roles1_idx` (`Roles_idRoles` ASC) ,
  INDEX `fk_Users_has_Roles_Users_idx` (`Users_email` ASC) ,
  CONSTRAINT `fk_Users_has_Roles_Users`
    FOREIGN KEY (`Users_email` )
    REFERENCES `noamtz`.`Users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Roles_Roles1`
    FOREIGN KEY (`Roles_idRoles` )
    REFERENCES `noamtz`.`Roles` (`idRoles` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `noamtz`.`shiftPart`
-- -----------------------------------------------------
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
    REFERENCES `noamtz`.`Users` (`email` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ShiftPart_Roles1`
    FOREIGN KEY (`idRoles` )
    REFERENCES `noamtz`.`Roles` (`idRoles` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aa_Shifts1`
    FOREIGN KEY (`idShifts` )
    REFERENCES `noamtz`.`Shifts` (`idShifts` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `noamtz` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
