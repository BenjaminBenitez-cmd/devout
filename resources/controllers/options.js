const {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} = require("../../constants/statuscodes");
const { ProductOptionsCRUD } = require("../../database/crud/option.crud");
const checkResults = require("../../utils/validate");

const addAnOption = async (request, response, next) => {
  const { productid, name } = request.body;

  try {
    //Create an option
    const optionQuery = await ProductOptionsCRUD.createOne(productid, name);
    checkResults(optionQuery, ERROR, "Unable to add option");

    const { optionname, optionid } = optionQuery.rows[0];

    response.status(SUCCESS).json({
      message: "success",
      option: {
        id: optionid,
        name: optionname,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateAnOption = async (request, response, next) => {
  const { id, name } = request.body;
  try {
    await ProductOptionsCRUD.updateOne(id, name);
    response
      .status(SUCCESS_MODIFICATION)
      .send("Successfully created an option");
  } catch (err) {
    next(err);
  }
};
const deleteAnOption = async (request, response, next) => {
  const { id } = request.params;
  try {
    await ProductOptionsCRUD.removeOne(id);
    response.status(SUCCESS_MODIFICATION).send("Successfully deleted option");
  } catch (err) {
    next(err);
  }
};

//Option with productid
const getOptions = async (request, response, next) => {
  const { id } = request.params;
  try {
    const optionQuery = await ProductOptionsCRUD.getMany(id);
    console.log(optionQuery.rows);
    const mapOptions = optionQuery.rows.map((node) => {
      return {
        optionid: node.optionid,
        productid: node.productid,
        name: node.optionname,
      };
    });
    response
      .status(SUCCESS)
      .json({ message: "Successfull", options: mapOptions });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addAnOption,
  updateAnOption,
  deleteAnOption,
  getOptions,
};
