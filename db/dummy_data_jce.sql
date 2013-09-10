USE `noamtz` ;

-- -----------------------------------------------------
-- Create users
-- -----------------------------------------------------

INSERT INTO `noamtz`.`users` (`email`, `firstname`, `lastname`, `phone`)
VALUES ('noam@gmail.com', 'noam', 'tzumie', '0541849785');

INSERT INTO `noamtz`.`users` (`email`, `firstname`, `lastname`, `phone`)
VALUES ('david@gmail.com', 'david', 'cohen', '0541849734');

INSERT INTO `noamtz`.`users` (`email`, `firstname`, `lastname`, `phone`)
VALUES ('avi@gmail.com', 'avi', 'levy', '0523449785');

INSERT INTO `noamtz`.`users` (`email`, `firstname`, `lastname`, `phone`)
VALUES ('reut@gmail.com', 'reut', 'jacob', '0541849343');

INSERT INTO `noamtz`.`users` (`email`, `firstname`, `lastname`, `phone`)
VALUES ('admin@gmail.com', 'administrator', 'admin', '0541849343');


-- -----------------------------------------------------
-- Create roles
-- -----------------------------------------------------

INSERT INTO `noamtz`.`roles` (`type`) VALUES ('Commander');

INSERT INTO `noamtz`.`roles` (`type`) VALUES ('Guard');

INSERT INTO `noamtz`.`roles` (`type`) VALUES ('Diver');

INSERT INTO `noamtz`.`roles` (`type`) VALUES ('MasterDiver');

INSERT INTO `noamtz`.`roles` (`type`) VALUES ('Sailor');

-- -----------------------------------------------------
-- Create shifts
-- -----------------------------------------------------

INSERT INTO `noamtz`.`shifts` (`idShifts`, `start`, `end`) VALUES (NULL, '2013-09-23', '2013-09-27');

INSERT INTO `noamtz`.`shifts` (`idShifts`, `start`, `end`) VALUES (NULL, '2013-09-28', '2013-10-01');

INSERT INTO `noamtz`.`shifts` (`idShifts`, `start`, `end`) VALUES (NULL, '2013-10-02', '2013-10-07');

INSERT INTO `noamtz`.`shifts` (`idShifts`, `start`, `end`) VALUES (NULL, '2013-10-08', '2013-10-13');

-- -----------------------------------------------------
-- Create user_has_roles
-- -----------------------------------------------------

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('noam@gmail.com', '1');

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('noam@gmail.com', '2');

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('david@gmail.com', '3');

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('avi@gmail.com', '4');

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('avi@gmail.com', '2');

INSERT INTO `noamtz`.`users_has_roles` (`userEmail`, `idRoles`) VALUES ('reut@gmail.com', '5');

-- -----------------------------------------------------
-- Create application entry
-- -----------------------------------------------------

INSERT INTO `noamtz`.`application` (`idApplication`, `password`, `passwordSalt`, `role`, `userEmail`) 
VALUES (NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', 'pslt', 'user', 'noam@gmail.com');

INSERT INTO `noamtz`.`application` (`idApplication`, `password`, `passwordSalt`, `role`, `userEmail`) 
VALUES (NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', 'pslt', 'user', 'david@gmail.com');

INSERT INTO `noamtz`.`application` (`idApplication`, `password`, `passwordSalt`, `role`, `userEmail`) 
VALUES (NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', 'pslt', 'user', 'avi@gmail.com');

INSERT INTO `noamtz`.`application` (`idApplication`, `password`, `passwordSalt`, `role`, `userEmail`) 
VALUES (NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', 'pslt', 'user', 'reut@gmail.com');

INSERT INTO `noamtz`.`application` (`idApplication`, `password`, `passwordSalt`, `role`, `userEmail`) 
VALUES (NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', 'pslt', 'admin', 'admin@gmail.com');