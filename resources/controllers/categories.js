const { CategoriesCRUD } = require("../../database/crud");
const checkResults = require("../../utils/validate");
const {
  ERROR,
  SUCCESS_MODIFICATION,
  SUCCESS,
  NOT_AUTHORIZED,
  NOT_FOUND,
} = require("../../constants/statuscodes");

const addACategory = async (request, response, next) => {
  const { name } = request.body;
  try {
    const categoryQuery = await CategoriesCRUD(name);
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

const deleteACategory = async (_, response, next) => {
  const { id } = req.params;
  try {
    await CategoriesCRUD.deleteACategory(id);
    response.status(SUCCESS_MODIFICATION).send("Deleted Category");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addACategory,
  updateACategory,
  deleteACategory,
  getAllCategories,
};
