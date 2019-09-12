use smart_fridge;

-- Generating test data
INSERT INTO `smart_fridge`.`users` (`name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES ('Magyar Csaba', 'csabee005@gmail.com', 'valami', '2019-09-07', '2019-09-07');
INSERT INTO `smart_fridge`.`fridges` (`name`, `location`, `createdAt`, `updatedAt`, `userId`) VALUES ('Otthoni', 'Konyha', '2019-09-07', '2019-09-07', '1');
INSERT INTO `smart_fridge`.`users` (`name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES ('Rankl Fanni', 'fyny94@gmail.com', 'valami', '2019-09-07', '2019-09-07');
INSERT INTO `smart_fridge`.`fridges` (`name`, `location`, `createdAt`, `updatedAt`, `userId`) VALUES ('Otthoni', 'Konyha', '2019-09-07', '2019-09-07', '2');

-- Adding standalone items to the available products
INSERT INTO `smart_fridge`.`products` (`name`, `category`, `calories`, `unit`, `description`, `createdAt`, `updatedAt`) VALUES ('Milk', 'Dairy', '260', 'l', 'Everyone\'s favourite.', '2019-09-07 00:00:00', '2019-09-07 00:00:00');
INSERT INTO `smart_fridge`.`products` (`name`, `category`, `calories`, `unit`, `description`, `createdAt`, `updatedAt`) VALUES ('Cheese', 'Dairy', '170', 'g', 'Roll that shit.', '2019-09-07 00:00:00', '2019-09-07 00:00:00');
INSERT INTO `smart_fridge`.`products` (`name`, `category`, `calories`, `unit`, `description`, `createdAt`, `updatedAt`) VALUES ('Grapes', 'Fruit', '65', 'g', 'Better in a drink tho.', '2019-09-07 00:00:00', '2019-09-07 00:00:00');

-- Lets add some items to a fridge
INSERT INTO `smart_fridge`.`fridgeitems` (`quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('3', '2019-09-07', '2019-09-07', '1', '1');
INSERT INTO `smart_fridge`.`fridgeitems` (`quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('15', '2019-09-07', '2019-09-07', '1', '3');

-- Check what I have in my fridge
SELECT u.name AS 'NAME', pr.name, fi.quantity, pr.unit
FROM smart_fridge.users u, smart_fridge.fridgeitems fi, smart_fridge.fridges fr, smart_fridge.products pr
WHERE u.id = 1 AND fr.userId = u.id AND fi.fridgeId = fr.userId AND fi.fridgeId = fr.id AND fi.productId = pr.id;

-- Create Fanni's fridge
INSERT INTO `smart_fridge`.`fridges` (`name`, `location`, `createdAt`, `updatedAt`, `userId`) VALUES ('Manónál', 'Konyha', '2019-09-07 00:00:00', '2019-09-07 00:00:00', '2');

-- Fill her up
INSERT INTO `smart_fridge`.`fridgeitems` (`quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('1', '2019-09-07', '2019-09-07', '3', '1');
INSERT INTO `smart_fridge`.`fridgeitems` (`quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('3', '2019-09-07', '2019-09-07', '3', '2');
INSERT INTO `smart_fridge`.`fridgeitems` (`quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('540', '2019-09-07', '2019-09-07', '3', '3');

-- Create a shopping cart for her
INSERT INTO `smart_fridge`.`carts` (`createdAt`, `updatedAt`, `fridgeId`) VALUES ('2019-09-07', '2019-09-07', '3');

-- Add some items to it
INSERT INTO `smart_fridge`.`cartitems` (`quantity`, `createdAt`, `updatedAt`, `cartId`, `productId`) VALUES ('250', '2019-09-10', '2019-09-10', '1', '2');
INSERT INTO `smart_fridge`.`cartitems` (`quantity`, `createdAt`, `updatedAt`, `cartId`, `productId`) VALUES ('2', '2019-09-10', '2019-09-10', '1', '1');
INSERT INTO `smart_fridge`.`cartitems` (`quantity`, `createdAt`, `updatedAt`, `cartId`, `productId`) VALUES ('1500', '2019-09-10', '2019-09-10', '1', '3');

-- Check her shopping cart
SELECT *
FROM users
	RIGHT JOIN fridges
    ON users.id = fridges.userId
		RIGHT JOIN carts
        ON carts.fridgeId = fridges.id
			RIGHT JOIN cartitems
            ON carts.id = cartitems.cartId
            WHERE users.id = 2;
            
-- Set content preferences for her fridge
	INSERT INTO `smart_fridge`.`contentpreferences` (`operator`, `quantity`, `createdAt`, `updatedAt`, `fridgeId`, `productId`) VALUES ('>', '250', '2019-09-07 00:00:00', '2019-09-07 00:00:00', '2', '2');

-- Set app preferences for me
INSERT INTO `smart_fridge`.`apppreferences` (`name`, `value`, `createdAt`, `updatedAt`, `userId`) VALUES ('style', 'black', '2019-09-07', '2019-09-07', '1');
INSERT INTO `smart_fridge`.`apppreferences` (`name`, `value`, `createdAt`, `updatedAt`, `userId`) VALUES ('padding', '15', '2019-09-07', '2019-09-07', '1');
INSERT INTO `smart_fridge`.`apppreferences` (`name`, `value`, `createdAt`, `updatedAt`, `userId`) VALUES ('marginTop', '4', '2019-09-07', '2019-09-07', '1');
INSERT INTO `smart_fridge`.`apppreferences` (`name`, `value`, `createdAt`, `updatedAt`, `userId`) VALUES ('style', 'black', '2019-09-07', '2019-09-07', '2');