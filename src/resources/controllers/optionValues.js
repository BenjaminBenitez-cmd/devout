import {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { ProductOptionsCRUD } from "../../database/crud/option.crud";
import { checkResults } from "../../utils/validate";

const addAValue = async (request, response, next) => {
  const { productid, optionid } = request.params;
  const { name } = request.body;

  try {
    const valueQuery = await ProductOptionsCRUD.values.createOne(
      name,
      productid,
      optionid
    );
    checkResults(valueQuery, ERROR, "Unable to add option");

    response.status(SUCCESS).json({
      message: "Success",
      value: {
        id: valueQuery.rows[0].valueid,
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
    const valueQuery = await ProductOptionsCRUD.values.getMany(optionid);

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
  const { valueid } = request.params;
  try {
    await ProductOptionsCRUD.values.removeOne(valueid);
    response.status(SUCCESS_MODIFICATION).send("Successfully removed value");
  } catch (err) {
    next(err);
  }
};

const OptionValueControllers = {
  addAValue,
  removeAValue,
  getValues,
};

export default OptionValueControllers;
