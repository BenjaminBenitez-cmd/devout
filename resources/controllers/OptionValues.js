const {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} = require("../../constants/statuscodes");
const { OptionsCRUD } = require("../../database/crud");
const checkResults = require("../../utils/validate");

const addAValue = async (request, response, next) => {
  const { name, productid, optionid } = request.body;

  try {
    const valueQuery = await OptionsCRUD.values.createOne(
      name,
      productid,
      optionid
    );
    checkResults(valueQuery, ERROR, "Unable to add option");

    response.status(SUCCESS).json({
      message: "Success",
      value: {
        id: valueQuery.rows[0].valueid,
        productid: productid,
        optionid: optionid,
        name: name,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getValues = async (request, response, next) => {
  const { optionid } = request.params;
  try {
    const valueQuery = await OptionsCRUD.values.getMany(optionid);

    let values;
    if (valueQuery.rows.length > 0) {
      values = valueQuery.rows.map((node) => {
        return {
          id: node.valueid,
          optionid: optionid,
          name: node.valuename,
        };
      });
    }

    response.status(SUCCESS).json({ message: "success", values: values });
  } catch (err) {
    next(err);
  }
};

const removeAValue = async (request, response, next) => {
  const { id } = request.params;
  try {
    await OptionsCRUD.values.removeOne(id);
    response.status(SUCCESS_MODIFICATION).send("Successfully removed value");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addAValue,
  removeAValue,
  getValues,
};
