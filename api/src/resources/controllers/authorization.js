import { ErrorHandler } from "../../utils/errors";
import {
  NOT_AUTHORIZED,
  NOT_FOUND,
  SUCCESS,
  MISSING_PARAMS,
  ERROR,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { AdminCRUD } from "../../database/crud/admin.crud";
import { UsersCRUD } from "../../database/crud/user.crud";
import { checkResults } from "../../utils/validate";
import Tokens from "../../utils/tokens";
import encrypt from "../../utils/encrypt";
import SendGridService from "../services/sendgrid.service";

const signInAnAdmin = async (request, response, next) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return next(new ErrorHandler(NOT_AUTHORIZED, "Missing parameters"));
  }

  try {
    /**
     * check if admin exists in admin db
     * check if hashed password matches the one on the db
     * generate token if it matches
     */
    //get admin with username
    const adminQuery = await AdminCRUD.getOneByUserName(username);
    checkResults(adminQuery, NOT_FOUND, "No User with that name was found");

    const hashedPassword = adminQuery.rows[0].adminpassword;

    //compare two passwords
    const isPassword = await encrypt.comparePassword(password, hashedPassword);
    if (!isPassword) {
      throw new ErrorHandler(NOT_AUTHORIZED, "Invalid username or password");
    }

    const token = await Tokens.newToken({ id: adminQuery.rows[0].adminid });

    response.status(SUCCESS).json({ message: "Success", token });
  } catch (err) {
    next(err);
  }
};

const createAnAdmin = async (request, response, next) => {
  const { username, firstname, lastname, password } = request.body;
  if (!request.body) {
    return next(
      new ErrorHandler(
        MISSING_PARAMS,
        "Please provided the required parameters"
      )
    );
  }

  try {
    //Generate hashed password
    const hash = await encrypt.hashPassword(password);
    if (!hash) {
      throw new ErrorHandler(ERROR, "Opps something went wrong");
    }

    //Create admin user
    await AdminCRUD.createOne(username, hash, firstname, lastname);

    response
      .status(SUCCESS)
      .json({ message: "success", user: { username: username } });
  } catch (err) {
    next(err);
  }
};

const protectAdmin = async (request, response, next) => {
  const token = request.headers.authorization;
  if (token === undefined || token === null) {
    return next(new ErrorHandler(NOT_AUTHORIZED, "Missing Token"));
  }

  //check token format
  if (!token.startsWith("Bearer ")) {
    next(new ErrorHandler(NOT_AUTHORIZED, "Invalid Token"));
  }

  const [bearer, jwt] = token.split(" ", 2);

  try {
    //check if token is valid
    const isValid = await Tokens.verifyToken(jwt);

    const { id } = isValid;

    const adminQuery = await AdminCRUD.getOneByID(id);
    checkResults(adminQuery, NOT_AUTHORIZED, "Not Authorized");

    request.admin = { id: id };
    next();
  } catch (err) {
    next(err);
  }
};
/** User authentication methods */

const signInAUser = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(new ErrorHandler(NOT_AUTHORIZED, "Missing parameters"));
  }

  try {
    /**
     * get user
     * check if hashed password matches
     * generate token if it matches
     */

    //get user with email
    const userQuery = await UsersCRUD.getOneByEmail(email);
    checkResults(userQuery, NOT_FOUND, "No User with that name was found");

    if (userQuery.rows[0].isverified === false) {
      throw new ErrorHandler(NOT_AUTHORIZED, "Unverified, please try again");
    }

    const hashedPassword = userQuery.rows[0].userpassword;

    //compare two passwords
    const isPassword = await encrypt.comparePassword(password, hashedPassword);
    if (!isPassword) {
      throw new ErrorHandler(NOT_AUTHORIZED, "Invalid username or password");
    }

    const token = await Tokens.newToken({ id: userQuery.rows[0].userid });

    response
      .status(SUCCESS)
      .json({ message: "Success", user: { token: token, email: email } });
  } catch (err) {
    next(err);
  }
};

const createAUser = async (request, response, next) => {
  const { email, password } = request.body;

  if (email == undefined || password == undefined) {
    return next(new ErrorHandler(MISSING_PARAMS, "Missing Parameters"));
  }

  try {
    //Get User by email
    const userQuery = await UsersCRUD.getOneByEmail(email);

    //Should be empty
    if (userQuery.rows.length > 0) {
      throw new ErrorHandler(
        NOT_AUTHORIZED,
        "User with that email already exists"
      );
    }

    //hash password
    const hash = await encrypt.hashPassword(password);

    if (!hash) {
      throw new ErrorHandler(ERROR, "Something went wrong");
    }

    //create user
    const createUserQuery = await UsersCRUD.createOne(email, null, null, hash);
    checkResults(createUserQuery, ERROR, "Unable to create user");

    const { userid } = createUserQuery.rows[0];

    //generate token from user id
    const token = await Tokens.newToken({ id: userid });

    await SendGridService.sendVerificationMail(
      email,
      null,
      `${process.env.CLIENT_URL}/verification/${token}`
    );

    //add token to user account
    await UsersCRUD.updateVerificationStatus(userid, false, token);

    response
      .status(SUCCESS)
      .json({ message: "success", user: { email: email } });
  } catch (err) {
    next(err);
  }
};

const signupAuthentication = async (request, response, next) => {
  if (!request.body.token) {
    return next(new ErrorHandler(MISSING_PARAMS, "No token"));
  }

  const { token } = request.body;

  try {
    const isValid = await Tokens.verifyToken(token);

    if (!isValid) {
      throw new ErrorHandler(NOT_AUTHORIZED, "Unable to authorize");
    }
    await UsersCRUD.updateVerificationStatus(isValid.id, true, null);

    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const protectUser = async (request, response, next) => {
  const token = request.headers.authorization;
  if (token === undefined || token === null) {
    return next(new ErrorHandler(NOT_AUTHORIZED, "Missing Token"));
  }

  //check token format
  if (!token.startsWith("Bearer ")) {
    next(new ErrorHandler(NOT_AUTHORIZED, "Invalid Token"));
  }

  const [bearer, jwt] = token.split(" ", 2);

  try {
    //check if token is valid
    const isValid = await Tokens.verifyToken(jwt);

    const { id } = isValid;

    const userQuery = await UsersCRUD.getOneByID(id);
    checkResults(userQuery, NOT_AUTHORIZED, "Not Authorized");

    request.user = { id: id };
    next();
  } catch (err) {
    next(err);
  }
};

const AuthControllers = {
  signInAnAdmin,
  createAnAdmin,
  protectAdmin,
  createAUser,
  signupAuthentication,
  signInAUser,
  protectUser,
};

export default AuthControllers;
