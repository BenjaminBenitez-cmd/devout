import { CategoriesCRUD, ProductCatCRUD } from "../../database/crud";
import { checkResults } from "../../utils/validate";
import {
  ERROR,
  SUCCESS_MODIFICATION,
  SUCCESS,
  NOT_FOUND,
} from "../../constants/statuscodes";

const addACategory = async (request, response, next) => {
  const { name } = request.body;
  try {
    const categoryQuery = await CategoriesCRUD.createOne(name);
    checkResults(categoryQuery, ERROR, "Unable to create");

    const { categoryname, categoryid } = categoryQuery.rows[0];

    response.status(SUCCESS).json({
      message: "Success",
      category: {
        id: categoryid,
        name: categoryname,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateACategory = async (request, response, next) => {
  const { id, name } = request.body;

  try {
    await CategoriesCRUD(id, name);
    response(SUCCESS_MODIFICATION).send("Successfully updated category");
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (_, response, next) => {
  try {
    const categoryQuery = await CategoriesCRUD.getMany();
    checkResults(categoryQuery, NOT_FOUND, "Could not find categories");

    const mapKeys = categoryQuery.rows.map((node) => {
      return {
        id: node.categoryid,
        name: node.categoryname,
      };
    });

    response.status(SUCCESS).json({ message: "Success", categories: mapKeys });
  } catch (err) {
    next(err);
  }
};

const deleteACategory = async (request, response, next) => {
  const { id } = request.params;
  try {
    const deleteQuery = await CategoriesCRUD.removeOne(id);
    checkResults(deleteQuery, NOT_FOUND, "Unable to find Category");
    response.status(SUCCESS_MODIFICATION).send("Deleted Category");
  } catch (err) {
    next(err);
  }
};

const addCategoryToProduct = async (request, response, next) => {
  const { productid, categoryid } = request.params;

  try {
    await ProductCatCRUD.createOne(productid, categoryid);
    response
      .status(SUCCESS_MODIFICATION)
      .send("Successfully added category to product");
  } catch (err) {
    next(err);
  }
};

const removeCategoryFromProduct = async (request, response, next) => {
  const { productid, categoryid } = request.params;

  try {
    await ProductCatCRUD.removeOne(productid, categoryid);
    response
      .status(SUCCESS_MODIFICATION)
      .send("Successfully removed category from product");
  } catch (err) {
    next(err);
  }
};

const getCategoriesForProduct = async (request, response, next) => {
  const { productid } = request.params;

  try {
    const { rows } = await ProductCatCRUD.getMany(productid);

    let categories;
    if (rows.length > 0) {
      rows.map((node) => {
        return {
          id: node.categoryid,
          name: node.categoryname,
        };
      });
    }
    response
      .status(SUCCESS)
      .json({ message: "success", categories: categories });
  } catch (err) {
    next(err);
  }
};

const CategoryControllers = {
  addACategory,
  updateACategory,
  deleteACategory,
  getAllCategories,
  removeCategoryFromProduct,
  addCategoryToProduct,
  getCategoriesForProduct,
};

export default CategoryControllers;
