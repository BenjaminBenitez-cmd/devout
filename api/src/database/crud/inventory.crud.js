import db from "../connection";

const Inventory = {};

Inventory.getOne = (id) => {
  return db.query(`SELECT * FROM ProductInventory WHERE InventoryID= $1`, [id]);
};

Inventory.createOne = (quantity, live, unlimited) => {
  return db.query(
    `INSERT INTO ProductInventory(InventoryQuantity, InventoryLive, InventoryUnlimited) VALUES ($1, $2, $3) returning*`,
    [quantity, live, unlimited]
  );
};

Inventory.updateOne = (id, quantity, live, unlimited) => {
  return db.query(
    `
        UPDATE ProductInventory 
        SET 
        InventoryQuantity = $1,
        InventoryLive = $2,
        InventoryUnlimited = $3
        WHERE InventoryID = $4
        returning*
    `,
    [quantity, live, unlimited, id]
  );
};

Inventory.removeOne = (id) => {
  return db.query(
    `
            DELETE 
            FROM ProductInventory
            WHERE InventoryID = $1
            returning*
        `,
    [id]
  );
};

Inventory.getAmount = (skuid) => {
  return db.query(
    ` 
    SELECT I.InventoryQuantity, I.InventoryLive, PSK.SKUID, PSK.Price, I.InventoryID
    FROM ProductSKUS AS PSK
    INNER JOIN ProductInventory AS I
    ON PSK.ProductInventoryID = I.InventoryID
    WHERE PSK.SKUID = $1
    `,
    [skuid]
  );
};

export const InventoryCRUD = Inventory;
