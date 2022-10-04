import {
  SUCCESS,
  ERROR,
  NOT_FOUND,
  NOT_AUTHORIZED,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import {
  InventoryCRUD,
  ProductCRUD,
  SKUCRUD,
  ImageCRUD,
  OrderCRUD,
  ProductCatCRUD,
  CategoriesCRUD,
} from "../../database/crud";
import { ErrorHandler } from "../../utils/errors";
import { checkResults } from "../../utils/validate";

const addAProduct = async (
  skucode,
  name,
  price,
  cartdesc,
  shortdesc,
  longdesc,
  discountid,
  images,
  amount
) => {
  let isLive = true;
  let unlimited = false;
  return new Promise(async (resolve, reject) => {
    try {
      //insert the amount to the inventory first
      const inventoryInsert = await InventoryCRUD.createOne(
        amount,
        isLive,
        unlimited
      );

      //Insert the product
      const productInsert = await ProductCRUD.createOne(
        name,
        price,
        cartdesc,
        shortdesc,
        longdesc
      );

      //We will now create our new SKU for our product
      const skuInsert = await SKUCRUD.createOne(
        skucode,
        price,
        inventoryInsert.rows[0].inventoryid,
        productInsert.rows[0].productid
      );

      //Insert all images
      const imageQuery = await Promise.all(
        //insert all image urls to db
        images.map(async (image) => {
          let imageResult = await ImageCRUD.createOne(
            image,
            productInsert.rows[0].productid,
            skuInsert.rows[0].skuid
          );
          let { imageid, imageurl } = imageResult.rows[0];
          return {
            id: imageid,
            url: imageurl,
          };
        })
      );

      //insert categories
      // if (categories !== null || categories.length > 0) {
      //   categories.forEach(async (category) => {
      //     await ProductCatCRUD.createOne(id, category.id);
      //   });
      // }

      resolve({
        id: productInsert.rows[0].productid,
        skuid: skuInsert.rows[0].skuid,
        name: name,
        cartdescription: cartdesc,
        longdescription: longdesc,
        shortdescription: shortdesc,
        price: price,
        amount: amount,
        islive: isLive,
        images: imageQuery,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productQuery = await ProductCRUD.getMany();

      if (productQuery.rows.length <= 0) {
        resolve([]);
      }

      const { rows } = productQuery;

      const productsOrdersAndSales = await Promise.all(
        rows.map(async (product) => {
          const {
            productid,
            productname,
            productprice,
            productcartdesc,
            productshortdesc,
            productlongdesc,
            productdiscountid,
          } = product;

          const saleQuery = await OrderCRUD.items.getSalesByProductID(
            productid
          );

          const orderQuery = await OrderCRUD.items.getManyByProductID(
            productid
          );

          const skuQuery = await SKUCRUD.getManyByProductID(productid);

          const { skuid } = skuQuery.rows[0];

          const imageQuery = await ImageCRUD.getManyByProductAndSKU(
            productid,
            skuid
          );

          const categoriesQuery = await CategoriesCRUD.getManyForProduct(
            productid
          );

          const mappedCategories = categoriesQuery.rows.map((cat) => {
            return {
              id: cat.categoryid,
              name: cat.categoryname,
            };
          });

          return {
            id: productid,
            name: productname,
            price: productprice,
            cartdescription: productcartdesc,
            shortdescription: productshortdesc,
            longdescription: productlongdesc,
            categories: mappedCategories,
            discountid: productdiscountid,
            sales: saleQuery.rows.length,
            orders: orderQuery.rows.length,
            images: imageQuery.rows,
          };
        })
      );

      resolve(productsOrdersAndSales);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param { integer } id will be used to filter for the products
 * @returns { object } with a product and it's variants
 */
const getAProduct = async (id) => {
  if (!id) new ErrorHandler(NOT_AUTHORIZED, "Missing id");

  return new Promise(async (resolve, reject) => {
    try {
      const productQuery = await ProductCRUD.getOneByID(id);

      if (productQuery.rows.length <= 0) {
        reject(new ErrorHandler(NOT_FOUND, "Unable to find product"));
      }

      const {
        productid,
        productname,
        productprice,
        productcartdesc,
        productshortdesc,
        productlongdesc,
        productdiscountid,
      } = productQuery.rows[0];

      //GET SKUS with productid
      const skuvariantsQuery = await SKUCRUD.getManyByProductID(productid);
      checkResults(skuvariantsQuery, NOT_FOUND, "Product could not be located");

      //This is the result from fetching variants
      const { rows } = skuvariantsQuery;

      const allVariants = await SKUCRUD.values.getManyByProductID(id);

      /**if there is only one variant it means we dont have to
       * map the inventory to each row  */

      const mapvariants = await Promise.all(
        rows.map(async (variant) => {
          const { skuid, skuname, price, productinventoryid } = variant;

          const inventoryQuery = await InventoryCRUD.getOne(productinventoryid);
          checkResults(
            inventoryQuery,
            NOT_FOUND,
            "Could not find matching inventory"
          );

          const { inventoryquantity, inventorylive, inventoryunlimited } =
            inventoryQuery.rows[0];

          const imageQuery = await ImageCRUD.getManyByProductAndSKU(
            productid,
            skuid
          );

          return {
            skuid,
            skuname,
            price,
            quantity: inventoryunlimited ? "unlimited" : inventoryquantity,
            live: inventorylive,
            images: imageQuery.rows,
          };
        })
      );

      //find our non variant
      const nonVariant = mapvariants.find(
        (sku) =>
          !allVariants.rows.some(
            (vari) => vari.skuid.toString() === sku.skuid.toString()
          )
      );

      let categoriesQuery = await ProductCatCRUD.getMany(id);

      //rename the categories
      let categories;
      if (categoriesQuery.rows.length > 0) {
        categories = categoriesQuery.rows.map((categories) => {
          return {
            categoryid: categories.categoryid,
            productid: id,
            name: categories.categoryname,
          };
        });
      }

      resolve({
        id: productid,
        name: productname,
        price: productprice,
        skuid: nonVariant.skuid,
        skucode: nonVariant.skuname,
        images: nonVariant.images,
        live: nonVariant.live,
        quantity: nonVariant.quantity,
        cartdescription: productcartdesc,
        shortdescription: productshortdesc,
        longdescription: productlongdesc,
        discountid: productdiscountid,
        categories: categories,
        variants: mapvariants.filter(
          (variant) => variant.skuid.toString() !== nonVariant.skuid
        ),
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param {integer} id
 * @param {integer} skuid
 * @param {string} name
 * @param {float} price
 * @param {string} shortdescription
 * @param {string} longdescription
 * @param {array} images
 * @param {integer} amount
 * @returns {object} this object contains the id and sku id of recently updated product
 */

const updateAProduct = async (
  id,
  skuid,
  name,
  price,
  shortdescription,
  longdescription,
  images,
  amount
) => {
  return new Promise(async (resolve, reject) => {
    try {
      //GET SKUs
      const isItAVariant = await SKUCRUD.values.getOneBySKUID(skuid);
      //Check if product is variant
      if (isItAVariant.rows[0] !== undefined) {
        reject(
          new ErrorHandler(
            ERROR,
            "This is a variant update it with using variants"
          )
        );
      }

      await ProductCRUD.updateOne(
        id,
        name,
        price,
        shortdescription,
        longdescription
      );

      let imagesQuery;

      //Insert every image if urls were sent
      if (images !== null && images.length > 0) {
        imagesQuery = await Promise.all(
          images.map(async (image) => {
            const imageQuery = await ImageCRUD.createOne(image, id, skuid);
            checkResults(imageQuery, ERROR, "Unable to add message");
            let { imageid } = imageQuery.rows[0];
            return {
              id: imageid,
              url: image,
            };
          })
        );
      }

      //update the inventory if parameters were sent
      if (amount !== undefined && amount !== null) {
        let islive = true;
        let unlimited = false;

        //Get the inventory id
        const skuQuery = await SKUCRUD.getOneBySKUID(skuid);
        if (skuQuery.rows.lenght <= 0) {
          reject(new ErrorHandler(NOT_FOUND, "Unable to find values"));
        }

        const { productinventoryid } = skuQuery.rows[0];

        await InventoryCRUD.updateOne(
          productinventoryid,
          amount,
          islive,
          unlimited
        );
      }

      // if (categories !== null || categories.length > 0) {
      //   categories.forEach(async (category) => {
      //     //if it is already it means we have to delete it
      //     const checkQuery = await ProductCRUD.getOneByID(category.id);
      //     if (checkQuery.rows.length > 0) {
      //       await ProductCRUD.deleteAProduct(category.id);
      //       return;
      //     }
      //     await ProductCatCRUD.createOne(id, category.id);
      //   });
      // }

      resolve({
        id: id,
        skuid: skuid,
        updatedimages: imagesQuery,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteAProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ProductCRUD.removeOne(id);
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const ProductService = {
  addAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};

export default ProductService;
