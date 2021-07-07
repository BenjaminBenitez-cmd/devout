const {
  SUCCESS,
  NOT_FOUND,
  SUCCESS_MODIFICATION,
} = require("../../constants/statuscodes");
const { AddressCRUD } = require("../../database/crud");
const { checkResults } = require("../../utils/validate");

const addAAddress = async (request, response, next) => {
  const { id } = request.user;
  const { city, state, phone, country, address1, address2 } = request.body;

  try {
    const alreadyHasAddress = await AddressCRUD.getOneByUserID(id);
    checkResults(alreadyHasAddress, NOT_FOUND, "user already has an address");

    const addressQuery = await AddressCRUD.createOne(id, ...request.body);
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

    let address = [];
    if (addressQuery.rows.length > 0) {
      address.map((node) => {
        return {
          id: node.addressid,
          city: node.addresscity,
          state: node.addressstate,
          phone: node.addressphone,
          country: node.addresscountry,
          address1: node.address1,
          address2: node.address2,
        };
      });
    }
    response.status(SUCCESS).json({ message: "success", address });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addAAddress,
  updateAddress,
  getAddress,
};
