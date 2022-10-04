import bcrypt from "bcrypt";

const hashPassword = async (password, saltRounds = 10) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return null;
  }

  // Return null if error
};

const comparePassword = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
};

const encrypt = {
  hashPassword,
  comparePassword,
};

export default encrypt;
