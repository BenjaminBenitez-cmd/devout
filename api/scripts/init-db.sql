--Create the users table
CREATE TABLE Users (
   UserID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   UserEmail VARCHAR(500) NOT NULL,
   UserPassword VARCHAR(500),
   UserFirstName VARCHAR(50),
   UserLastName VARCHAR(50),
   UserEmailVerified BOOLEAN DEFAULT FALSE,
   UserVerificationCode VARCHAR(1000),
   UserRegistrationDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users(UserEmail, UserPassword, UserFirstName, UserLastName) VALUES ('test@test.com', '534234k3', 'John', 'Doe');

CREATE TABLE Addresses (
    AddressID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    UserID INT NOT NULL REFERENCES Users(UserID) ON DELETE CASCADE,
    AddressCity VARCHAR(90) NOT NULL,
    AddressState VARCHAR(20) NOT NULL,
    AddressPhone VARCHAR(20) NOT NULL,
    AddressCountry VARCHAR(20) NOT NULL,
    Address1 VARCHAR(100) NOT NULL,
    Address2 VARCHAR(50) 
);

INSERT INTO Addresses (UserID, AddressCity, AddressState, AddressPhone, AddressCountry, Address1) 
VALUES(1, 'Belize', 'Orange Walk', '300000', 'Belize', 'Queen Street');

CREATE TABLE EmailPrefferences (
    PrefferencesID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PrefferencesDailyUpdates BOOLEAN DEFAULT FALSE,
    PrefferencesProductUpdates BOOLEAN DEFAULT FALSE, 
    UserID INT NOT NULL REFERENCES Users(UserID) ON DELETE CASCADE
);

INSERT INTO EmailPrefferences(UserID) VALUES (1);

--generate these tables before the products table --
CREATE TABLE Categories (
    CategoryID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);

INSERT INTO Categories(CategoryName) VALUES ('Addidas');
INSERT INTO Categories(CategoryName) VALUES ('Nike');

CREATE TABLE ProductDiscounts (
    DiscountID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    DiscountName VARCHAR(200) NOT NULL,
    DiscountAmount VARCHAR(20) NOT NULL,
    DiscountQuantity INT NOT NULL,
    DiscountStartDate DATE NOT NULL,
    DiscountExpiryDate DATE NOT NULL
);

CREATE TABLE ProductInventory (
    InventoryID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    InventoryQuantity INT NOT NULL,
    InventoryLive BOOLEAN, 
    InventoryUnlimited BOOLEAN
);

INSERT INTO ProductInventory(InventoryQuantity, InventoryLive, InventoryUnlimited) VALUES (20.23, true, false);
INSERT INTO ProductInventory(InventoryQuantity, InventoryLive, InventoryUnlimited) VALUES (20.23, true, false);

-- Lets add a product --
CREATE TABLE Products (
    ProductID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    ProductPrice NUMERIC(6, 2) NOT NULL,
    ProductCartDesc VARCHAR(250) NOT NULL,
    ProductShortDesc VARCHAR(1000) NOT NULL,
    ProductLongDesc TEXT NOT NULL,
    ProductDiscountID INT REFERENCES ProductDiscounts(DiscountID)
);

CREATE TABLE ProductCategories (
   CategoryID INT NOT NULL REFERENCES Categories(CategoryID),
   ProductID INT NOT NULL REFERENCES Products(ProductID) ON DELETE CASCADE,
   PRIMARY KEY(CategoryID, ProductID)
);



--We insert a value into the database--
INSERT INTO Products(ProductName, ProductPrice, ProductCartDesc, ProductShortDesc, ProductLongDesc)
VALUES ('Addidas Super Star', 125.00, 'The addidas super start is the best shoe', 'The best shoe in the world', 'The super start is an award winning shoe designed with comfort in mind'); 

INSERT INTO ProductCategories (CategoryID, ProductID) VALUES (1, 1);
INSERT INTO ProductCategories (CategoryID, ProductID) VALUES (2, 1);

CREATE TABLE ProductOptions(
    OptionID BIGINT GENERATED ALWAYS AS IDENTITY,
    ProductID INT UNIQUE,
    OptionName VARCHAR(30) NOT NULL,
    PRIMARY KEY(ProductID, OptionID),
    UNIQUE(ProductID, OptionName)
);
-- We create a new option for the product a product ID can
-- assigned directly to the the option

INSERT INTO ProductOptions(ProductID, OptionName) VALUES (1, 'Size');

-- An options value table is created here, it will
-- house the values for the options table

CREATE TABLE ProductOptionValues(
   ValueID BIGINT GENERATED ALWAYS AS IDENTITY,
   ValueName VARCHAR(40) NOT NULL,
   ProductID INT NOT NULL,
   OptionID INT NOT NULL,
   FOREIGN KEY (ProductID, OptionID) REFERENCES ProductOptions(productID, OptionID) ON DELETE CASCADE,
   UNIQUE(ProductID, OptionID, ValueName),
   PRIMARY KEY (ProductID, OptionID, ValueID)
);

INSERT INTO ProductOptionValues(ValueName, ProductID, OptionID) VALUES ('XXL', 1, 1);
INSERT INTO ProductOptionValues(ValueName, ProductID, OptionID) VALUES ('SM', 1, 1);

-- Product sku table will serve to house the individual product 
-- sku for each product
CREATE TABLE ProductSKUS (
    SKUID BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
    SKUName VARCHAR(30) NOT NULL,
    Price DECIMAL(10,2) NOT NUll,
    ProductInventoryID INT NOT NULL REFERENCES ProductInventory(InventoryID),
    ProductID INT NOT NULL REFERENCES products (productID) ON DELETE CASCADE,
    PRIMARY KEY (ProductID, SKUID)
);

-- Here each product is maked to an sku, option, and value
-- example product 1, has an sku of 1, option of 1 and value of 1
INSERT INTO ProductSKUS (SKUName, ProductID, Price, ProductInventoryID) VALUES ('AD-SM-RD', 1, 125.00, 1);
INSERT INTO ProductSKUS (SKUName, ProductID, Price, ProductInventoryID) VALUES ('AD-SM-PT', 1, 125.00, 2);

CREATE TABLE ProductSKUValues (
    ProductID INT NOT NULL,
    SKUID INT NOT NULL,
    OptionID INT NOT NULL,
    ValueID INT NOT NULL,
    FOREIGN KEY (ProductID, SKUID) REFERENCES ProductSKUS (ProductID, SKUID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID, OptionID) REFERENCES ProductOptions (ProductID, OptionID) ON DELETE SET NULL,
    FOREIGN KEY (ProductID, OptionID, ValueID) REFERENCES ProductOptionValues (ProductID, OptionID, ValueID) ON DELETE SET NULL,
    PRIMARY KEY (ProductID, SKUID, OptionID)
);

INSERT INTO ProductSKUValues(ProductID, SKUID, OptionID, ValueID) VALUES (1, 2, 1, 1);

--Create a products table for images it will reference unique products
-- Using their composite key
CREATE TABLE ProductImages (
    ImageID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ImageUrl VARCHAR(100) NOT NULL,
    ProductID INT NOT NULL,
    SKUID INT NOT NULL,
    FOREIGN KEY (ProductID, SKUID) REFERENCES ProductSKUS (ProductID, SKUID) ON DELETE CASCADE
);

INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ('http://testurl.com', 1, 1);
INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ('http://testurl.com', 1, 2);

--Create tables necessary for order items
CREATE TABLE PaymentDetails (
    PaymentID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PaymentAmount NUMERIC(12, 2) NOT NULL,
    PaymentProvider VARCHAR(100) NOT NULL,
    PaymentStatus VARCHAR(20) NOT NULL
);

INSERT INTO PaymentDetails (PaymentAmount, PaymentProvider, PaymentStatus) VALUES (500.00, 'Stripe', 'Fullfilled');

CREATE TABLE OrderDetails (
    OrderDetailsID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    UserID INT NOT NULL REFERENCES Users(UserID), 
    OrderDetailTotal NUMERIC(12, 2) NOT NULL,
    OrderDetailPaymentID INT NOT NULL REFERENCES PaymentDetails(PaymentID)
);

INSERT INTO OrderDetails (UserID, OrderDetailTotal, OrderDetailPaymentID) 
VALUES (1, 500.00, 1);

CREATE TABLE OrderItems (
    OrderItemsID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    OrderDetailsID INT NOT NULL REFERENCES OrderDetails(OrderDetailsID),
    ProductID INT NOT NULL,
    SKUID INT NOT NULL,
    OrderQuantity INT NOT NULL,
    FOREIGN KEY (ProductID, SKUID) REFERENCES ProductSKUS(ProductID, SKUID)
);

INSERT INTO OrderItems (OrderDetailsID, ProductID, SKUID, OrderQuantity)
VALUES (1, 1, 1, 2);

CREATE TABLE ShoppingSession (
    SessionID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    UserID INT NOT NULL REFERENCES Users(UserID),
    CartQuantity INT NOT NULL
);

INSERT INTO ShoppingSession (UserID, CartQuantity) VALUES (1, 2);

CREATE TABLE CartItem (
    CartID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    SessionID INT NOT NULL REFERENCES ShoppingSession(SessionID) ON DELETE CASCADE,
    ProductID INT NOT NULL,
    SKUID INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (ProductID, SKUID) REFERENCES ProductSKUS(ProductID, SKUID)
);

INSERT INTO CartItem (SessionID, ProductID, SKUID, Quantity) VALUES (1, 1, 1, 3);

CREATE TABLE AdminUsers (
    AdminID BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    AdminUserName VARCHAR(100) NOT NULL,
    AdminPassword VARCHAR(500) NOT NULL,
    AdminFirstName VARCHAR(50),
    AdminLastName VARCHAR(50)
);

INSERT INTO AdminUsers (AdminUserName, AdminPassword, AdminFirstName, AdminLastName) VALUES ('testadmin', 'password', 'John', 'Doe');
