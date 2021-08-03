import {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { ProductOptionsCRUD } from "../../database/crud";
import { checkResults } from "../../utils/validate";

const addAnOption = async (request, response, next) => {
  const { productid } = request.params;
  const { name } = request.body;

  try {
    //Create an option
    const optionQuery = await ProductOptionsCRUD.createOne(productid, name);
    checkResults(optionQuery, ERROR, "Value already exists");

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
  const { optionid } = request.params;
  try {
    await ProductOptionsCRUD.removeOne(optionid);
    response.status(SUCCESS_MODIFICATION).send("Successfully deleted option");
  } catch (err) {
    next(err);
  }
};

//Option with productid
const getOptions = async (request, response, next) => {
  const { productid } = request.params;
  try {
    const optionQuery = await ProductOptionsCRUD.getMany(productid);
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
    next(err);
  }
};

const OptionControllers = {
  addAnOption,
  updateAnOption,
  deleteAnOption,
  getOptions,
};

export default OptionControllers;
