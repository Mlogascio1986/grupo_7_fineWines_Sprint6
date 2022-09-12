-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fwsp6
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fwsp6
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `fwsp6`.`bodegas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bodegas` (
  `idbodegas` INT NOT NULL AUTO_INCREMENT,
  `nameBodega` VARCHAR(45) NULL,
  PRIMARY KEY (`idbodegas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fwsp6`.`varietal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`varietal` (
  `idvarietal` INT NOT NULL AUTO_INCREMENT,
  `nameVarietal` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idvarietal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos` (
  `idproduct` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `price` INT NULL,
  `discount` INT(2) NULL,
  `image` VARCHAR(50) NULL,
  `description` VARCHAR(100) NULL,
  `visited` TINYINT NULL,
  `bodegas_idbodegas` INT NOT NULL,
  `varietal_idvarietal` INT NOT NULL,
  PRIMARY KEY (`idproduct`),
  INDEX `fk_productos_bodegas_idx` (`bodegas_idbodegas` ASC),
  INDEX `fk_productos_varietal1_idx` (`varietal_idvarietal` ASC),
  CONSTRAINT `fk_productos_bodegas`
    FOREIGN KEY (`bodegas_idbodegas`)
    REFERENCES `mydb`.`bodegas` (`idbodegas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_varietal1`
    FOREIGN KEY (`varietal_idvarietal`)
    REFERENCES `mydb`.`varietal` (`idvarietal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Table `mydb`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Roles` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `fechaNacimiento` VARCHAR(45) NOT NULL,
  `domicilio` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NULL,
  `Roles_idRol` INT NOT NULL,
  PRIMARY KEY (`id`, `Roles_idRol`),
  CONSTRAINT `fk_Users_Roles`
    FOREIGN KEY (`Roles_idRol`)
    REFERENCES `mydb`.`Roles` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idUsers_UNIQUE` ON `mydb`.`Users` (`id` ASC);

CREATE INDEX `fk_Users_Roles_idx` ON `mydb`.`Users` (`Roles_idRol` ASC);

-- -----------------------------------------------------
-- Table `mydb`.`Carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Carrito` (
  `idCarrito` INT NOT NULL,
  PRIMARY KEY (`idCarrito`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
