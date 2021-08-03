import {
  SUCCESS,
  NOT_FOUND,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { checkResults } from "../../utils/validate";
import { AddressCRUD } from "../../database/crud";
import { ErrorHandler } from "../../utils/errors";

const addAAddress = async (request, response, next) => {
  const { id } = request.user;
  const { city, state, phone, country, address1, address2 } = request.body;

  try {
    const alreadyHasAddress = await AddressCRUD.getOneByUserID(id);
    if (alreadyHasAddress.rows.length >= 1) {
      throw new ErrorHandler(NOT_FOUND, "user already has an address");
    }

    const addressQuery = await AddressCRUD.createOne(
      id,
      city,
      state,
      phone,
      country,
      address1,
      address2
    );

    response.status(SUCCESS).json({
      message: "Success",
      address: { id: addressQuery.rows[0].addressid },
    });
  } catch (err) {
    next(err);
  }
};

const updateAddress = async (request, response, next) => {
  const { id } = request.user;
  const { city, state, phone, country, address1, address2 } = request.body;

  try {
    await AddressCRUD.updateOne(
      id,
      city,
      state,
      phone,
      country,
      address1,
      address2
    );
    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const getAddress = async (request, response, next) => {
  const { id } = request.user;

  try {
    const addressQuery = await AddressCRUD.getOneByUserID(id);
    let address = null;
    //reassign address values if available
    if (addressQuery.rows.length === 1) {
      address = {
        id: addressQuery.rows[0].addressid,
        city: addressQuery.rows[0].addresscity,
        state: addressQuery.rows[0].addressstate,
        phone: addressQuery.rows[0].addressphone,
        country: addressQuery.rows[0].addresscountry,
        address1: addressQuery.rows[0].address1,
        address2: addressQuery.rows[0].address2,
      };
    }

    response.status(SUCCESS).json({ message: "success", address });
  } catch (err) {
    next(err);
  }
};

const AddressControllers = {
  addAAddress,
  updateAddress,
  getAddress,
};

export default AddressControllers;
